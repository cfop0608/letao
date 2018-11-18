

$(function () {

    $("#form").bootstrapValidator({
        // 校验字段
        fields : {
            username : {
                validators : {
                    // 不能为空
                    notEmpty : {
                        message : "用户名不能为空"
                    }
                }
            },
            password : {
                validators : {
                    // 不能为空
                    notEmpty : {
                        message : "密码不能为空"
                    }
                }
            }

        }
    })
})