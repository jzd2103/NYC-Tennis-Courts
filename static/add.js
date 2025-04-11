$(document).ready(function() {

    const ids = ["name", "address", "image", "price", "description", "courts", "types", "trip", "surfaces", "rating", "reviews"];
    const warning_ids = ids.map(id_name => `#warning-${id_name}`);

    function save_item(new_item) {
        $.ajax({
            url: 'add',
            type: 'POST',
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(new_item),
            success: function(result) {
                let item = result['new_data'];
                
                let success = `<div class="card">
                                    New item successfully created! 
                                    <a class='view-created' href="/view/${item['id']}">View ${item['name']}</a>
                                </div>`

                $("#add-success").append(success);
                
                for (let id of ids) {
                    $(`#${id}`).val("").trigger('change');
                }

                $("#name").focus();

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            error: function(request, status, error) {
                console.log("Error");
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });
    }

    function addItem() {
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

            // check if name already exists
            if (i == 0) {
                for (let id in data) {
                    if (name == data[id].name) {
                        $("#warning-name").addClass("warning-text");
                        $("#warning-name").html("This name has already been submitted. Please submit another name.");
                        $("#name").focus();
                        return;
                    }
                }
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

        let newItem = {
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

        save_item(newItem);
    }

    $("#add-success").empty();
    
    $('#surfaces').select2({
        placeholder: "Select surfaces",
        allowClear: true
    });
    $('#types').select2({
        placeholder: "Select types",
        allowClear: true
    });

    $("#name").focus();

    $( "#submit-add" ).on('click', function () {
        addItem();
    });
});