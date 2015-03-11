$(document).ready(function(){
	$('#commit-edit').click(function() {
		var mytitle = $('#mytitle').val();
		var tabName = $('#hiddenTab').val();
		var myContent = getContent();
		var contentTxt = getContentTxt();
		var myClassify = $('#hiddenTab1').val();
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
				contentTxt:contentTxt,
				tabName:tabName,
				classify:myClassify
			},
			function(data,status){
				myObj = jQuery.parseJSON(data);
				if(myObj.isSuccess == "yes")
				{
					var mytime = (new Date()).getTime();
					location.href="/content?id="+myObj.id+"&tabName="+myObj.tab+"&sendTime="+mytime;
				}
				else
				{
					alert("不小心就更新失败了^__^");
				}
				}
			);
		}		
	});


	$('#commit-update').click(function() {
		var mytitle = $('#mytitle').val();
		var myContent = getContent();
		var id = getArticleId();
		var tabName = $('#hiddenTab').val();
		var contentTxt = getContentTxt();
		var myClassify = $('#hiddenTab1').val();
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
				contentTxt:contentTxt,
				tabName:tabName,
				id:id,
				classify:myClassify
			},
			function(data,status){
				myObj = jQuery.parseJSON(data);
				if(myObj.isSuccess == "yes")
				{
					var mytime = (new Date()).getTime();
					location.href="/content?id="+myObj.id+"&tabName="+myObj.tab+"&sendTime="+mytime;
				}
				else
				{
					alert("不小心就更新失败了^__^");
				}
			});
		}		
	});
});
