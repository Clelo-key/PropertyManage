import {loadAssets} from '../components/assets.js';
import {logout} from '../components/auth.js';
import {openEditAssetModal} from '../components/modals.js';
import {showNotification} from '../components/notifications.js';
import {assetAPI} from "../api.js";

// 保存新增资产的回调
export function handleNewAsset(asset) {
    assetAPI.createAsset(asset) // 使用api.js中的createAsset函数
        .then(createdAsset => {
            if (createdAsset.code != 0) { 
                throw createdAsset
            }
            console.log(createdAsset)
            showNotification('success', '新增成功', '资产已创建');
            loadAssets(); // 刷新资产列表
        })
        .catch(error => {
            showNotification('error', '新增失败', error.message || '请求失败，请检查网络');
            console.error('新增资产失败:', error);
        });
}

// 更新现有资产的回调
export function handleUpdateAsset(assetId, updatedAsset) {
    assetAPI.updateAsset(assetId, updatedAsset) // 使用updateAsset函数
        .then(() => {
            showNotification('success', '更新成功', '资产已更新');
            loadAssets(); // 刷新资产列表
        })
        .catch(error => {
            showNotification('error', '更新失败', error.message || '请求失败，请检查网络');
            console.error('更新资产失败:', error);
        });
}

// 删除资产的回调
export function handleDeleteAsset(assetId) {
    if (confirm('确定要删除此资产吗？')) {
        assetAPI.deleteAsset(assetId) // 使用deleteAsset函数
            .then(() => {
                showNotification('success', '删除成功', '资产已删除');
                loadAssets(); // 刷新资产列表
            })
            .catch(error => {
                showNotification('error', '删除失败', error.message || '请求失败，请检查网络');
                console.error('删除资产失败:', error);
            });
    }
}


// 渲染仪表盘页面
export function renderDashboardPage() {
    document.body.innerHTML = `
        <div id="app-page" class="min-h-screen flex flex-col">
            <!-- 顶部导航栏 -->
            <header class="bg-white shadow-sm sticky top-0 z-50 transition-custom">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fa fa-cubes text-primary text-2xl"></i>
                        <h1 class="text-xl font-bold text-primary">资产管理系统</h1>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <div class="hidden md:flex items-center space-x-2">
                            <i class="fa fa-user-circle-o text-gray-500"></i>
                            <span id="current-username" class="text-gray-700">${localStorage.getItem('username') || '用户'}</span>
                        </div>
                        <button id="logout-btn" class="flex items-center space-x-1 text-gray-600 hover:text-primary transition-custom">
                            <i class="fa fa-sign-out"></i>
                            <span class="hidden md:inline">退出登录</span>
                        </button>
                    </div>
                </div>
            </header>
            
            <!-- 主内容区域 -->
            <main class="flex-grow container mx-auto px-4 py-6">
                <!-- 搜索区域 -->
                <div class="bg-white rounded-xl shadow-card p-5 mb-6">
                    <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                        <div class="flex-grow">
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fa fa-search text-gray-400"></i>
                                </div>
                                <input type="text" id="search-input" 
                                    class="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-custom"
                                    placeholder="搜索资产名称或编号...">
                            </div>
                        </div>
                        
                        <div class="flex space-x-3">
                            <button id="search-btn" class="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-custom flex items-center space-x-2 shadow-lg shadow-primary/20">
                                <i class="fa fa-search"></i>
                                <span>搜索</span>
                            </button>
                            <button id="add-asset-btn" class="bg-success hover:bg-success/90 text-white font-medium py-3 px-6 rounded-lg transition-custom flex items-center space-x-2 shadow-lg shadow-success/20">
                                <i class="fa fa-plus"></i>
                                <span>新增资产</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 统计卡片 -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white rounded-xl shadow-card p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">总资产数量</p>
                                <h3 id="total-assets" class="text-3xl font-bold text-gray-800 mt-1">0</h3>
                            </div>
                            <div class="bg-primary/10 p-3 rounded-lg">
                                <i class="fa fa-cubes text-primary text-xl"></i>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <div class="flex items-center">
                                <i class="fa fa-arrow-up text-success mr-1"></i>
                                <span class="text-success text-sm font-medium">12.5%</span>
                                <span class="text-gray-500 text-sm ml-1">较上月</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-card p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">已分配资产</p>
                                <h3 id="assigned-assets" class="text-3xl font-bold text-gray-800 mt-1">0</h3>
                            </div>
                            <div class="bg-info/10 p-3 rounded-lg">
                                <i class="fa fa-check-circle text-info text-xl"></i>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <div class="flex items-center">
                                <i class="fa fa-arrow-up text-success mr-1"></i>
                                <span class="text-success text-sm font-medium">8.2%</span>
                                <span class="text-gray-500 text-sm ml-1">较上月</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-card p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">未分配资产</p>
                                <h3 id="unassigned-assets" class="text-3xl font-bold text-gray-800 mt-1">0</h3>
                            </div>
                            <div class="bg-warning/10 p-3 rounded-lg">
                                <i class="fa fa-exclamation-circle text-warning text-xl"></i>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <div class="flex items-center">
                                <i class="fa fa-arrow-down text-error mr-1"></i>
                                <span class="text-error text-sm font-medium">5.3%</span>
                                <span class="text-gray-500 text-sm ml-1">较上月</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-card p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">资产总价值</p>
                                <h3 id="total-value" class="text-3xl font-bold text-gray-800 mt-1">¥0</h3>
                            </div>
                            <div class="bg-success/10 p-3 rounded-lg">
                                <i class="fa fa-cny text-success text-xl"></i>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <div class="flex items-center">
                                <i class="fa fa-arrow-up text-success mr-1"></i>
                                <span class="text-success text-sm font-medium">18.7%</span>
                                <span class="text-gray-500 text-sm ml-1">较上月</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 资产列表 -->
                <div class="bg-white rounded-xl shadow-card overflow-hidden">
                    <div class="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 class="text-lg font-bold text-gray-800">资产列表</h2>
                        <div class="mt-3 md:mt-0 text-sm text-gray-500">
                            总计: <span id="total-assets-count" class="font-medium text-gray-800">0</span> 条记录
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">资产编号</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">资产名称</th>
                                     <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">管理人</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">归属部门</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">生产日期</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">存放地点</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody id="assets-table-body" class="divide-y divide-gray-200">
                                <!-- 资产数据由JS动态填充 -->
                                <tr class="text-center">
                                    <td colspan="7" class="px-6 py-12 text-gray-500">
                                        <div class="flex flex-col items-center">
                                            <i class="fa fa-folder-open-o text-4xl mb-3 text-gray-300"></i>
                                            <p>暂无资产数据</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="p-5 border-t border-gray-100 flex items-center justify-between">
                        <div class="text-sm text-gray-500">
                            显示 <span class="font-medium">1</span> 到 <span class="font-medium">0</span> 条，共 <span class="font-medium" id="pagination-total">0</span> 条记录
                        </div>
                        <div class="flex space-x-1">
                            <button id="prev-page" class="px-3 py-1 rounded border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                <i class="fa fa-chevron-left"></i>
                            </button>
                            <button id="page-1" class="px-3 py-1 rounded border border-gray-300 bg-primary text-sm text-white">1</button>
                            <button id="next-page" class="px-3 py-1 rounded border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 页脚 -->
            <footer class="bg-white py-4 border-t border-gray-200">
                <div class="container mx-auto px-4 text-center text-sm text-gray-500">
                    <p>© 2025 资产管理系统 | 版本 1.0.0</p>
                </div>
            </footer>
        </div>
    `;

    // 加载资产数据（假设loadAssets使用api.js中的getAllAssets）
    loadAssets();

    // 绑定搜索事件（假设searchAssets来自api.js）
    document.getElementById('search-btn').addEventListener('click', async () => {
        const searchTerm = document.getElementById('search-input').value.trim();
        // 这里需要根据实际API参数调整，假设支持名称和编号搜索
        await loadAssets(searchTerm); // 假设loadAssets处理搜索逻辑
    });

    // 新增资产按钮事件绑定
    document.getElementById('add-asset-btn').addEventListener('click', () => {
        openEditAssetModal({}, handleNewAsset);
    });

    // 退出登录按钮事件绑定
    document.getElementById('logout-btn').addEventListener('click', logout);
}