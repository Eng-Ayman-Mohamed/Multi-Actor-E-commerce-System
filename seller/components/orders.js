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

      $("tbody").append(`
        <tr>
          <td class="text-nowrap">${item.orderId.substr(0, 8)}</td>
          <td class="product-col text-truncate">${product.title}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-nowrap">${item.total.toFixed(2)} $</td>
          <td>
            <span class="badge bg-${statusThemes[item.status]}">
              ${item.status}
            </span>
          </td>
          <td class="text-nowrap">
            ${new Date(item.date).toISOString().split("T")[0]}
          </td>
        </tr>
      `);
    });
  });

  return `
    <div class="container-fluid">

      <style>
        
        .product-col {
          max-width: 160px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 576px) {
          table {
            font-size: 13px;
          }
        }
      </style>

      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm p-3">
            <h6 class="mb-3">Recent Orders</h6>

            <div class="table-responsive">
              <table class="table table-sm align-middle">
                <thead class="table">
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  `;
}
