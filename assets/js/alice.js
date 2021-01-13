$(function () {
    $(".alert-repeatitiveData").hide();


    //get list
    var getClinicList = function () {
        $("#clinic-list tbody tr").remove();
        $.post("/alice/getClinicList", function (response) {



            for (var i = 0; i < response.rows.length; i++) {
                var deleteBT = "<a href='#' class='rm pointer' id='" + response.rows[i].id + "'>Delete</a>";
                $("#clinic-list tbody").append("<tr><td><div class='clinicTable'>" + response.rows[i].clinicName +
                    "</div></td><td>" + response.rows[i].doctorName +
                    "</td><td>" + response.rows[i].speciality +
                    "</td><td>" + response.rows[i].addressStreet + response.rows[i].addressNumber +
                    "</td><td>" + response.rows[i].addressPoscal +
                    "</td><td>" + response.rows[i].city +
                    "</td><td>" + response.rows[i].languageEn +
                    "</td><td>" + response.rows[i].languageCn +
                    "</td><td>" + deleteBT + "</td></tr>")
            }

            //delete
            $("#clinic-list tr .pointer").on('click', function () {
                var idx = $(".pointer").index(this);
                var id = $(this).attr("id");
                var model = { id: id };
                $.post('/alice/removeClinic', model, function (response) {
                    if (response === 'OK') {
                        $(".pointer").eq(idx).parent().parent().remove();
                    };
                });
                return false;
            });

        })
    }





    //   search result



    $("#submitSearchClinic").on('click', function () {

        var searchClinic = $("#searchClinic").val();
        if (searchClinic.length === 0) {
            alert("Input is required"); return false;
        } else {

            var model = {searchClinic: $("#searchClinic").val()}

            $.post("/alice/getSearchedResult", model, function (response,returnedMessage) {
                if (returnedMessage === "no result.") {
                    alert("No result"); return false;
                }

                for (var i = 0; i < response.rows.length; i++) {
                    $("#search-result-list tbody").append("<tr><td><div>" + response.rows[i].clinicName +
                        "</div></td><td>" + response.rows[i].doctorName +
                        "</td><td>" + response.rows[i].speciality +
                        "</td><td>" + response.rows[i].addressStreet + response.rows[i].addressNumber +
                        "</td><td>" + response.rows[i].addressPoscal +
                        "</td><td>" + response.rows[i].city +
                        "</td><td>" + response.rows[i].languageEn +
                        "</td><td>" + response.rows[i].languageCn + "</td></tr>")
                }


            })
        }
    });








    $("#submitForm").on('click', function () {
        $(".alert-repeatitiveData").hide();

        //add validation

        var clinicName = $("#clinicName").val();
        if (clinicName.length === 0) { alert("Clinic name is required"); return false; }


        var doctorName = $("#doctorName").val();
        if (doctorName.length === 0) { alert("Doctor name is required"); return false; }


        var speciality = $("#speciality").val();
        if (speciality.length === 0) { alert("Speciality is required"); return false; }


        var addressStreet = $("#addressStreet").val();
        if (addressStreet.length === 0) { alert("Address street is required"); return false; }


        var addressNumber = $("#addressNumber").val();
        if (addressNumber.length === 0) { alert("Adress number is required"); return false; }


        var city = $("#city").val();
        if (city.length === 0) { alert("City is required"); return false; }



        var addressPoscal = $("#addressPoscal").val();
        if (addressPoscal.length === 0) { alert("Address poscal is required"); return false; }





        var model = { clinicName: $("#clinicName").val(), doctorName: $("#doctorName").val(), speciality: $("#speciality").val(), addressStreet: $("#addressStreet").val(), addressNumber: $("#addressNumber").val(), city: $("#city").val(), addressPoscal: $("#addressPoscal").val(), languageEn: $("#languageEn").is(':checked') === false ? 'No' : 'Yes', languageCn: $("#languageCn").is(':checked') === false ? 'No' : 'Yes' };
        $.post("/alice/createClinic", model, function (err, response) {
            if (err === "data exist.") {
                $(".alert-repeatitiveData").show();
            } else {
                $("#clinic-list tbody").append("<tr><td><div class='clinicName'>" + model.clinicName +
                    "</div></td><td>" + model.doctorName +
                    "</td><td>" + model.speciality +
                    "</td><td>" + model.addressStreet + " " + model.addressNumber +
                    "</td><td>" + model.addressPoscal +
                    "</td><td>" + model.city +
                    "</td><td>" + model.languageEn +
                    "</td><td>" + model.languageCn + "</td><td>Added</td></tr>")
                // "</td><td>" + langCovert(model.languageEn)  +
                // "</td><td>" + langCovert(model.languageCn)  + "</td><td>Added</td></tr>")
                // "</td><td>" + model.langCovert(languageEn)  +
                // "</td><td>" + model.langCovert(languageCn)  + "</td><td>Added</td></tr>")

            }
        });
        //清空資料 
        $("#clinicName").val("");
        $("#doctorName").val("");
        $("#speciality").val("");
        $("#addressStreet").val("");
        $("#addressNumber").val("");
        $("#addressPoscal").val("");
        $("#city").val("");
        $("#languageEn").prop("checked", false);
        $("#languageCn").prop("checked", false);



    });

    $(".refreshtable").on('click', function () {
        getClinicList();
    });

    // $("#submitSearchClinic").on('click', function () {
    //     var searchWord = $("#searchWord").val();
    //     if (searchWord.length === 0) { alert("Search Word is required"); return false; }
    // //     var rList = [];
    // //     $(".clinicTable").each(function () {
    // //         var name = $(this).html();
    // //         rList.push(name);
    // //     });
    // //     var random = Math.floor(Math.random() * rList.length);
    // //     var pickedRestaurant = rList[random];
    // //     $(".result").html("<i class='glyphicon glyphicon-flag'></i> " + pickedRestaurant);
    // })

    getClinicList();



})