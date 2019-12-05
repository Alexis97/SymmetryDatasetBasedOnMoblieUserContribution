$(function () {
   $("#upload").click(function () {
        console.log("herehere");
       var fileObj = document.getElementById("cameraInput").files[0]; // js 获取文件对象
       if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
           alert("请选择图片");
           return;
       }
       var formFile = new FormData();
       formFile.append("action", "UploadVMKImagePath");  
       formFile.append("file", fileObj); //加入文件对象

       var data = formFile;
       $.ajax({
           url: "http://127.0.0.1:8000/upload/",
           data: data,
           type: "Post",
           dataType: "json",
           cache: false,//上传文件无需缓存
           processData: false,//用于对data参数进行序列化处理 这里必须false
           contentType: false, //必须
           success: function (result) {
               alert("上传完成!");
           },
       })
   })
})