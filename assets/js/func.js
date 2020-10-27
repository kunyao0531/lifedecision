$(function() {
    $(".alert-danger").hide();
    //get list
    var getList = function() {
        $("#restaurant-list tbody tr").remove();
        $.post("/getList", function(response) {

            for (var i = 0; i < response.rows.length; i++) {
                var deleteBT = "<a href='#' class='rm pointer' id='" + response.rows[i].id + "'>Delete</a>";
                $("#restaurant-list tbody").append("<tr><td><div class='restaurantName'>" + response.rows[i].name +
                    "</div></td><td>" + response.rows[i].type +
                    "</td><td>" + response.rows[i].address +
                    "</td><td>" + response.rows[i].city + "</td><td>" + deleteBT + "</td></tr>")
            }

            //delete
            $("#restaurant-list tr .pointer").on('click', function() {
                var idx = $(".pointer").index(this);
                var id = $(this).attr("id");
                var model = { id: id };
                $.post('/remove', model, function(response) {
                    if (response === 'OK') {
                        $(".pointer").eq(idx).parent().parent().remove();
                    };
                });
                return false;
            });

        })
    }

    $("#submitForm").on('click', function() {
        $(".alert-danger").hide();
        var model = { name: $("#restaurant").val(), city: $("#city").val(), type: $("#type").val(), address: $("#address").val() };
        $.post("/create", model, function(err, response) {
            if (err === "data exist.") {
                $(".alert-danger").show();
            } else {
                $("#restaurant-list tbody").append("<tr><td><div class='restaurantName'>" + model.name +
                    "</div></td><td>" + model.type +
                    "</td><td>" + model.address +
                    "</td><td>" + model.city + "</td><td>Added</td></tr>")
            }
        });

        $("#restaurant").val("");
        $("#address").val("");
    });

    $(".refreshtable").on('click', function() {
        getList();
    });

    $(".luckyrestaurant").on('click', function() {
        var rList = [];
        $(".restaurantName").each(function() {
            var name = $(this).html();
            rList.push(name);
        });
        var random = Math.floor(Math.random() * rList.length);
        var pickedRestaurant = rList[random];
        $(".result").html("<i class='glyphicon glyphicon-flag'></i> " + pickedRestaurant);
    })

    getList();

});