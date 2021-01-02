$(function(){
    $("#add_article").on('click', function() {
        $(".alert-danger").hide();

        var name = $("#title_add").val();
        if (name.length === 0) { alert("表格需填寫完整"); return false; }

        var name = $("#add_text").val();
        if (name.length === 0) { alert("表格需填寫完整"); return false; }

        var hashtagList = "";

        $(".hashtag[type=checkbox]:checked").each(function(){
            if(hashtagList==="")
            {hashtagList = $(this).val();} else {hashtagList = hashtagList + "," + $(this).val();}
            
        }) 

        var model = { 
            title: $("#title_add").val(),
            text: $("#add_text").val(),
            hashtag: hashtagList, 
            date: $("#date_add").val(), 
            country: $("#country_add").val() 
        };

        $.post("/anna/create", model, function(err, response) {
            if (err === "data exist.") {
                $(".alert-danger").show();
            } else {
                $("#result_add").append("<tr><td><div class='articleName'>" + model.title +
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

    //getList();
})

//function langConvert(val) {
//    if (val === 0) {
//        return "NO";
//    } else {
//        return "YES";
//    }
//}
