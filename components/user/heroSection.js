export default function heroSection() {
  return `
         <div id="heroSection" class="py-5 px-3 text-light">
            <p class=" fw-bold large-font"> Shop the Latest Products at Unbeatable Prices</p>
            <p class="h4 fw-light">Discover amazing deals on electronics, fashion, and more. Free shipping on orders
                over $50!
            </p>
            <div class="d-flex flex-column flex-md-row my-4">
                <button class=" border-1 border-secondary-subtle rounded-3 py-3 px-5 text-primary fw-bolder mx-3 my-3"
                    id="shopNowButton ">Shop Now <i class="fa-solid fa-arrow-right"></i>
                </button>
                <button class="rounded-3 py-3 px-5 text-light bg-primary  fw-bolder mx-3 signUp-hover"
                    id="SignUpButton">Sign Up foe Deals</button>
        </div>
  `;
}
