$(document).ready(function() {
    
    const ids = ["name", "address", "image", "price", "description", "courts", "types", "trip", "surfaces", "rating", "reviews"];
    const warning_ids = ids.map(id_name => `#warning-${id_name}`);

    $('#surfaces').select2({
        placeholder: "Select surfaces",
        allowClear: true
    });
    $('#types').select2({
        placeholder: "Select types",
        allowClear: true
    });

    $('#name').val(court.name);
    $('#address').val(court.address);
    $('#image').val(court.image);
    $('#price').val(court.price);
    $('#description').val(court.description);
    $('#courts').val(court.courts);
    $('#types').val(court.types).trigger('change');
    $('#trip').val(court.trip);
    $('#surfaces').val(court.surfaces).trigger('change');
    $('#rating').val(court.rating);
    $('#reviews').val(reviews_str);

    function save_edit(item) {
        $.ajax({
            url: `/edit/${item['id']}`,
            type: 'POST',
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(item),
            success: function(result) {
                let new_data = result['new_data'];
                window.location.href = `/view/${new_data.id}`;
            },
            error: function(request, status, error) {
                console.log("Error");
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });
    }

    function editItem() {
        const name = $("#name").val().trim();
        const address = $("#address").val().trim();
        const image = $("#image").val().trim();
        const price = $("#price").val().trim();
        const description = $("#description").val().trim();
        const courts = $("#courts").val().trim();
        const types = $("#types").val()
        const trip = $("#trip").val().trim();
        const surfaces = $("#surfaces").val()
        const rating = $("#rating").val().trim();
        const reviews = $("#reviews").val().trim();
        console.log(reviews);
        
        let form_vals = [name, address, image, price, description, courts, types, trip, surfaces, rating];

        for (let warning_id of warning_ids) {
            $(warning_id).html("");
        }

        // check for empty fields
        for (let i = 0; i < form_vals.length; i++) {
            if (!form_vals[i]) {
                $(warning_ids[i]).addClass("warning-text");
                $(warning_ids[i]).html("Missing " + ids[i]);
                $(`#${ids[i]}`).focus();
                return;
            }

            // check if inputs are not numbers
            if (i == 3 || i == 5 || i == 7 || i == 9) {
                if (isNaN(form_vals[i])) {
                    $(warning_ids[i]).addClass("warning-text");
                    $(warning_ids[i]).html(ids[i].charAt(0).toUpperCase() + ids[i].slice(1) + " must be a number");
                    $(`#${ids[i]}`).focus();
                    return;
                }
                if (i == 9) {
                    if (rating > 5 || rating < 0) {
                        $(warning_ids[i]).addClass("warning-text");
                        $(warning_ids[i]).html("Enter a rating between 0 and 5");
                        $(`#${ids[i]}`).focus();
                        return;
                    }
                }
            }

            // check if types and surfaces are empty
            if (i == 6 || i == 8) {
                if (form_vals[i].length == 0) {
                    $(warning_ids[i]).addClass("warning-text");
                    $(warning_ids[i]).html("Please select " + ids[i]);
                    $(`#${ids[i]}`).focus();
                    return;
                }
            }
        }
    
        let item = {
            "id": court.id,
            "name": name,
            "address": address,
            "image": image,
            "price": price,
            "description": description,
            "courts": courts,
            "types": types,
            "trip": trip,
            "surfaces": surfaces,
            "rating": rating,
            "reviews": reviews,
        };

        save_edit(item);
    }

    $('#submit-edit').on('click', function() {
        editItem();
    });

    $('#discard-button').on('click', function() {
        $('#confirmationModal').fadeIn();
    });

    $('#confirmYes').on('click', function() {
        window.location.href = `/view/${court.id}`;
    });

    $('#confirmNo').on('click', function() {
        $('#confirmationModal').fadeOut();
    });
});