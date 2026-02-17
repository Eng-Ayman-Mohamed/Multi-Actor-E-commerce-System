export function category(emoji, catName, itemsNum) {
  return `<a  href="./user/products/index.html?" id="Category" class=" text-body category text-center my-5 d-inline-block shadow-sm col-5 col-lg-3  col-xl rounded-lg p-3 " >
                    <p class="h1 p-2">${emoji}</p>
                    <p class="h5 fw-bold">${catName}</p>
                    <p>${itemsNum} items</p>
                </a>`;
}
