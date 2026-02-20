export function analyticsPage() {
  return `
    <div class="container-fluid">

      <!-- Header -->
      <div class="mb-4">
        <h3>Analytics</h3>
        <p class="text-muted">Track your store performance</p>
      </div>

      <!-- Row 1 : Summary Cards -->
      <div class="row g-4 mb-4">

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Total Sales</h6>
            <h4>$54,320</h4>
            <small class="text-success">+10.4% this period</small>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Net Profit</h6>
            <h4>$18,760</h4>
            <small class="text-success">+6.8%</small>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Orders</h6>
            <h4>1,284</h4>
            <small class="text-muted">Last 30 days</small>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Avg Order Value</h6>
            <h4>$42.3</h4>
            <small class="text-danger">-2.1%</small>
          </div>
        </div>

      </div>

      <!-- Row 2 : Charts -->
      <div class="row g-4 mb-4">

        <div class="col-md-8">
          <div class="card shadow-sm p-3">
            <h6>Sales Trend</h6>
            <canvas id="analyticsSalesChart"></canvas>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <h6>Orders Status</h6>
            <canvas id="ordersStatusChart"></canvas>
          </div>
        </div>

      </div>

      <!-- Row 3 : Top Products -->
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm p-3">
            <h6>Top Selling Products</h6>
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wireless Earbuds Pro</td>
                  <td>402</td>
                  <td>$71,958</td>
                </tr>
                <tr>
                  <td>Premium Headphones</td>
                  <td>289</td>
                  <td>$86,510</td>
                </tr>
                <tr>
                  <td>Smart Fitness Watch</td>
                  <td>198</td>
                  <td>$29,700</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}