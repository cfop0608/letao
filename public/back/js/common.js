

// //开启进度条
// NProgress.start();
// setTimeout(function () {   
// //关闭进度条
// NProgress.done();
// },500)


// 需求 ： 在第一个ajax请求时。开启进度条
     //   在所有的ajax请求都回来时。关闭进度条

     $(document).ajaxStart(function () {
         NProgress.start();
     });
     $(document).ajaxStop(function () {
         setTimeout(function () {
            NProgress.done();
         },500)
     })



     $(function () {
        //  公共的功能
            // 1. 导航点击切换功能
            $('.category').click(function () {
                // 让下一个兄弟元素切换显示隐藏
                $(this).next().stop().slideToggle();
            })
            // 2. 左侧菜单列表切换功能
            $('.icon_left').click(function () {
                $('.lt_aside').toggleClass('hidemenu');
                $('.lt_main').toggleClass('hidemenu');
                $('.lt_topbar').toggleClass('hidemenu');
            })
            // 3. 退出功能
          $('.icon_right').click(function () {
            //   点击按钮，显示模态框
            $('#myModal').modal("show");
          })

        //   模态框的按钮点击事件
        $('#logoutBtn').click(function () {
            // 发送ajax请求。，让后台销毁当前用户的登录状态
            $.ajax({
                url : '/employee/employeeLogout',
                type : "get",
                datatype : 'json',
                success : function (info) {
                    if (info.success) {
                        // 退出成功
                        location.href = "login.html";
                    }
                }
            })
        })
     })