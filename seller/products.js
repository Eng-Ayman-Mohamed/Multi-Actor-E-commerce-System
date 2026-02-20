  export function productsPage() {

  // منع تكرار الايفنتات
  $(document).off('click', '.add-product');
  $(document).off('click', '#saveProduct');
  $(document).off('click', '.delete-btn');


  // فتح المودال
  $(document).on('click', '.add-product', function () {
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
  });


  // حفظ المنتج
  $(document).on('click', '#saveProduct', function () {

    let desc = $('#desc').val();
    let category = $('#category').val();
    let price = $('#price').val();
    let discount = $('#discount').val();
    let rating = $('#rating').val();
    let stock = $('#stock').val();
    let weight = $('#weight').val();
    let image = $('#image').val();

    if (!desc || !category || !price) {
      alert("Please fill required fields");
      return;
    }

    $('table tbody').append(`
      <tr>
        <td>${desc}</td>
        <td>${category}</td>
        <td>${price}</td>
        <td>${discount}</td>
        <td>${rating}</td>
        <td>${stock}</td>
        <td>${weight}</td>
        <td>
          <img src="${image}" width="50" class="rounded">
        </td>
        <td>
          <i class="fas fa-eye text-primary me-2"></i>
          <i class="fas fa-edit text-success me-2"></i>
          <i class="fas fa-trash text-danger delete-btn"></i>
        </td>
      </tr>
    `);

    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    $('#productForm')[0].reset();
  });


  // حذف
  $(document).on('click', '.delete-btn', function () {
    if (confirm('Are you sure you want to delete this product?')) {
      $(this).closest('tr').remove();
    }
  });



  return `
  <div class="container-fluid">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3>Products</h3>
      </div>
      <button class="btn btn-primary add-product">
        <i class="fas fa-plus"></i> Add Product
      </button>
    </div>

    <div class="card shadow-sm p-3">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Descraibe</th>
            <th>category</th>
            <th>price</th>
            <th>discount</th>
            <th>rating</th>
            <th>stock</th>
            <th>weight</th>
            <th>images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
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
                  <label>Description</label>
                  <input type="text" class="form-control" id="desc">
                </div>

                <div class="col-md-6">
                  <label>Category</label>
                  <input type="text" class="form-control" id="category">
                </div>

                <div class="col-md-4">
                  <label>Price</label>
                  <input type="number" class="form-control" id="price">
                </div>

                <div class="col-md-4">
                  <label>Discount</label>
                  <input type="number" class="form-control" id="discount">
                </div>

                <div class="col-md-4">
                  <label>Rating</label>
                  <input type="number" class="form-control" id="rating">
                </div>

                <div class="col-md-4">
                  <label>Stock</label>
                  <input type="number" class="form-control" id="stock">
                </div>

                <div class="col-md-4">
                  <label>Weight</label>
                  <input type="text" class="form-control" id="weight">
                </div>

                <div class="col-md-4">
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
productsPage();