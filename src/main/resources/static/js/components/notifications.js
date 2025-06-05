/**
 * 通知系统模块
 * 支持成功、错误、信息、警告四种通知类型
 * 自动处理 DOM 创建和事件绑定
 */

// 通知类型配置
const NOTIFICATION_TYPES = {
    success: { bgColor: 'bg-success', icon: 'fa-check-circle' },
    error: { bgColor: 'bg-error', icon: 'fa-exclamation-circle' },
    info: { bgColor: 'bg-info', icon: 'fa-info-circle' },
    warning: { bgColor: 'bg-warning', icon: 'fa-exclamation-triangle' }
};

// 通知容器 ID
const CONTAINER_ID = 'notification-container';

/**
 * 创建通知容器（如果不存在）
 */
function createNotificationContainer() {
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm';
        document.body.appendChild(container);
    }
    return container;
}

/**
 * 显示通知
 * @param {string} type - 通知类型：success, error, info, warning
 * @param {string} title - 通知标题
 * @param {string} message - 通知内容
 * @param {number} duration - 自动关闭时间（毫秒），0 表示不自动关闭
 */
export function showNotification(type, title, message, duration = 3000) {
    const container = createNotificationContainer();
    const config = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.info;

    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 opacity-0 translate-x-full ${config.bgColor}/10 border-l-4 border-${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'info' ? 'info' : 'warning'}`;
    notification.innerHTML = `
    <div class="p-4 flex items-start">
      <div class="flex-shrink-0">
        <i class="fa ${config.icon} text-${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'info' ? 'info' : 'warning'} text-xl"></i>
      </div>
      <div class="ml-3 flex-grow">
        <h3 class="text-sm font-medium text-gray-800">${title}</h3>
        <div class="mt-1 text-sm text-gray-600">${message}</div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <button class="close-notification text-gray-400 hover:text-gray-600 focus:outline-none">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
  `;

    // 添加到容器
    container.appendChild(notification);

    // 触发动画（需要在下一帧执行）
    requestAnimationFrame(() => {
        notification.classList.remove('opacity-0', 'translate-x-full');
    });

    // 关闭逻辑
    const closeNotification = () => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => {
            notification.remove();
            // 如果容器为空，移除容器
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    };

    // 点击关闭按钮
    notification.querySelector('.close-notification').addEventListener('click', closeNotification);

    // 自动关闭
    if (duration > 0) {
        setTimeout(closeNotification, duration);
    }

    return {
        close: closeNotification
    };
}

// 快捷方法
export const notify = {
    success: (title, message, duration = 3000) => showNotification('success', title, message, duration),
    error: (title, message, duration = 5000) => showNotification('error', title, message, duration),
    info: (title, message, duration = 3000) => showNotification('info', title, message, duration),
    warning: (title, message, duration = 4000) => showNotification('warning', title, message, duration)
};