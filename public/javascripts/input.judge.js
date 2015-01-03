$(document).ready(function(){
	$('#commit-edit').click(function() {
		var mytitle = $('#mytitle').val();
		var myContent = getContent();
		var contentTxt = getContentTxt();
		if( mytitle == "" || myContent == ""){
			alert("标题或者内容为空");
		}
		else
		{
			$.post("addArticle",
			{
				sendTime: (new Date()).getTime(),
				title:mytitle,
				content:myContent,
				contentTxt:contentTxt
			},
			function(data,status){
				if(data == "yes")
				{
					var mytime = (new Date()).getTime();
					location.href="/showArticle?sendTime"+mytime;
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
		var id = getArticleId();
		var contentTxt = getContentTxt();
		if( mytitle == "" || myContent == ""){
			alert("标题或者内容为空");
		}
		else
		{
			$.post("updateArticle",
			{
				sendTime: (new Date()).getTime(),
				title:mytitle,
				content:myContent,
				id:id,
				contentTxt:contentTxt
			},
			function(data,status){
				if(data == "yes")
				{
					var mytime = (new Date()).getTime();
					location.href="/content?id="+id+"&sendTime="+mytime;
				}
				else
				{
					alert("不小心就更新失败了^__^");
				}
			});
		}		
	});
});
