export function overview() {
  return `
    <div id="overview-page" class="page-section active-section">
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <div class="stat-card d-flex justify-content-between align-items-start">
                            <div><p class="text-muted small mb-1">Total Users</p><h4 class="fw-bold mb-1">12,845</h4><small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 15.3%</small></div>
                            <div class="stat-icon bg-primary bg-opacity-10 text-primary"><i class="fas fa-user-friends"></i></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card d-flex justify-content-between align-items-start">
                            <div><p class="text-muted small mb-1">Active Sellers</p><h4 class="fw-bold mb-1">1632</h4><small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> + 10% this month</small></div>
                            <div class="stat-icon bg-success bg-opacity-10 text-success"><i class="fa-solid fa-bag-shopping"></i></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card d-flex justify-content-between align-items-start">
                            <div><p class="text-muted small mb-1">Revenue</p><h4 class="fw-bold mb-1">$363.2K</h4><small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 22.4%</small></div>
                            <div class="stat-icon bg-success bg-opacity-10 text-success"><i class="fas fa-dollar-sign"></i></div>
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-4">
                    <div class="col-lg-8"><div class="card-container"><h6 class="fw-bold mb-3"><i class="fas fa-chart-bar me-2 text-muted"></i>Platform Revenue (Monthly)</h6><canvas id="revenueBarChart"></canvas></div></div>
                    <div class="col-lg-4"><div class="card-container"><h6 class="fw-bold mb-3"><i class="fas fa-chart-pie me-2 text-muted"></i>Sales by Category</h6><canvas id="categoryChart"></canvas></div></div>
                </div>

                <div class="card-container">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-0">Pending Product Approvals</h6>
                        <span id="pending-count" class="badge bg-danger rounded-pill">2 Pending</span>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" style="font-size: 14px;">
                            <thead class="table-light">
                                <tr><th>Product Name</th><th>Seller</th><th>Category</th><th>Price</th><th class="text-center">Actions</th></tr>
                            </thead>
                            <tbody id="pending-products-list">
                                <tr>
                                    <td>iPhone 15 Pro Max</td>
                                    <td>Apple Store</td>
                                    <td>Electronics</td>
                                    <td>$1,199.00</td>
                                    <td class="text-center">
                                        <button class="btn-action border-success text-success"><i class="fas fa-check"></i></button>
                                        <button class="btn-action border-danger text-danger"><i class="fas fa-times"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wireless Headphones</td>
                                    <td>Sony Official</td>
                                    <td>Audio</td>
                                    <td>$349.00</td>
                                    <td class="text-center">
                                        <button class="btn-action border-success text-success"><i class="fas fa-check"></i></button>
                                        <button class="btn-action border-danger text-danger"><i class="fas fa-times"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wireless Headphones</td>
                                    <td>Sony Official</td>
                                    <td>Audio</td>
                                    <td>$349.00</td>
                                    <td class="text-center">
                                        <button class="btn-action border-success text-success"><i class="fas fa-check"></i></button>
                                        <button class="btn-action border-danger text-danger"><i class="fas fa-times"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Wireless Headphones</td>
                                    <td>Sony Official</td>
                                    <td>Audio</td>
                                    <td>$349.00</td>
                                    <td class="text-center">
                                        <button class="btn-action border-success text-success"><i class="fas fa-check"></i></button>
                                        <button class="btn-action border-danger text-danger"><i class="fas fa-times"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    `;
}
