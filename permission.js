// ===============================
// FILE: permission.js
// ===============================

// Chống nháy giao diện
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("permission-loading");
});

// ===============================
// CHỜ FIREBASE KHỞI TẠO
// ===============================
window.addEventListener("load", function () {

    // Kiểm tra Firebase
    if (
        typeof firebase === "undefined" ||
        typeof auth === "undefined" ||
        typeof db === "undefined"
    ) {

        console.error("Firebase chưa khởi tạo!");
        alert("Firebase chưa khởi tạo!");

        return;
    }

    // ===============================
    // AUTH STATE
    // ===============================
    auth.onAuthStateChanged(async function (user) {

        // ===============================
        // CHƯA LOGIN
        // ===============================
        if (!user) {

            if (
                window.location.pathname.includes("login.html")
            ) {

                document.body.classList.remove(
                    "permission-loading"
                );

                return;
            }

            window.location.href = "login.html";
            return;
        }

        try {

            // ===============================
            // EMAIL USER
            // ===============================
            const userEmail =
                user.email.toLowerCase();

            // ===============================
            // LẤY USER FIRESTORE
            // ===============================
            const docSnap =
                await db.collection("users")
                    .doc(userEmail)
                    .get();

            // ===============================
            // USER KHÔNG TỒN TẠI
            // ===============================
            if (!docSnap.exists) {

                alert(
                    "Tài khoản chưa được cấp quyền!"
                );

                auth.signOut();

                return;
            }

            // ===============================
            // DATA USER
            // ===============================
            const userData =
                docSnap.data();

            const role =
                userData.role || "user";

            const permissions =
                userData.permissions || {};

            const isAdmin =
                role === "admin";

            // ===============================
            // CACHE SESSION
            // ===============================
            sessionStorage.setItem(
                "userName",
                userData.name || user.email
            );

            sessionStorage.setItem(
                "userRole",
                role
            );

            // ===============================
            // HIỆN MAIN TOOL
            // ===============================
            const loginSection =
                document.getElementById(
                    "login-section"
                );

            const mainTool =
                document.getElementById(
                    "main-tool"
                );

            if (loginSection)
                loginSection.style.display = "none";

            if (mainTool)
                mainTool.style.display = "block";

            // ===============================
            // HIỆN TÊN USER
            // ===============================
            const userDisplay =
                document.getElementById(
                    "user-display"
                );

            if (userDisplay) {

                userDisplay.innerText =
                    userData.name || user.email;
            }

            // ===============================
            // ADMIN PANEL
            // ===============================
            const adminPanel =
                document.getElementById(
                    "admin-panel"
                );

            if (adminPanel) {

                adminPanel.style.display =
                    isAdmin
                        ? "block"
                        : "none";
            }

            // ===============================
            // ADMIN ONLY
            // ===============================
            document.querySelectorAll(
                ".admin-only"
            )

                .forEach(function (el) {

                    el.style.setProperty(
                        "display",
                        isAdmin
                            ? ""
                            : "none",
                        "important"
                    );
                });

            // ===============================
            // CHECK PAGE ADMIN
            // ===============================
            if (
                !isAdmin &&
                window.location.pathname.includes(
                    "phanquyen.html"
                )
            ) {

                alert(
                    "Bạn không có quyền truy cập!"
                );

                window.location.href =
                    "index.html";

                return;
            }

            // ===============================
            // MENU PERMISSION
            // ===============================
            document.querySelectorAll(
                "[data-permission]"
            )

                .forEach(function (el) {

                    const permissionName =
                        el.getAttribute(
                            "data-permission"
                        );

                    const allowed =
                        isAdmin ||
                        permissions[
                        permissionName
                        ] === true;

                    el.style.setProperty(
                        "display",
                        allowed
                            ? ""
                            : "none",
                        "important"
                    );
                });

            // ===============================
            // ẨN CATEGORY RỖNG
            // ===============================
            document.querySelectorAll(
                ".category-section"
            )

                .forEach(function (section) {

                    const visibleCards =
                        section.querySelectorAll(
                            '[data-permission]:not([style*="display: none"])'
                        );

                    if (
                        visibleCards.length === 0
                    ) {
                        section.style.display =
                            "none";
                    }
                });

        } catch (error) {

            console.error(
                "Permission Error:",
                error
            );

            alert(
                "Lỗi kiểm tra phân quyền!"
            );
        }

        // ===============================
        // KẾT THÚC LOADING
        // ===============================
        document.body.classList.remove(
            "permission-loading"
        );
    });
});

// ===============================
// LOGIN
// ===============================
function login() {

    const email =
        document.getElementById("email")
            .value
            .trim();

    const password =
        document.getElementById("password")
            .value;

    if (!email || !password) {

        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    auth.signInWithEmailAndPassword(
        email,
        password
    )

        .catch(function (error) {

            alert(error.message);
        });
}

// ===============================
// LOGOUT
// ===============================
function logout() {

    sessionStorage.clear();

    auth.signOut()

        .then(function () {

            window.location.href =
                "login.html";
        });
}
