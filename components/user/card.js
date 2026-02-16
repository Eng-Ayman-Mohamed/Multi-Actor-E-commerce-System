export function productCard(image, productTitle, stars, reviews, price) {
  return `
        <div class="cardContainer col-12 col-md-6 col-lg-4 col-xl-3 my-2">
        <div class="card p-0 h-100  position-relative">
                    <button class="wishBtn border-0 w-auto position-absolute end-0 rounded-circle m-2 z-1"><i
                            class="h5 fa-regular fa-heart my-2"></i></button>
                            <div class="overflow-hidden h-100"><img src=${image} class="card-img-top  h-100 object-fit-cover"></div>
                    <div class="card-body">
                        <h5 class="h6 fw-bold card-title">${productTitle}</h5>
                        <div class="d-flex align-middle">
                            <div data-coreui-read-only="true" data-coreui-size="sm" data-coreui-toggle="rating"
                                data-coreui-value="${stars}">
                            </div>
                            <span class="mx-2 fw-lighter">(${reviews})</span>
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
