/**
 * 模态框组件
 * 支持查看资产、编辑资产等功能
 */

// 模态框容器 ID
const MODAL_CONTAINER_ID = 'modal-container';

/**
 * 创建模态框容器（如果不存在）
 */
function createModalContainer() {
    let container = document.getElementById(MODAL_CONTAINER_ID);
    if (!container) {
        container = document.createElement('div');
        container.id = MODAL_CONTAINER_ID;
        container.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center';
        document.body.appendChild(container);
    }
    return container;
}

/**
 * 打开查看资产详情模态框
 * @param {Object} asset - 资产数据
 * @param {Function} onEdit - 编辑回调
 */
export function openViewAssetModal(asset, onEdit) {
    console.log(asset)
    const container = createModalContainer();

    // 格式化日期
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };

    // 构建模态框内容
    container.innerHTML = `
    <div id="view-asset-modal" class="bg-white rounded-lg max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">资产详情</h3>
          <button class="close-modal text-gray-400 hover:text-gray-500">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">资产编号</p>
              <p class="font-medium">${asset.assetNumber || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">名称</p>
              <p class="font-medium">${asset.assetName || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">使用人ID</p>
              <p class="font-medium">${asset.userId || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">使用人</p>
              <p class="font-medium">${asset.username || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">使用人邮箱</p>
              <p class="font-medium">${asset.email || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">归属部门</p>
              <p class="font-medium">${asset.department || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">存放地点</p>
              <p class="font-medium">${asset.location || '-'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">生产日期</p>
              <p class="font-medium">${formatDate(asset.productionDate)}</p>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button class="close-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            关闭
          </button>
          ${onEdit ? `<button id="edit-asset-btn" class="ml-3 px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary/90">
            编辑
          </button>` : ''}
        </div>
      </div>
    </div>
  `;

    // 显示容器
    container.classList.remove('hidden');

    // 触发动画
    setTimeout(() => {
        const modal = document.getElementById('view-asset-modal');
        if (modal) {
            modal.classList.remove('scale-95', 'opacity-0');
            modal.classList.add('scale-100', 'opacity-100');
        }
    }, 10);

    // 关闭模态框函数
    function closeModal() {
        const modal = document.getElementById('view-asset-modal');
        if (modal) {
            modal.classList.remove('scale-100', 'opacity-100');
            modal.classList.add('scale-95', 'opacity-0');
        }

        setTimeout(() => {
            if (container) {
                container.classList.add('hidden');
            }
        }, 300);
    }

    // 获取元素
    const editBtn = document.getElementById('edit-asset-btn');

    // 绑定关闭事件
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // 绑定编辑事件
    if (editBtn && typeof onEdit === 'function') {
        editBtn.addEventListener('click', () => {
            closeModal();
            onEdit(asset);
        });
    }

    return {
        close: closeModal
    };
}

/**
 * 打开编辑资产模态框
 * @param {Object} asset - 资产数据
 * @param {Function} onSave - 保存回调
 */
export function openEditAssetModal(asset, onSave,isEdit=false) {
    const container = createModalContainer();

    // 构建模态框内容
    container.innerHTML = `
    <div id="edit-asset-modal" class="bg-white rounded-lg max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">${asset.id ? '编辑资产' : '新增资产'}</h3>
          <button class="close-modal text-gray-400 hover:text-gray-500">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <form id="edit-asset-form" class="space-y-4">
        ${isEdit ? `
          <div>
            <label class="block text-sm font-medium text-gray-700">资产ID</label>
            <input type="text" id="edit-asset-id" value="${asset.id || ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary" readonly>
          </div>`:''  }
          
          <div>
            <label class="block text-sm font-medium text-gray-700">资产名称</label>
            <input type="text" id="edit-asset-name" value="${asset.assetName || ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">资产编号</label>
            <input type="text" id="edit-asset-number" value="${asset.assetNumber || ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">使用人ID</label>
            <input type="number" id="edit-asset-userId" value="${asset.userId || ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">归属部门</label>
            <input type="text" id="edit-asset-department" value="${asset.department || ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">生产日期</label>
            <input type="date" id="edit-asset-production-date" value="${asset.productionDate ? new Date(asset.productionDate).toISOString().split('T')[0] : ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">存放地点</label>
            <input type="text" id="edit-asset-location" value="${asset.location || ''}" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary">
          </div>
        </form>
        
        <div class="mt-6 flex justify-end">
          <button class="close-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            取消
          </button>
          <button id="save-asset-btn" class="ml-3 px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary/90">
            保存
          </button>
        </div>
      </div>
    </div>
  `;

    // 显示容器
    container.classList.remove('hidden');

    // 触发动画
    setTimeout(() => {
        const modal = document.getElementById('edit-asset-modal');
        if (modal) {
            modal.classList.remove('scale-95', 'opacity-0');
            modal.classList.add('scale-100', 'opacity-100');
        }
    }, 10);

    // 关闭模态框函数
    function closeModal() {
        const modal = document.getElementById('edit-asset-modal');
        if (modal) {
            modal.classList.remove('scale-100', 'opacity-100');
            modal.classList.add('scale-95', 'opacity-0');
        }

        setTimeout(() => {
            if (container) {
                container.classList.add('hidden');
            }
        }, 300);
    }

    // 获取元素
    const saveBtn = document.getElementById('save-asset-btn');
    const form = document.getElementById('edit-asset-form');

    // 绑定关闭事件
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // 绑定保存事件
    if (saveBtn && typeof onSave === 'function') {
        let id = null;
        saveBtn.addEventListener('click', () => {
            // 表单验证
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            if (isEdit) { 
               id=document.getElementById('edit-asset-id').value || null
            }
            const updatedAsset = {
                id,
                assetName: document.getElementById('edit-asset-name').value,
                assetNumber: document.getElementById('edit-asset-number').value,
                userId: parseInt(document.getElementById('edit-asset-userId').value),
                department: document.getElementById('edit-asset-department').value,
                productionDate: document.getElementById('edit-asset-production-date').value,
                location: document.getElementById('edit-asset-location').value
            };

            onSave(updatedAsset);
            closeModal();
        });
    }

    return {
        close: closeModal
    };
}

/**
 * 通用信息确认框
 * @param {Object} options - 配置参数
 * @param {string} options.title - 模态框标题（可选，默认：'信息确认'）
 * @param {string|HTMLElement} options.content - 内容（字符串或DOM元素）
 * @param {Object} options.buttons - 按钮配置（可选）
 * @param {string} options.buttons.confirmText - 确认按钮文本（默认：'确认'）
 * @param {string} options.buttons.cancelText - 取消按钮文本（默认：'取消'，传null则隐藏）
 * @param {Function} options.onConfirm - 确认回调函数（点击确认按钮时触发）
 * @param {Function} options.onCancel - 取消回调函数（点击取消按钮或遮罩层时触发）
 * @param {boolean} options.showCancelButton - 是否显示取消按钮（默认：true）
 * @param {string} options.className - 自定义模态框类名（可选）
 */
export function openConfirmModal(options = {}) {
    const {
        title = '信息确认',
        content = '是否确认执行此操作？',
        buttons = {},
        onConfirm,
        onCancel,
        showCancelButton = true,
        className = ''
    } = options;

  

    const container = createModalContainer(); // 复用模态框容器创建函数
    const modalId = `confirm-modal-${Date.now()}`;

    // 构建模态框内容
    container.innerHTML = `
        <div 
            id="${modalId}" 
            class="bg-white rounded-lg max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0 ${className}"
        >
            <div class="p-6">
                <!-- 标题栏 -->
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">${title}</h3>
                    ${showCancelButton ? `
                        <button class="close-modal text-gray-400 hover:text-gray-500">
                            <i class="fa fa-times"></i>
                        </button>
                    ` : ''}
                </div>

                <!-- 内容区域 -->
                <div class="mb-6">
                    ${typeof content === 'string' ? `<p class="text-gray-700">${content}</p>` : content.outerHTML}
                </div>

                <!-- 按钮区域 -->
                <div class="flex justify-end space-x-3">
                    ${showCancelButton && buttons.cancelText !== null ? `
                        <button 
                            class="close-modal px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onclick="handleCancel()"
                        >
                            ${buttons.cancelText || '取消'}
                        </button>
                    ` : ''}
                    
                    <button 
                        id="confirm-btn"
                        class="px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary/90"
                        onclick="handleConfirm()"
                    >
                        ${buttons.confirmText || '确认'}
                    </button>
                </div>
            </div>
        </div>
    `;

    // 显示容器
    container.classList.remove('hidden');

    // 触发动画
    setTimeout(() => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('scale-95', 'opacity-0');
            modal.classList.add('scale-100', 'opacity-100');
        }
    }, 10);

    // 关闭模态框函数
    function closeModal() {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('scale-100', 'opacity-100');
            modal.classList.add('scale-95', 'opacity-0');
        }

        setTimeout(() => {
            if (container) {
                container.classList.add('hidden');
                container.innerHTML = ''; // 清空内容避免重复渲染
            }
            onCancel?.(); // 执行取消回调
        }, 300);
    }

    // 确认操作
    function handleConfirm() {
        onConfirm?.();
        closeModal();
    }

    // 取消操作
    function handleCancel() {
        closeModal();
    }

      // 将局部函数绑定到全局作用域
      window.handleConfirm = handleConfirm;
      window.handleCancel = handleCancel;

    // 绑定关闭事件（点击遮罩层或关闭按钮）
    container.addEventListener('click', (e) => {
        const isCloseButton = e.target.classList.contains('close-modal');
        const isMaskClick = e.target === container;
        if (isCloseButton || isMaskClick) {
            handleCancel();
        }
    });

    return {
        close: closeModal, // 返回关闭方法
        confirm: handleConfirm // 暴露确认方法（可选）
    };
}