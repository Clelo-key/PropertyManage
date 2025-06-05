// 通用工具函数
export const utils = {
    // 格式化日期
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN');
    },

    // 格式化货币
    formatCurrency(value) {
        if (value === undefined || value === null) return '¥0';
        return `¥${parseFloat(value).toFixed(2)}`;
    },

    // 格式化状态
    formatStatus(status) {
        switch (status) {
            case '已分配':
                return '<span class="px-2 py-1 text-xs font-medium rounded-full bg-info/10 text-info">已分配</span>';
            case '未分配':
                return '<span class="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">未分配</span>';
            case '维修中':
                return '<span class="px-2 py-1 text-xs font-medium rounded-full bg-error/10 text-error">维修中</span>';
            case '报废':
                return '<span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">报废</span>';
            default:
                return status;
        }
    },

    // 加载中状态
    showLoading(show) {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (!loadingOverlay) {
            const overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
            overlay.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                    <span class="font-medium text-gray-800">加载中...</span>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        if (show) {
            document.getElementById('loading-overlay').classList.remove('hidden');
        } else {
            document.getElementById('loading-overlay').classList.add('hidden');
        }
    }
};