export function productCard(id, image, productTitle, stars, reviews, price) {
  return `
        <div class="cardContainer col-12  col-lg-6 col-xl-4 my-2">
        <div class="card p-0 h-100  position-relative">
                    <button class="wishBtn border-0 w-auto position-absolute end-0 rounded-circle m-2 z-1"><i
                            class="h5 fa-regular fa-heart my-2"></i></button>
                            <div class="overflow-hidden h-100"><img src=${image} class="card-img-top  h-100 object-fit-cover"></div>
                    <div class="card-body">
                        <a class="h6 fw-bold card-title" href="../../user/products/product-details.html?id=${id}">${productTitle}</a>
                         <div class="rating">
                                ${renderStars(`${stars}`)}
                            <span class="count">(${reviews})</span>
                             </div>
                        <div class="d-flex justify-content-between">
                            <p class="h3 fw-bold text-primary">$${price}</p>
                            <button href="#" class="btn btn-primary"><i
                                    class="fa-solid fa-cart-shopping"></i>Add</button>
                        </div>
                    </div>
                </div>
                </div>
    `;
}

function renderStars(num) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa-${i <= num ? "solid" : "regular"} fa-star"></i>`;
  }
  return stars;
}
