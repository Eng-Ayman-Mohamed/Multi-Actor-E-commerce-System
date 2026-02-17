
export function overviewPage() {
  return `
    <div class="container-fluid">

      <!-- Row 1 : Cards -->
      <div class="row g-4 mb-4">

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Total Revenue</h6>
            <h4>$31,200</h4>
            <small class="text-success">+12.5% from last month</small>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Total Orders</h6>
            <h4>902</h4>
            <small class="text-success">+8.2% from last month</small>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Products</h6>
            <h4>24</h4>
            <small class="text-danger">3 out of stock</small>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Customers</h6>
            <h4>1,245</h4>
            <small class="text-success">+15.3% from last month</small>
          </div>
        </div>

      </div>

      <!-- Row 2 : Charts -->
      <div class="row g-4 mb-4">

        <div class="col-md-6">
          <div class="card shadow-sm p-3">
            <h6>Sales Overview</h6>
            <canvas id="salesChart"></canvas>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-sm p-3">
            <h6>Monthly Revenue</h6>
            <canvas id="revenueChart"></canvas>
          </div>
        </div>

      </div>

      <!-- Row 3 : Table -->
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm p-3">
            <h6>Recent Orders</h6>
            <table class="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>John Doe</td>
                  <td>Premium Wireless Headphones</td>
                  <td>$299.99</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                  <td>2026-02-12</td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>Jane Smith</td>
                  <td>Latest Smartphone Pro</td>
                  <td>$999.99</td>
                  <td><span class="badge bg-warning text-dark">Processing</span></td>
                  <td>2026-02-13</td>
                </tr>
                <tr>
                  <td>#ORD-003</td>
                  <td>John Doe</td>
                  <td>Premium Wireless Headphones</td>
                  <td>$299.99</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                  <td>2026-02-12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}


 