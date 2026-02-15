function getProducts() {
  return $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET"
  });
}
