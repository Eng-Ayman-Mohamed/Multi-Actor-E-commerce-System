export function productCard(
  id,
  image,
  productTitle,
  stars,
  reviews,
  price,
  featured,
) {
  return `
        <div class="cardContainer col-12  col-lg-6 col-xl-4 my-2">
        <div class="card p-0 h-100  position-relative">
                        ${featured ? ` <span class="text-warning z-1 position-absolute end-0 h3 my-3 mx-2 " title="Featured Product" ><i " class="fa-solid fa-bookmark" ></i></span>` : ""}
                            <div class="overflow-hidden h-100"><img src=${image} class="card-img-top  h-100 object-fit-cover"></div>
                    <div class="card-body">
                        <a class="h6 fw-bold card-title" href="../../user/products/product-details.html?id=${id}">${productTitle}</a>
                         <div class="rating">
                                ${renderStars(`${Math.round(stars)}`)}
                            <span class="count">(${reviews})</span>
                             </div>
                        <div class="d-flex justify-content-between">
                            <p class="h3 fw-bold text-primary">$${price}</p>
                            <button data-productId=${id}  class="addToCartBtn btn btn-primary"><i
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
