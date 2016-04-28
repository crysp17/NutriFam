$(function() {
    $('#rec-book-footer button').click(function(){

        window.location.href = "newrecipe.html";
    })
    $('#recipe-list a').click(function(){
        localStorage['recipe'] = $(this).text();
    })
})