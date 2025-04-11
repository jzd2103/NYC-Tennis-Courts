$(document).ready(function() {
    $('#search-form').submit(function(event) {
        let search_query = $('#search').val().trim();
        if (search_query === '') {
            event.preventDefault();
            $('#search').val('');
            $('#search').focus();
        }
    });
});