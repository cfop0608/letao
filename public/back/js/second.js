
$(function () {

    var currentPage = 1;   
    var pageSize = 5;

    render();

  function render() {
    $.ajax ({
        url : "/category/querySecondCategoryPaging",
        type : "get",
        data : {
            page : currentPage,
            pageSize : pageSize
        },
        datatype : "json",
        success : function (info) {
            console.log(info);
            
        // 模板引擎渲染在页面上
        var htmlStr = template("tmp",info);
        $("tbody").html(htmlStr);


        // 分页初始化
        $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:info.page,
            totalPages:Math.ceil(info.total/info.size),
            onPageClicked : function (a,b,c,page) {
                // console.log(page);
                // 根据 page 请求对应页的数据，进行渲染
                currentPage  = page;
                render();               
              }
        })
        }
    })
  }

//   2. 点击添加按钮，，显示模态框
  $("#addBtn").click(function () {
      $("#addModal").modal("show");

    //   发送ajax请求，获取下拉菜单的列表数据（全部的一级分类）

    // 通过分页获取一级分类的接口，模拟获取全部数据的接口
    $.ajax({
        url : "/category/queryTopCategoryPaging",
        type : "get",
        data : {
            page : 1,
            pageSize : 100                                                                     
        },
        datatype : "json",
        success : function (info) {
            console.log(info);
            var htmlStr = template("dropdownTmp",info);
            $(".dropdown-menu").html(htmlStr);
        }
   
    })
  })

//   3. 给下拉列表的所有a 添加 点击事件  通过事件委托注册
  $(".dropdown-menu").on("click","a",function () {
    //   console.log(111);
    // 获取a 的文本
    var txt = $(this).text();
    // console.log(txt);
    // 将文本设置给按钮
    $("#dropdownText").text(txt);
    
    // 获取id  设置给准备好的input
    var id = $(this).data("id");
    $("[name='categoryId']").val(id);
    $("[name='categoryId']").trigger("input");
  })


//   4.进行文件上传初始化
  $("#fileupload").fileupload({
      datatype : "json",
    //   文件上传完成的回调函数
      done : function (e,data) {
        console.log(data);
        var result = data.result;
        // 获取文件上传的地址
        var picUrl = result.picAddr;
        // 设置给img的src
        $("#imgBox img").attr('src',picUrl);


        // 将src路径 实时设置给input
        $("[name='brandLogo']").val(picUrl);
        $("[name='brandLogo']").trigger("input");
      }
  })

//   5. 表单校验
  $("#form").bootstrapValidator({

    // 对隐藏域进行配置
    excluded: [],
     // 配置校验的图标 
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //   校验字段
    fields : {
      categoryId : {
        validators : {
          notEmpty : {
            message : "请选择一级分类"
          }
        }
      },
      brandName : {
        validators : {
          notEmpty : {
            message : "请输入二级分类名称"
          }
        }
      },
      brandLogo : {
        validators : {
          notEmpty : {
            message : "请选择图片"
          }
        }
      }
    }
  })


  // 6. 注册表单校验成功事件，阻止默认的表单提交。通过ajax提交
  $("#form").on("success.form.bv",function (e) {

    e.preventDefault();
     $.ajax({
       url : "/category/addSecondCategory",
       type : "post",
       data : $("#form").serialize(),
       datatype : "json",
       success : function (info) {
         console.log(info);
         if (info.success) {
          //  关闭模态框
            $("#addModal").modal("hide");

            // 重新渲染页面
            currentPage = 1;
            render();

            // 需要重置内容和校验状态
            $("#form").data("bootstrapValidator").resetForm(true);

            // 由于按钮和图片不是表单元素，，需要手动重置
            $("#dropdownText").text("请选择一级分类");
            // 图片重置
            $("#imgBox img").attr("src","./images/none.png");

            // 清空数组
            picArr = [];
         }
       }
     })
  })
})