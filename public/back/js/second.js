
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
        }
    })
  }
})