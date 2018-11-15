

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