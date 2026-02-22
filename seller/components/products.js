import { productService } from "../../DataBase/services/productService.js";
import { userService } from "../../DataBase/services/userService.js";
import Product from "../../DataBase/models/Product.js";
export function productsPage() {
  // منع تكرار الايفنتات
  $(document).off("click", ".add-product");
  $(document).off("click", "#saveProduct");
  $(document).off("click", ".delete-btn");

  // فتح المودال
  $(document).on("click", ".add-product", function () {
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  });

  let vendorId = userService.getCurrentUser().id;

  // on page load
  $(function () {
    renderProducts();
  });

  function renderProducts() {
    $("table tbody").text("");
    let products = productService.getByVendor(vendorId);
    products.forEach((element) => {
      $("table tbody").append(`
      <tr>
        <td class="text-truncate" style="max-width:180px">${element.desc}</td>
        <td>${element.category}</td>
        <td>${element.price} $</td>
        <td>${element.discount} %</td>
        <td>${element.rating}</td>
        <td>${element.stock}</td>
        <td>${element.weight}</td>
        <td>
          <img src="${element.images[0]}" width="50" class="rounded">
        </td>
        <td class="text-nowrap">
          <i class="fas fa-eye text-primary me-2"></i>
          <i class="fas fa-edit text-success me-2"></i>
          <i data-productId=${element.id} class="fas fa-trash text-danger delete-btn"></i>
        </td>
      </tr>
    `);
    });
  }
  // حفظ المنتج
  $(document).on("click", "#saveProduct", function () {
    let title = $("#title").val();
    let desc = $("#desc").val();
    let category = $("#category").val();
    let price = $("#price").val();
    let discount = $("#discount").val();
    let stock = $("#stock").val();
    let weight = $("#weight").val();
    let image = $("#image").val();

    // ➕ Create Product
    const product = new Product({
      vendorId: vendorId,
      title: title,
      desc: desc,
      category: category,
      price: price,
      discount: discount,
      stock: stock,
      images: image ? [image] : [],
      weight: weight,
    });

    productService.create(product);

    bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
    $("#productForm")[0].reset();
    renderProducts();
  });

  // حذف
  $(document).on("click", ".delete-btn", function () {
    let productId = $(this).attr("data-productId");
    if (confirm("Are you sure you want to delete this product?")) {
      productService.remove(productId);
      renderProducts();
    }
  });

  return `
  <div class="container-fluid">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h3 class="mb-0">Products</h3>
      <button class="btn btn-primary add-product">
        <i class="fas fa-plus"></i> Add Product
      </button>
    </div>

    <div class="card shadow-sm p-3">

      <!-- ✅ Responsive Table Wrapper -->
      <div class="table-responsive-lg">
        <table class="table align-middle table-nowrap">
          <thead class="table">
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Weight</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

    </div>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Add Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <form id="productForm">
              <div class="row g-3">

                <div class="col-md-6">
                  <label>Title*</label>
                  <input type="text" class="form-control" id="title">
                </div>
                
                <div class="col-md-6">
                  <label>Category*</label>
                  <input type="text" class="form-control" id="category">
                </div>

                <div class="col-md-4">
                  <label>Price*</label>
                  <input type="number" class="form-control" id="price">
                </div>
                
                <div class="col-md-4">
                <label>Stock*</label>
                <input type="number" class="form-control" id="stock">
                </div>
                
                <div class="col-md-4">
                <label>Discount</label>
                <input type="number" class="form-control" id="discount">
                </div>
                
                <div class="col-md-8">
                  <label>Description</label>
                  <input type="text" class="form-control" id="desc">
                </div>
                
                <div class="col-md-4">
                  <label>Weight</label>
                  <input type="text" class="form-control" id="weight">
                </div>

                <div class="col-md-12">
                  <label>Image URL</label>
                  <input type="text" class="form-control" id="image">
                </div>

              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button class="btn btn-primary" id="saveProduct">Save</button>
          </div>

        </div>
      </div>
    </div>

  </div>
  `;
}
