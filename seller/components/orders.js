import { orderService } from "../../DataBase/services/orderService.js";
import { productService } from "../../DataBase/services/productService.js";
import { userService } from "../../DataBase/services/userService.js";

export function ordersPage() {
  $(function () {
    let currentUser = userService.getCurrentUser().id;
    let userOrders = orderService.getByVendor(currentUser);
    let statusThemes = {
      Shipped: "info",
      pending: "warning",
      cancelled: "danger",
      delivered: "success",
    };
    userOrders.forEach((item) => {
      let product = productService.getById(item.productId);
      $("tbody").append(
        `<tr>
        <td>${item.orderId.substr(0, 8)}</td>
        <td>${product.title}</td>
        <td>${item.quantity}</td>
        <td>${item.total.toFixed(2)} $</td>
        <td><span class="badge bg-${statusThemes[item.status]}">${item.status}</span></td>
        <td>${new Date(item.date).toISOString().split("T")[0]}</td>
      </tr>`,
      );
    });
  });

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
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody >
               
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}
