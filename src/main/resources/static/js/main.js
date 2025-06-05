import { router } from './router.js';
import { renderLoginPage, renderRegisterPage } from './pages/login.js';
import { renderDashboardPage } from './pages/dashboard.js';

// 初始化路由
router
    .register('/', renderLoginPage)
    .register('/login', renderLoginPage)
    .register('/register', renderRegisterPage)
    .register('/dashboard', renderDashboardPage)
    .init();

// 检查用户是否已登录
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token && window.location.pathname === '/dashboard') {
        router.navigate('/');
    }
}

// 全局事件监听
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});