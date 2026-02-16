import { productCard } from "./card.js";

export function featuredProducts() {
  return `<div id="featuredProducts" class="mb-5 container-lg px-4 ">
            <div class="d-flex justify-content-between">
                <div>
                    <p class="h2 fw-bold">Featured Products</p>
                    <p>HandPicked deals just for you</p>
                </div>
                <div class="view-all text-primary align-self-center fw-bold">View All <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
            <div id="featuredProductsContainer" class="row   justify-content-around">
            </div>
        </div>`;
}

export function initFeaturedProducts() {
  let featuredProducts = [
    {
      productImage:
        "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc3MTAxNjY0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      productTitle: "Premium wireless Headphones",
      productStars: 3,
      productReviews: 243,
      productPrice: 299.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1741061961703-0739f3454314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc3MTAxMTU3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      productTitle: "Latest Smartphone Pro",
      productStars: 4,
      productReviews: 350,
      productPrice: 999.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

      productTitle: "Ultra HD Smart TV",
      productStars: 3,
      productReviews: 243,
      productPrice: 899.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1719744755507-a4c856c57cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzcxMDQ2MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080",

      productTitle: "Smart Fitness Watch",
      productStars: 3.5,
      productReviews: 243,
      productPrice: 249.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzA5NzY1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",

      productTitle: "Professional Camera Kit",
      productStars: 4.5,
      productReviews: 243,
      productPrice: 1499.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc3MTAzODMyNHww&ixlib=rb-4.1.0&q=80&w=1080",

      productTitle: "Gaming Console Bundle",
      productStars: 4,
      productReviews: 243,
      productPrice: 499.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzcwOTM5MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080",

      productTitle: "Wireless Earbuds Pro",
      productStars: 3,
      productReviews: 243,
      productPrice: 179.99,
    },
    {
      productImage:
        "https://images.unsplash.com/photo-1769603795371-ad63bd85d524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzcxMDA3MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080",

      productTitle: "Premium Tablet Device",
      productStars: 3,
      productReviews: 243,
      productPrice: 699.99,
    },
  ];

  featuredProducts.forEach((item) => {
    $("#featuredProductsContainer").append(
      productCard(
        item.productImage,
        item.productTitle,
        item.productStars,
        item.productReviews,
        item.productPrice,
      ),
    );
  });
}
