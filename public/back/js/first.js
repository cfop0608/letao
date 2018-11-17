


$(function () {

    var currentPage = 1;   //当前页
    var pageSize = 5       //每页条数

    render();
  
    function render() {
        $.ajax ({
            url : "/category/queryTopCategoryPaging",
            type : "get",
            data : {
                page : currentPage,
                pageSize : pageSize
            },
            datatype : "json",
            success : function (info) {
                console.log(info);
                // 渲染在页面上
                var htmlStr = template("tmp",info);
                $("tbody").html(htmlStr);
    
    
                // 分页初始化
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
                currentPage:info.page,//指定当前页
                totalPages:Math.ceil(info.total/info.size),//指定总页数
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

    //2 点击添加按钮。，显示添加模态框
   $("#addBtn").click(function () {
        //    显示添加模态框
        $("#addModal").modal("show");
   })


    //    3. 表单校验功能
    $("#form").bootstrapValidator({
        // 配置校验的图标 
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields : {
            categoryName : {
                validators : {
                    // 非空
                    notEmpty : {
                        message : "请输入一级分类"
                    }
                }
            }
        }
    })


    // 4.注册表单校验成功事件，阻止默认的提交，通过ajax提交
    $("#form").on("success.form.bv",function (e) {
        e.preventDefault();

        // 通过ajax提交
        $.ajax ({
            url : "/category/addTopCategory",
            type : "post",
            data : $("#form").serialize(),
            datatype : "json",
            success : function (info) {
                // console.log(info);
                if (info.success) {
                    // 添加成功
                    // 关闭模态框
                    $("#addModal").modal("hide");
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单的内容和状态
                $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })

})