


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
})