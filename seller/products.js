export function productsPage() {
  return `
  <div class="container-fluid">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3>Products</h3>
        <p class="text-muted">Manage your product inventory</p>
      </div>
      <button class="btn btn-primary">
        <i class="fas fa-plus"></i> Add Product
      </button>
    </div>

    <!-- Table -->
    <div class="card shadow-sm p-3">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Sales</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>Premium Wireless Headphones</td>
            <td>$299.99</td>
            <td>45</td>
            <td><span class="badge bg-success">Active</span></td>
            <td>289</td>
            <td>
              <i class="fas fa-eye text-primary me-2"></i>
              <i class="fas fa-edit text-success me-2"></i>
              <i class="fas fa-trash text-danger"></i>
            </td>
          </tr>

          <tr>
            <td>Latest Smartphone Pro</td>
            <td>$999.99</td>
            <td>12</td>
            <td><span class="badge bg-success">Active</span></td>
            <td>132</td>
            <td>
              <i class="fas fa-eye text-primary me-2"></i>
              <i class="fas fa-edit text-success me-2"></i>
              <i class="fas fa-trash text-danger"></i>
            </td>
          </tr>

          <tr>
            <td>Smart Fitness Watch</td>
            <td>$149.99</td>
            <td>0</td>
            <td><span class="badge bg-danger">Out of Stock</span></td>
            <td>89</td>
            <td>
              <i class="fas fa-eye text-primary me-2"></i>
              <i class="fas fa-edit text-success me-2"></i>
              <i class="fas fa-trash text-danger"></i>
            </td>
          </tr>

          <tr>
            <td>Wireless Earbuds Pro</td>
            <td>$179.99</td>
            <td>28</td>
            <td><span class="badge bg-success">Active</span></td>
            <td>402</td>
            <td>
              <i class="fas fa-eye text-primary me-2"></i>
              <i class="fas fa-edit text-success me-2"></i>
              <i class="fas fa-trash text-danger"></i>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
  `;
}