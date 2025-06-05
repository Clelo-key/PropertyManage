// 简单的路由实现
export const router = {
    routes: {},
    currentPage: null,

    // 注册路由
    register(path, pageHandler) {
        this.routes[path] = pageHandler;
        return this;
    },

    // 导航到指定路径
    navigate(path) {
        const pageHandler = this.routes[path];
        if (pageHandler) {
            this.currentPage = path;
            pageHandler();
            window.history.pushState({}, '', path);
        } else {
            console.error(`路由未定义: ${path}`);
        }
    },

    // 初始化路由
    init() {
        // 处理浏览器后退/前进
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname);
        });

        // 初始加载
        this.navigate(window.location.pathname || '/');
    }
};