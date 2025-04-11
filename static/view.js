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
    
    $("#view-results").empty();
    
    let rating = generateStarRating(court.rating);

    let container = `<div class='name-container'>
                        <span class='welcome-text'> ${court.name} </span>
                        <span class='rating-text bold'>${court.rating.toFixed(1)} ${rating}</span>
                        <form id="edit-court" action="/edit/${court.id}" method="get">
                            <button class="btn accent-btn" type="submit">Edit data</button>
                        </form>
                      </div>`;
                    
    container += "<div class='row'>";
    container += "<div class='col-md-6 col-sm-12'>";
    container += `<img class='court-image' alt="Image of ${court.name}" src="${court.image}">`;
    container += `<div class='container info-container'>
                    <span>${court.description}</span>
                  </div>`
    container += `<div class='container info-container'>
                    <span class='grey address-font'>Address: </span>
                    <span class='bold address-font'>${court.address}</span>
                  </div>`;
    container += "</div>";
    container += "<div class='col-md-6 col-sm-12'>";

    container += `<div class='container first-container'>
                    <span class='grey'>Price: </span>
                    <span class='bold price-padding'>`;
    if (court.price == 0) {
        container += "Free</span></div>";
    }
    else {
        container += `$${court.price}/hr</span></div>`;
    }

    container += `<div class='container info-container'> 
                    <span class='grey type-padding'>Court types: </span>`;
    for (let court_type of court.types) {
        container += `<a href='/search?search-input=${court_type}' class='bold link each-type'>${court_type}</a>`;
    }
    container += "</div>";

    container += `<div class='container info-container'> 
                  <span class='grey surface-padding'>Court surfaces: </span>`;
    for (let surface of court.surfaces) {
        container += `<a href='/search?search-input=${surface}' class='bold link each-surface'>${surface}</a>`;
    }
    container += "</div>";

    container += `<div class='container info-container'> 
                    <span class='grey'>Number of courts: </span>
                    <span class='bold number-padding'>${court.courts}</span>
                  </div>`;       

    container += `<div class='container info-container'>
                    <span class='grey'>Travel time: </span>
                    <span class='bold trip-padding'>`;
    if (court.trip > 60) {
        container += `${Math.floor(court.trip/60)} hr. ${court.trip%60} min.</span>`;
    }
    else {
        container += `${court.trip} min.</span>`;
    }
    container += "<span class='bold smaller'> (from Columbia)</span></div>";

    if (court.reviews === '0') {
        container += `<div class='container info-container'>
                        <span class='grey'>Reviews: </span>
                        <span class='bold no-review-padding'>No reviews yet</span>
                      </div>`;
    }
    else {
        let reviewsHTML = `
        <div class='container info-container'>
            <span class='grey'>Reviews: </span>
            <ul class='reviews-list'>
        `;
        for (let review of court.reviews) {
            reviewsHTML += `
                <li class='review-item'>
                    <blockquote class='review-content'>
                        <p>${review}</p>
                    </blockquote>
                </li>
            `;
        }
        reviewsHTML += `
                </ul>
            </div>
        `;
        container += reviewsHTML;
    }
    // container += `<div class='container info-container'> 
    //                 <span class='grey'>Reviews: </span>
    //               <ul>`;     
    // for (let review of court.reviews) {
    //     container += `<li>${review}</li>`;
    // }
    // container += `</ul></div>
    //             </div>
    //             </div>`;

    $("#view-results").append(container);
});