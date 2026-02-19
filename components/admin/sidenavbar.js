export function navbar() {
  return `
    <div class="sidebar d-flex flex-column p-2">
        <div class="p-3 mb-3 d-flex align-items-center">
            <i class="fas fa-shield-alt text-danger fs-4 me-2"></i>
            <div>
                <h6 class="mb-0 fw-bold">Admin Panel</h6>
                
            </div>
        </div>
        <ul class="nav flex-column mb-auto" id="sideNav">
            <li><a class="nav-link active" data-target="overview-page"><i class="fas fa-th-large me-2"></i> Overview</a>
            </li>
            <li><a class="nav-link" data-target="users-page"><i class="fas fa-users me-2"></i> Users</a></li>
            <li><a class="nav-link" data-target="products-page"><i class="fas fa-box me-2"></i> Products</a></li>
            <li><a class="nav-link" data-target="orders-page"><i class="fas fa-shopping-cart me-2"></i> Orders</a></li>
        </ul>
    </div>

    <div class="main-content">
        <header class="top-header">
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="fw-bold mb-0 text-dark" id="dynamicTitle">Dashboard Overview</h4>
                <div class="d-flex align-items-center">
                    <div class="text-end me-3">
                        <small class="d-block text-muted fw-semibold"
                            style="font-size: 11px; text-transform: uppercase;">Logged in as</small>
                        <span class="fw-bold text-dark">System Administrator</span>
                    </div>
                    <div class="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                        style="width:40px; height:40px; border: 2px solid #fff;">A</div>
                </div>
            </div>
        </header>`;
}