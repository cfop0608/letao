

$(function () {
    var currentPage = 1;
    var pageSize = 3;
    var picArr = [];  //存储所有用于上传的图片对象
    render();
    function render() {
        $.ajax({
            url : "/product/queryProductDetailList",
            type : "get",
            data : {
                page : currentPage,
                pageSize : pageSize
            },
            datatype : "json",
            success : function (info) {
                console.log(info);
            // 模板引擎 渲染在页面
            var htmlStr = template("productTmp",info);
            $("tbody").html(htmlStr);

            // 进行分页初始化
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion: 3,
                totalPages: Math.ceil( info.total / info.size ),
                currentPage: info.page,
                onPageClicked: function( a, b, c, page ) {
                    // 更新当前页
                    currentPage = page;
                    // 重新渲染
                    render();
                }
            })
            }
        })
    }


    // 2. 点击添加按钮，显示添加模态框
    $("#addBtn").click(function () {
        // 显示模态框
        $('#addModal').modal("show");

    // 发送ajax请求，请求所有的二级分类数据，进行渲染
        $.ajax({
            url : "/category/querySecondCategoryPaging",
            type : "get",
            data : {
                page : 1,
                pageSize : 100
            },
            datatype : "json",
            success : function (info) {
                console.log(info);
            
            // 模板引擎 渲染页面
            var htmlStr = template("dropdownTmp",info);
            $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    // 3. 通过事件委托，给所有的dropdown里面的a 添加点击事件
    $(".dropdown-menu").on("click","a",function () {
    //    console.log(1);
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        // 获取id  设置给隐藏域
        var id = $(this).data("id");
        $("[name='brandId']").val(id);

        // 将校验状态 改成VALID
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    // 4. 进行文件上传配置
    $("#fileupload").fileupload({
        dataType:"json",

      done:function (e, data) {
        console.log(data);
        var picObj = data.result; //后台返回的结果（图片名称/图片地址）
        var picUrl = picObj.picAddr;  //图片地址

        picArr.unshift(picObj);

        // 结构上，往最前面追加
        $("#imgBox").prepend('<img src="'+ picUrl +'" alt="" width="100px">')

        // console.log(picArr);
        if (picArr.length > 3) {
            // 将最最前面的保留。将最后面的移除

            // 移除数组的最后一项
            picArr.pop();
            // 移除图片结构中 最后一个图片 ，找到最后一个图片类型的元素，进行删除

            $("#imgBox img:last-of-type").remove();
  
        }


        if (picArr.length ===3 ) {
            // 说明文件满3张了，picStatus状态应该灯芯为VALID
            $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID" );   
        }
         

      } 
    })

    // 5. 进行表单校验初始化
    $("#form").bootstrapValidator({
        // 对隐藏域进行配置
            excluded: [],
            // 配置校验的图标 
            feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置校验字段
        fields : {
            brandId : {
                validators : {
                    notEmpty : {
                        message : "请选择二级分类"
                    }
                }
            },
            proName : {
                validators : {
                    notEmpty : {
                        message : "请输入商品名称"
                    }
                }
            },
            proDesc : {
                validators : {
                    notEmpty : {
                        message : "请输入商品描述"
                    }
                }
            },
            num: {
                validators: 
                {
                  notEmpty: {
                    message: "请输入商品库存数量"
                  },
    
                  regexp: {
                    regexp: /^[1-9]\d*$/,
                    message: '请输入非零开头的数字'
                  }
                }
              },

            size: {
                validators: {
                  notEmpty: {
                    message: "请输入尺码"
                  },
                  // 校验需求: 必须是 xx-xx 的格式,  xx两位数字
                  regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '必须是 xx-xx 的格式,  xx两位数字'
                  }
                }
              },
              oldPrice: {
                validators: {
                  notEmpty: {
                    message: "请输入商品原价"
                  }
                }
              },
        
              price: {
                validators: {
                  notEmpty: {
                    message: "请输入商品现价"
                  }
                }
              },
              
            //   专门用于标记文件上传是否满 3张 的
              picStatus: {
                validators: {
                  notEmpty: {
                    message: "请上传3张图片"
                  }
                }
              },

        }
    })


    // 6. 注册表单校验成功事件，阻止默认的提交，，通过ajax提交

    $("#form").on('success.form.bv',function  ( e ) {

        e.preventDefault();

        // 获取所有 input 中的数据
        var params = $("#form").serialize();
        // 还要加上图片的数据
        params += "$picName1="+ picArr[0].picName +"$picAddr1="+ picArr[0].picAddr;
        params += "$picName2="+picArr[1].picName+"$picAddr2="+picArr[1].picAddr;
        params += "$picName3="+picArr[2].picName+"$picAddr3="+picArr[2].picAddr;
       

        $.ajax({
            url : "/product/addProduct",
            type : "post",
            data : params,
            datatype : "json",
            success : function (info) {
                console.log(info);
            
                if (info.success) {

                    // 关闭模态框
                $("#addModal").modal("hide");

                    // 重新渲染页面（第一页）
                currentPage = 1;
                render();

                // 重置内容和状态
                $("#form").data("bootstrapValidator").resetForm(true);
                }

                // 手动重置图片和下拉按钮
                $("#dropdownText").text("请选择二级分类");
                // 图片重置
                $("#imgBox img").remove(); 
            }
        })
    })

})