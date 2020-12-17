$(function(){
    $("#addarticle").on('click', function() {
        $(".alert-danger").hide();
        var model = { title: $("#title2").val(), hashtag: $("#hashtag2").val(), date: $("#date2").val(), country: $("#country2").val() };
        $.post("/create", model, function(err, response) {
            if (err === "data exist.") {
                $(".alert-danger").show();
            } else {
                $("#addresult").append("<tr><td><div class='articleName'>" + model.title +
                    "</div></td><td>" + model.hashtag +
                    "</td><td>" + model.date +
                    "</td><td>" + model.country + "</td><td>Added</td></tr>")
            }
        });

        $("#title2").val("");

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