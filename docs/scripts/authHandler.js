// authHandler.js
const Auth = (() => {
    const KEY_ACCOUNT = 'account';
    const KEY_IS_LOGIN = 'is_login';

    // Đăng ký
    function register(username, password) {
        const stored = JSON.parse(localStorage.getItem(KEY_ACCOUNT + username) || 'null');
        if (stored && stored.username === username) {
            return { success: false, error: 'Username đã tồn tại' };
        }
        // Lưu account mới
        localStorage.setItem(KEY_ACCOUNT + username, JSON.stringify({ username, password }));
        // Tự động login
        localStorage.setItem(KEY_IS_LOGIN, 'true');
        return { success: true };
    }

    // Đăng nhập
    function login(username, password) {
        const stored = JSON.parse(localStorage.getItem(KEY_ACCOUNT + username) || 'null');
        if (!stored) {
            return { success: false, error: 'Chưa có tài khoản, vui lòng đăng ký trước' };
        }
        if (stored.username === username && stored.password === password) {
            localStorage.setItem(KEY_IS_LOGIN, 'true');
            return { success: true };
        }
        return { success: false, error: 'Sai username hoặc password' };
    }

    // Đăng xuất
    function logout() {
        localStorage.setItem(KEY_IS_LOGIN, 'false');
    }

    // Trạng thái login
    function isAuthenticated() {
        return localStorage.getItem(KEY_IS_LOGIN) === 'true';
    }

    // Lấy user hiện tại (username)
    function getUser() {
        if (!isAuthenticated()) return null;
        const stored = JSON.parse(localStorage.getItem(KEY_ACCOUNT + username) || 'null');
        return stored && stored.username;
    }

    return { register, login, logout, isAuthenticated, getUser };
})();


document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('auth-login-btn');
    const modalLogin = document.getElementById('auth-login-modal');
    const closeLogin = document.getElementById('auth-login-close');
    const formLogin = document.getElementById('auth-login-form');
    const btnLogout = document.getElementById('auth-logout-btn');
    const btnRegister = document.getElementById('auth-register-btn');
    const modalReg = document.getElementById('auth-register-modal');
    const closeReg = document.getElementById('auth-register-close');
    const formReg = document.getElementById('auth-register-form');
    const analyzeBtn = document.getElementById('analyze-btn');

    // Khởi tạo nút Đăng xuất
    btnLogout.textContent = 'Đăng xuất';
    btnLogout.addEventListener('click', () => {
        console.log("Out")
        Auth.logout();
        updateUI();
    });

    // Mở/đóng modal
    btnLogin.addEventListener('click', () => modalLogin.style.display = 'block');
    btnRegister.addEventListener('click', () => modalReg.style.display = 'block');
    closeLogin.addEventListener('click', () => modalLogin.style.display = 'none');
    closeReg.addEventListener('click', () => modalReg.style.display = 'none');

    // Xử lý form Đăng ký
    formReg.addEventListener('submit', e => {
        e.preventDefault();
        const u = document.getElementById('auth-register-username').value;
        const p = document.getElementById('auth-register-password').value;
        const res = Auth.register(u, p);
        if (!res.success) {
            return alert(res.error);
        }
        modalReg.style.display = 'none';
        updateUI();
    });

    // Xử lý form Đăng nhập
    formLogin.addEventListener('submit', e => {
        e.preventDefault();
        const u = document.getElementById('auth-login-username').value;
        const p = document.getElementById('auth-login-password').value;
        const res = Auth.login(u, p);
        if (!res.success) {
            return alert(res.error);
        }
        modalLogin.style.display = 'none';
        updateUI();
    });

    // Cập nhật UI theo trạng thái
    function updateUI() {
        window.location.reload()
        // const header = document.querySelector('header');
        // // Xóa các nút cũ
        // [btnLogin, btnRegister, btnLogout].forEach(btn => {
        //     if (header.contains(btn)) header.removeChild(btn);
        // });

        // if (Auth.isAuthenticated()) {
        //     header.appendChild(btnLogout);
        // } else {
        //     header.appendChild(btnLogin);
        //     header.appendChild(btnRegister);
        // }
    }

    // Chặn nút AI nếu chưa login
    analyzeBtn.addEventListener('click', e => {
        if (!Auth.isAuthenticated()) {
            e.preventDefault();
            alert('Phải đăng nhập để sử dụng');
        }
    });
    updateUIByStatus()
    function updateUIByStatus() {
        const isLogin = Auth.isAuthenticated();
        console.log(isLogin)
        if (isLogin) {
            btnLogin.style.display = 'none'
            btnRegister.style.display = 'none'
            btnLogout.style.display = 'defaut'
        } else {
            btnLogin.style.display = 'defaut'
            btnRegister.style.display = 'defaut'
            btnLogout.style.display = 'none'
        }
    }

});

