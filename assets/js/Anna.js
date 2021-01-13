$(function(){
    
function countryConvert(country) {
    switch (country) {
        case "germany":
            return "德國"
        case "sweden":
            return "瑞典"
        case "spain":
            return "西班牙"
        case "swiss":
            return "瑞士"
    }
}

function dateConvert(input) {
    var date = new Date(input); //convert the input string to Date object
    var m = date.getMonth() + 1; //getMonth returns 0-11 only
	var y = date.getFullYear();

    var dateString = (m <= 9 ? '0' + m : m) + '.' + y;
        
    return dateString;
}

function hashtagConvert(hashtags){

    var returnString = "";
    var hashtagArray = hashtags.split(',');
    var count = 0;
    hashtagArray.forEach(function(item){
     if(count === 0){returnString = hashtagNameConvert(item);}
    else{returnString = returnString + "," + hashtagNameConvert(item);}
    count ++;
    })
    return returnString;
}
    
function hashtagNameConvert(hashtag) {
        switch (hashtag) {
            case "eat":
                return "#安娜到處吃"
            case "try":
                return "#安娜嚐鮮趣"
            case "travel":
                return "#安娜旅行趣"
            case "culture":
                return "#安娜談文化"
            case "experience":
                return "#安娜談經驗"
            case "cook":
                return "#安娜下廚趣"
            case "cookhome":
                return "#家鄉味自己做"
            case "share":
                return "#安娜享好物"
            case "stueat":
                return "#斯圖加特餐廳推薦"
            case "esseat":
                return "#埃森餐廳推薦"
            case "duseat":
                return "#杜賽道夫餐廳推薦"
        }
}
     //get list get data from mysql database
     var getArticleList = function() {
        $("#result_add tbody tr").remove();
        $.post("/getArticle", function(response) {
            for (var i = 0; i < response.rows.length; i++) {
                var deleteBT = "<a href='#' class='rm pointer' id='" + response.rows[i].id + "'>Delete</a>"; //create a delete button?
                $("#result_add tbody").append("<tr><td><div class='articleName'>" + response.rows[i].title +
                    "</div></td><td>" + hashtagConvert(response.rows[i].hashtag) +
                    "</td><td>" + dateConvert(response.rows[i].date) +
                    "</td><td>" + countryConvert(response.rows[i].country) +
                    "</td><td>" + deleteBT + "</td></tr>")
            }
            
            //delete pointer is delete
            $("#result_add tr .pointer").on('click', function() {
                var idx = $(".pointer").index(this);
                var id = $(this).attr("id");
                var model = { id: id };
                $.post('/removeArticle', model, function(response) {
                    if (response === 'OK') {
                        $(".pointer").eq(idx).parent().parent().remove(); //why? jquery
                    };
                });
                return false;
            });

        })
    }
    /*
    //search result
    $("#submitFormSearch").on('click', function () {

        var searchArticle = $("#searchArticle").val();
        if (searchArticle.length === 0) {
            alert("Input is required"); return false;
        } else {

        //added by myself, hashtags
                $(".hashtag[type=checkbox]:checked").each(function(){
                if(hashtagList==="")
                {hashtagList = $(this).val();} else {hashtagList = hashtagList + "," + $(this).val();}
            
                }) 
                //only the items in search or everything in result?
                var model = { 
                title: $("#title_add").val(),
                text: CKEDITOR.instances.text_add.getData(),
                hashtag: hashtagList, 
                date: $("#date_add").val(), 
                country: $("#country_add").val() 
                };

                $.post("/anna/getSearchedAricleResult", model, function(err, response) {
                    if (err === "data exist.") {
                    $(".alert-danger").show();
                    } else {
                $("#submitFormSearch").append("<tr><td><div class='articleName'>" + model.title +
                    "</div></td><td>" + hashtagConvert(model.hashtag) +
                    "</td><td>" + dateConvert(model.date) +
                    "</td><td>" + countryConvert(model.country) + "</td><td>Added</td></tr>")
                }
                });
        //added by myself ends here

            var model = {searchArticle: $("#searchArticle").val()}

            $.post("/getSearchedArticleResult", model, function (response) {
                // if (err === "no result.") {
                //     alert("No result"); return false;
                // }

                for (var i = 0; i < response.rows.length; i++) {
                    $("#result_add tbody").append("<tr><td><div>" + response.rows[i].articleName +
                        "</div></td><td>" + response.rows[i].title +
                        "</td><td>" + hashtagConvert(response.rows[i].hashtag) +
                        "</td><td>" + countryConvert(response.rows[i].country) +
                        "</td></tr>")
                }


            })
        }
    });*/

    //add article button
    $("#add_article").on('click', function() {
        $(".alert-danger").hide();

        //add article title
        var name = $("#title_add").val();
        if (name.length === 0) { alert("表格需填寫完整"); return false; }

       // var name = $("#text_add").val();
       // if (name.length === 0) { alert("表格需填寫完整"); return false; }

        var hashtagList = "";

        //ckeditor
        CKEDITOR.replace( '#text_add', {
            extraPlugins: 'add_article'
        } );
        
        document.querySelector( 'form' ).onsubmit = function( evt ) {
            evt.preventDefault();
            
            var data = new FormData( evt.target );
            
            console.info( data.get( 'editor' ) ); 
        };
        //ckeditor ends here

        $(".hashtag[type=checkbox]:checked").each(function(){
            if(hashtagList==="")
            {hashtagList = $(this).val();} else {hashtagList = hashtagList + "," + $(this).val();}
            
        }) 

        var model = { 
            title: $("#title_add").val(),
            text: CKEDITOR.instances.text_add.getData(),
            hashtag: hashtagList, 
            date: $("#date_add").val(), 
            country: $("#country_add").val() 
        };

        $.post("/anna/create", model, function(err, response) {
            if (err === "data exist.") {
                $(".alert-danger").show();
            } else {
                $("#result_add").append("<tr><td><div class='articleName'>" + model.title +
                    "</div></td><td>" + hashtagConvert(model.hashtag) +
                    "</td><td>" + dateConvert(model.date) +
                    "</td><td>" + countryConvert(model.country) + "</td><td>Added</td></tr>")
            }
        });

        $("#title2").val("");

    });

    $(".refreshtable").on('click', function() {
        getArticleList();
    });

    getArticleList();
})
