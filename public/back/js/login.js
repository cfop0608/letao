


$(function () {

    // 需求： 
    // 1. 进行表单校验配置
        // 要求 ： 1. 用户名 不能为空，，长度为2-6位
                // 2. 密码不能为空。，长度为6-12位

    $('#form').bootstrapValidator ({
        // 配置校验字段 （需要现在input 中配置name）

        // 配置校验的图标 
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        fields : {
            username : {
                validators : {
                    //1. 非空校验
                    notEmpty : {
                        // 校验提示
                        message: "用户名不能为空"
                    },
                    // 配置回调函数的提示信息
                    callback : {
                        message : "用户名不存在"
                    },

                    // 2. 长度校验
                    stringLength : {
                        min : 2,
                        max :6,
                        message : "用户名的长度必须是2-6位"
                    }
                }
            },
            password : {
                validators : {
                    // 非空校验
                    notEmpty : {
                        // 校验提示
                        message : "密码不能为空"
                    },
                      // 配置回调函数的提示信息
                      callback : {
                        message : "密码错误"
                    },

                    // 长度校验
                    stringLength : {
                        min : 6,
                        max : 12,
                        message : "密码长度必须是6-12位"
                    }
                }
            }
        }
    })

    // 2. 表单校验需要在表单提交时，需要submit按钮
       // 可以注册一个表单校验成功事件，表单校验成功之后，默认会提交
       // 可以在成功事件中。，阻止默认的表单提交，通过ajax提交，就不会跳转了

    //    思路： 1. 注册表单校验成功事件
              // 2. 在事件中 ，阻止默认的表单提交，通过ajax提交接口

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        // console.log("校验成功，通过ajax提交");
        $.ajax ({
            url : "/employee/employeeLogin",
            type : "post",
            data : $("#form").serialize(),
            datatype: "json",
            success : function (info) {
                console.log(info); 
                if (info.success) {
                    location.href = "index.html";
                }
                if (info.error == 1000) {
                    // alert("用户名不存在");
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                } 
                if (info.error == 1001) {
                    // alert ("密码错误");
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')

                }  
            }
        })
});


    // 3. 重置功能
    $('[type="reset"]').click(function () {
        $('form').data('bootstrapValidator').resetForm();  //只重置状态
    })
    
     
})

