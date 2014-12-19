$(document).ready(function(){
    $('#search-input').bind('input propertychange',function(){
        if($(this).val() == "")
        {
            $('#search-tip').css("display","none");
        }
        else
        {
            $('#search-tip').css("display","block");
            $('#search-list').html("<li class='list-group-item' style='border:none'>"+$(this).val()+"</li>");
        }
    })
})
