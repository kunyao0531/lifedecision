$(function(){
    $("#新增文章").on('click', function() {
        $(".alert-danger").hide();
        var model = { 文章標題: $("#文章標題").val(), #Hashtag/主題: $("#hashtagb").val(), 發表時間: $("#發表時間b").val(), 國家: $("#國家b").val() };
        $.post("/create", model, function(err, response) {
            if (err === "data exist.") {
                $(".alert-danger").show();
            } else {
                $("#文章表單").append("<tr><td><div class='articleName'>" + model.文章標題 +
                    "</div></td><td>" + model.#Hashtag/主題 +
                    "</td><td>" + model.發表時間 +
                    "</td><td>" + model.國家 + "</td><td>Added</td></tr>")
            }
        });

        $("#文章標題").val("");

    });

    $(".refreshtable").on('click', function() {
        getList();
    });

    $(".luckyarticle").on('click', function() {
        var rList = [];
        $(".articleName").each(function() {
            var name = $(this).html();
            rList.push(name);
        });
        var random = Math.floor(Math.random() * rList.length);
        var pickedArticle = rList[random];
        $(".result").html("<i class='glyphicon glyphicon-flag'></i> " + pickedArticle);
    })

    getList();
})