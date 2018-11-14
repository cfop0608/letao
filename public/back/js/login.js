


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
})

