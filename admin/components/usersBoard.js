import { userService } from "../../../DataBase/services/userService.js";

export function initUsersBoard() {
  displayUsers();
  function displayUsers() {
    let currentUser = userService.getCurrentUser();
    let allUsers = userService.getAll();
    let users = allUsers.filter((u) => u.id !== currentUser?.id);
    $("#usersTableBody").empty();
    // Render Users
    users.forEach((user) => {
      const userRow = `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="bg-primary-subtle text-${user.colorTheme} rounded-circle p-2 me-2 fw-bold" style="width: 35px; height: 35px; display: flex; align-items: center; justify-content: center;">${user.name.slice(0, 1)}</div>
                                ${user.name}
                            </div>
                        </td>
                        <td><span class="badge border " style="color:black;"g>${user.role}</span></td>
                        <td>${new Date(user.createdAt).toLocaleDateString("en-CA")}</td>
                        <td class="text-end">
                            <button data-id=${user.id}  class="btn btn-sm btn-outline-primary me-1 update-user-role"><i class="fas fa-edit"></i></button>
                            <button data-id=${user.id}  class="btn btn-sm btn-outline-danger delete-user"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
      $("#usersTableBody").append(userRow);
    });
  }

  //user Functions
  // delete user
  let userId = null;

  $(document).on("click", ".delete-user", function () {
    userId = $(this).attr("data-id");
    const modalEl = document.getElementById("confirmModal");

    modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

        <div class="modal-header">
        <h5 class="modal-title">Confirm Action</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
        Are you sure you want to delete this item?
        </div>

        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
        </button>
        <button type="button" id="confirmDeleteBtn" class="btn btn-danger">
            Yes, Delete
        </button>
        </div>

    </div>
    </div>
    `;

    // 3️⃣ Initialize Bootstrap modal instance
    const modal = new bootstrap.Modal(modalEl);

    modal.show();
  });

  $(document).on("click", "#confirmDeleteBtn", function () {
    if (!userId) return;

    userService.delete(userId);

    const modalEl = document.getElementById("confirmModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    displayUsers();
    modalInstance.hide();
  });

  // edit user role

  $(document).on("click", ".update-user-role", function () {
    userId = $(this).attr("data-id");
    const modalEl = document.getElementById("confirmModal");

    modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

        <div class="modal-header">
        <h5 class="modal-title">Change User Role</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
        <select class="form-select" id="selectedRole">
            <option value="admin">Admin</option>
            <option value="vendor">Vendor</option>
            <option value="customer">Customer</option>
        </select>
        </div>

        <div class="modal-footer">
        <button type="button" id="confirmChangeRole" class="btn btn-primary">
        Change role
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
        </button>
        </div>

    </div>
    </div>
    `;

    // 3️⃣ Initialize Bootstrap modal instance
    const modal = new bootstrap.Modal(modalEl);

    modal.show();
  });

  $(document).on("click", "#confirmChangeRole", function () {
    if (!userId) return;
    let targetUser = userService.getById(userId);
    let newRole = $("#selectedRole").val();
    if (targetUser.role === newRole) return;
    targetUser.role = newRole;
    //  userService.delete(userId);
    userService.update(userId, targetUser);
    const modalEl = document.getElementById("confirmModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    displayUsers();
    modalInstance.hide();
  });
}
