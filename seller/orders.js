
export function ordersPage() {
  return `
    <div class="container-fluid">

      

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
                <tr>
                  <td>#ORD-004</td>
                  <td>Mickel Smith</td>
                  <td>Laptop pro</td>
                  <td> $1499.99</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                  <td>2026-02-16</td>
                </tr>
                <tr>
                  <td>#ORD-005</td>
                  <td>Harry Wilson</td>
                  <td>Gaming Mouse</td>
                  <td> $29.99</td>
                  <td><span class="badge bg-warning text-dark">Processing</span></td>
                  <td>2026-02-17</td>
                </tr>
                <tr>
                  <td>#ORD-006</td>
                  <td>Brono Hernandez</td>
                  <td>T-Shirt</td>
                  <td> $49.99</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                  <td>2026-02-18</td>
                </tr>
                <tr>
                  <td>#ORD-007</td>
                  <td>Maison Mount</td>
                  <td>Jacket</td>
                  <td> $199.99</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                  <td>2026-02-19</td>
                </tr>
                <tr>
                  <td>#ORD-008</td>
                  <td>Jackop Ramsey</td>
                  <td>Gaming Keyboard</td>
                  <td> $99.99</td>
                  <td><span class="badge bg-warning text-dark">Processing</span></td>
                  <td>2026-02-15</td>
                </tr>
                <tr>
                  <td>#ORD-009</td>
                  <td>Alexander Isack</td>
                  <td>Football T-Shirt</td>
                  <td> $99.99</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                  <td>2026-02-20</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}


 