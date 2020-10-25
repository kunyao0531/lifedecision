$(function() {

    //get list
    var getList = function() {
        $("#restaurant-list tbody tr").remove();
        $.post("/getList", function(response) {

            for (var i = 0; i < response.rows.length; i++) {
                var deleteBT = "<a href='#' class='rm pointer' id='" + response.rows[i].id + "'>Delete</a>";
                $("#restaurant-list tbody").append("<tr><td>" + response.rows[i].name +
                    "</td><td>" + response.rows[i].type +
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
        var model = { name: $("#restaurant").val(), city: $("#city").val(), type: $("#type").val(), address: $("#address").val() };
        $.post("/create", model);
        getList();
    });

    getList();

});