$(function () {
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

    function categoryConvert(category) {
        switch (category) {
            case "1":
                return "Hashtag"
            case "2":
                return "日期"
            case "3":
                return "國家"
        }
    }

    function dateConvert(input) {
        var date = new Date(input); //convert the input string to Date object
        var m = date.getMonth() + 1; //getMonth returns 0-11 only
        var y = date.getFullYear();

        var dateString = (m <= 9 ? '0' + m : m) + '.' + y;

        return dateString;
    }

    function hashtagConvert(hashtags) {

        var returnString = "";
        var hashtagArray = hashtags.split(',');
        var count = 0;
        hashtagArray.forEach(function (item) {
            if (count === 0) { returnString = hashtagNameConvert(item); }
            else { returnString = returnString + "," + hashtagNameConvert(item); }
            count++;
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

    
    // NEW datatable set add article and label results 10 items per page
    $(document).ready( function () {
        var articleTable = $('#result_add').DataTable({
            "order": [[ 0, "desc" ]], //first column (0) ascending, not working
            "ordering": false, //disable ordering feature
            "searching": false, //disable searching feature
            "paging": true,
            //"pagingType": full_numbers, //not working
            "oPaginate": { //not working
                "sFirst": "首頁",
                "sPrevious": "上一頁",
                "sNext": "下一頁",
                "sLast": "末頁"
            },
        });

        $('#result_add tbody').on('click', 'tr', function () {
            var data = articleTable.row( this ).data();
            alert( 'You clicked on '+data[0]+'\'s row' );
        } );

        $('#label_result_add').DataTable({
            "order": [[ 0, "desc" ]], //first column (0) ascending, not working
            "ordering": false, //disable ordering feature
            "searching": false, //disable searching feature
            "paging": true,
            //"pagingType": full_numbers, //not working
            "oPaginate": { //not working
                "sFirst": "首頁",
                "sPrevious": "上一頁",
                "sNext": "下一頁",
                "sLast": "末頁"
            },
        });
    } );


    //get list get data from mysql database 把mysql的資料貼回來
    var getArticleList = function () {
        $("#result_add tbody tr").remove();
        $.post("/getArticle", function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                var deleteBT1 = "<a href='#' class='rm delete_article' id='" + response.rows[i].id + "'>Delete</a>"; 
                $("#result_add tbody").append("<tr><td><div class='articleName'>" + response.rows[i].title +
                    "</div></td><td>" + hashtagConvert(response.rows[i].hashtag) +
                    "</td><td>" + dateConvert(response.rows[i].date) +
                    "</td><td>" + countryConvert(response.rows[i].country) +
                    "</td><td>" + deleteBT1 + "</td></tr>")
            }
        })
    }

    //NEW get label list get data from mysql database
    var getLabelList = function () {
        $("#label_result_add tbody tr").remove();
        $.post("/getLabel", function (response) {
            for (var i = 0; i < response.rows.length; i++) {
                var deleteBT2 = "<a href='#' class='rm delete_label' id='" + response.rows[i].id + "'>Delete</a>"; 
                $("#label_result_add tbody").append("<tr><td><div class='labelName'>" + response.rows[i].label_chi +
                    "</div></td><td>" + response.rows[i].label_eng +
                    "</div></td><td>" + categoryConvert(response.rows[i].category) +
                    "</td><td>" + deleteBT2 + "</td></tr>")
            }
        })
    }

    //delete. pointer is delete
    $("#result_add tr .delete_article").on('click', function () {
        var idx = $(".delete_article").index(this);
        var id = $(this).attr("id");
        var model = { id: id };
        $.post('/removeArticle', model, function (response) {
            if (response === 'OK') {
                $(".delete_article").eq(idx).parent().parent().remove(); //why? jquery
            };
        });
        return false;
    });

    //NEW delete label
    // $("#label_result_add tr .delete_label").on('click', function () {
    //     var idx = $(".delete_label").index(this);
    //     var id = $(this).attr("id");
    //     var model = { id: id };
    //     $.post('/removeLabel', model, function (response) {
    //         if (response === 'OK') {
    //             $(".delete_label").eq(idx).parent().parent().remove(); //why? jquery
    //         };
    //     });
    //     return false;
    // });








    //add article button
    $("#add_article").on('click', function () {
    $(".alert-danger").hide();

    //add article title 驗證資料
    var name = $("#title_add").val();
    if (name.length === 0) { alert("表格需填寫完整"); return false; }

    // var name = $("#text_add").val();
    // if (name.length === 0) { alert("表格需填寫完整"); return false; }

    var hashtagList = "";

    //ckeditor
    CKEDITOR.replace('#text_add', {
        extraPlugins: 'add_article'
    });

    document.querySelector('form').onsubmit = function (evt) {
        evt.preventDefault();

        var data = new FormData(evt.target);

        console.info(data.get('editor'));
    };
    //ckeditor ends here

    $(".hashtag[type=checkbox]:checked").each(function () {
        if (hashtagList === "") { hashtagList = $(this).val(); } else { hashtagList = hashtagList + "," + $(this).val(); }

    })
    //打包資料
    var model = {
        title: $("#title_add").val(),
        text: CKEDITOR.instances.text_add.getData(),
        hashtag: hashtagList,
        date: $("#date_add").val(),
        country: $("#country_add").val()
    };
    //抓到資料后，送到後端
    $.post("/anna/create", model, function (err, response) {
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

$(".refreshtableArticle").on('click', function () {
    getArticleList();
});

//NEW add label button
$("#add_label").on('click', function () {
    $(".alert-danger").hide();

    //add label  驗證資料
    var label_chi_name = $("#label_chi_add").val();
    if (label_chi_name.length === 0) { alert("表格需填寫完整"); return false; }

    var label_eng_name = $("#label_eng_add").val();
    if (label_eng_name.length === 0) { alert("表格需填寫完整"); return false; }

    //dropdown 驗證
    $(function () {
        $("#add_label").click(function () {
            var ddlabel_result_add = $("#ddlFruits");
            if (ddlabel_result_add.val() == "") {
                //If the "Please Select" option is selected display error.
                alert("請選擇 category");
                return false;
            }
            return true;
        });
    });

    //var labelList = "";

    //打包資料
    var model = {
        label_chi: label_chi_name,
        label_eng: label_eng_name,
        category: $("#category_add").val()
    };

    //抓到資料后，送到後端
    $.post("/anna/createLabel", model, function (err, response) {
        if (err === "data exist.") {
            $(".alert-danger").show();
        } else {
            $("#label_result_add").append("<tr><td><div class='labelName'>" + model.label_chi +
                "</div></td><td>" + model.label_eng +
                "</div></td><td>" + categoryConvert(model.category) +
                "</td><td>Added</td></tr>")
        }
    });

    $("#title2").val("");

});

//NEW label
$(".refreshtableLabel").on('click', function () {
    getLabelList();
});


getArticleList();
//NEW label
getLabelList();
    
})
