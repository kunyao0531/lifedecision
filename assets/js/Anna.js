$(function(){
    $("#form_add").on('click', function() {
        $(".alert-danger").hide();

        var name = $("#title_add").val();
        if (name.length === 0) { alert("name is required"); return false; }

        var name = $("#add_text").val();
        if (name.length === 0) { alert("name is required"); return false; }

        var model = { hashtag: $("#hashtag_add").val(), date: $("#date_add").val(), country: $("#country_add").val() };
        $.post("/anna/create-article", model, function(err, response) {
            if (err === "data exist.") {
                $(".alert-danger").show();
            } else {
                $("#addresult").append("<tr><td><div class='articleName'>" + model.title_add +
                    "</div></td><td>" + model.hashtag_add +
                    "</td><td>" + model.date_add +
                    "</td><td>" + model.country_add + "</td><td>Added</td></tr>")
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