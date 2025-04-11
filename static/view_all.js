$(document).ready(function() {

    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = (rating - fullStars) >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        let ratingHTML = '<div class="star-rating">';

        for (let i = 0; i < fullStars; i++) {
            ratingHTML += '<span class="filled">&#9733;</span>';
        }

        if (halfStar) {
            ratingHTML += '<span class="half-filled">&#9733;</span>';
        }

        for (let i = 0; i < emptyStars; i++) {
            ratingHTML += '<span>&#9733;</span>';
        }
        ratingHTML += '</div>';
        return ratingHTML;
    }

    function display_search_results () {
        $("#search-results").empty();
        $("#num-results").empty();

        if (results.length === 0) {
            let container = `<div class='container info-container'>
                                <span class='no-result'>No results found. Try another search.</span>
                            </div>`;
            $("#search-results").append(container);
            $("#search").focus();
        }
        else {
            if (results.length === 1) {
                $("#num-results").html("1 result found:");
            }
            else {
                $("#num-results").html(`${results.length} results found:`);
            }
            
            let i = 1;
            let container = $("<div>").addClass("row preview-padding");

            for (let id of results) {
                let court = data[id];
                
                let rating = generateStarRating(court.rating);

                if (court.price === 0) {
                    price = "Free";
                }
                else {
                    price = `$${court.price}/hour`;
                }

                let courtCard = `
                    <div class='col-md-4'>
                        <div class='court-card'>
                            <a class='no-link' href="/view/${court.id}">
                                <div class='court-preview'>
                                    <img src="${court.image}" alt="Preview image of ${court.name}" class="court-image-home">
                                </div>
                            </a>
                            <h3 class='bold'>${court.name}</h3>
                            <div class='preview-rating'>
                                <span>
                                    <span class='bold'>Price:</span> ${price}
                                </span>
                                <span class="rating-info">${court.rating.toFixed(1)} ${rating}</span>
                            </div>
                            <div class='preview-other'>
                                <span>
                                    <span class='bold'>Surfaces:</span> ${court.surfaces}
                                </span>
                                <span>
                                    <span class="bold">Types:</span> ${court.types}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
                
                
                container.append(courtCard);
                
                $("#search-results").append(container);
                if (i % 3 === 0) {
                    container = $("<div>").addClass("row preview-padding");
                }
                
                i += 1;
            }
        }
    }

    display_search_results();
});