import { userAPI } from '../api.js';
import { showNotification } from '../components/notifications.js';
import { utils } from '../utils.js';
import { router } from '../router.js';

export function renderRegisterPage() {
    document.body.innerHTML = `
        <div id="register-page" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary p-4">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
                <div class="p-8">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <i class="fa fa-user-plus text-primary text-3xl"></i>
                        </div>
                        <h1 class="text-3xl font-bold text-primary mb-2">创建账户</h1>
                        <p class="text-gray-500">请填写以下信息注册新账户</p>
                    </div>
                    
                    <form id="register-form" class="space-y-5">
                        <div>
                            <label for="register-username" class="block text-sm font-medium text-gray-700 mb-1">
                                用户名 <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fa fa-user text-gray-400"></i>
                                </div>
                                <input type="text" id="register-username" name="username" required minlength="3" maxlength="20"
                                    class="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-custom"
                                    placeholder="请输入用户名（3-20位字符）">
                            </div>
                        </div>
                        
                        <div>
                            <label for="register-email" class="block text-sm font-medium text-gray-700 mb-1">
                                邮箱 <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fa fa-envelope text-gray-400"></i>
                                </div>
                                <input type="email" id="register-email" name="email" required
                                    class="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-custom"
                                    placeholder="请输入有效邮箱地址">
                            </div>
                        </div>
                        
                        <div>
                            <label for="register-password" class="block text-sm font-medium text-gray-700 mb-1">
                                密码 <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fa fa-lock text-gray-400"></i>
                                </div>
                                <input type="password" id="register-password" name="password" required minlength="6"
                                    class="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-custom"
                                    placeholder="请输入密码（至少6位）">
                            </div>
                        </div>
                        
                        <div>
                            <label for="register-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
                                确认密码 <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fa fa-lock text-gray-400"></i>
                                </div>
                                <input type="password" id="register-confirm-password" name="confirmPassword" required minlength="6"
                                    class="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-custom"
                                    placeholder="请再次输入密码">
                            </div>
                        </div>
                        
                        <button type="submit" 
                            class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-custom flex items-center justify-center space-x-2 shadow-lg shadow-primary/20">
                            <i class="fa fa-user-plus"></i>
                            <span>立即注册</span>
                        </button>
                    </form>
                    
                    <div class="mt-6 text-center">
                        <p class="text-gray-600">
                            已有账号？<button id="go-to-login" class="text-primary hover:underline font-medium transition-custom">返回登录</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 绑定表单提交事件
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // 表单验证
        if (!username || !email || !password || !confirmPassword) {
            showNotification('error', '注册失败', '所有字段均为必填项');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('error', '注册失败', '两次输入的密码不一致');
            return;
        }

        if (password.length < 6) {
            showNotification('error', '注册失败', '密码至少需要6位字符');
            return;
        }

        try {
            utils.showLoading(true);
            const response = await userAPI.register({ username, email, password });

            if (response.code === 0) {
                showNotification('success', '注册成功', '请使用新账号登录');
                setTimeout(() => {
                    router.navigate('/login');
                }, 1500);
            } else {
                showNotification('error', '注册失败', response.message || '注册失败，请检查输入信息');
            }
        } catch (error) {
            showNotification('error', '注册失败', '网络请求失败，请稍后重试');
            console.error('注册接口错误:', error);
        } finally {
            utils.showLoading(false);
        }
    });

    // 绑定返回登录页事件
    document.getElementById('go-to-login').addEventListener('click', () => {
        router.navigate('/login');
    });
}