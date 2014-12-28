$(document).ready(function(){
	$('#mytitle').blur(function() {
		if ($(this).val() == "") {
			alert("标题不能为空");
		};
	});

	$('#commit-edit').click(function() {
		var mytitle = $('#mytitle').val();
		var myContent = getContent();
		if( mytitle == "" || myContent == ""){
			alert("标题或者内容为空");
		}
		else
		{
			$.post("addArticle",
			{
				title:mytitle,
				content:myContent
			},
			function(data,status){
				if(data == "yes")
				{
					location.href="/showArticle";
				}
				else
				{
					alert("不小心就添加失败了^__^");
				}
			});
		}		
	});


	$('#commit-update').click(function() {
		var mytitle = $('#mytitle').val();
		var myContent = getContent();
		if( mytitle == "" || myContent == ""){
			alert("标题或者内容为空");
		}
		else
		{
			$.post("updateArticle",
			{
				title:mytitle,
				content:myContent
			});
		}		
	});
});
