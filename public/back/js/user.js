

$(function() {
  // 当前页
  var currentPage = 1;
  // 每页的条数
  var pageSize = 5

  var currentId;  //当前正在修改的用户id
  var isDelete;   // 需要修改的状态

  // 一进入页面, 发送ajax请求, 获取数据, 进行页面动态渲染
  render();

    // 根据currentPage 和 pageSize 发送请求，渲染页面

   function render () {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        // console.log( info );
        var htmlStr = template("tmp", info ); 
        // var htmlStr = template("tmp", {list : info.rows} ); 
        
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
          currentPage:info.page,//指定当前页
          totalPages:Math.ceil(info.total/info.size),//指定总页数
          // 点击事件
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


  //  给启用禁用 按钮，添加点击事件（通过事件委托）
  // 事件委托 ： $('父亲').on('事件名称','子元素'，function（） {...})
   $('tbody').on('click','.btn',function () {
    //  console.log("呵呵");

    //  显示模态框
    $("#userModal").modal("show");

    // 获取用户id
    currentId = $(this).parent().data("id");

    // 获取更改的状态，（根据按钮的类名判断）
     isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
   })

    // 确定按钮点击。发送ajax 改变用户状态
   $("#confirmBtn").click(function () {
      $.ajax({
        url : "/user/updateUser",
        type : "post",
        data : {
          id : currentId,
          isDelete : isDelete
        },
        dataType : "json",
        success : function (info) {
          // console.log(info);
          if (info.success) {
            // 关闭模态框
            $("#userModal").modal("hide");
            // 页面重新渲染
            render();
          }
        }
      })
   })

  })

 

  
