import { assetAPI } from '../api.js';
import { utils } from '../utils.js';
import { showNotification } from './notifications.js';
import { openViewAssetModal, openEditAssetModal,openConfirmModal } from './modals.js';
import {handleUpdateAsset,handleDeleteAsset,handleNewAsset } from '../pages/dashboard.js'

// 渲染资产列表
export async function renderAssetsTable(assets) {
    const tableBody = document.getElementById('assets-table-body');

    if (!assets || assets.length === 0) {
        tableBody.innerHTML = `
            <tr class="text-center">
                <td colspan="6" class="px-6 py-12 text-gray-500">
                    <div class="flex flex-col items-center">
                        <i class="fa fa-folder-open-o text-4xl mb-3 text-gray-300"></i>
                        <p>暂无资产数据</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = '';
    assets.forEach(asset => {
        // 格式化日期
        const productionDate = asset.productionDate 
            ? new Date(asset.productionDate).toISOString().split('T')[0] 
            : '-';

        html += `
            <tr class="hover:bg-gray-50 transition-custom" data-asset-id="${asset.id}">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${asset.assetNumber}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${asset.assetName}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.username || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.department || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${productionDate}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${asset.location || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="view-asset-btn text-primary hover:text-primary/80 mr-3 transition-custom">
                        <i class="fa fa-eye"></i> 查看
                    </button>
                    <button class="edit-asset-btn text-gray-600 hover:text-gray-900 mr-3 transition-custom">
                        <i class="fa fa-pencil"></i> 编辑
                    </button>
                    <button class="delete-asset-btn text-red-500 hover:text-red-700 transition-custom">
                        <i class="fa fa-trash"></i> 删除
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;

    // 使用事件委托处理按钮点击事件
    tableBody.addEventListener('click', async (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const row = target.closest('tr');
        const assetId = row.getAttribute('data-asset-id');
        
        // 从API获取完整资产数据，避免依赖HTML中存储的可能不完整的数据
        const asset = await getAssetDetails(assetId);
        if (!asset) return;

        if (target.classList.contains('view-asset-btn')) {
            openViewAssetModal(asset);
        } else if (target.classList.contains('edit-asset-btn')) {
            openEditAssetModal(asset, (updatedAsset) => {
                // 这里应调用更新资产的函数（如 handleUpdateAsset）
                handleUpdateAsset(asset.id, updatedAsset);
            },true);
        } else if (target.classList.contains('delete-asset-btn')) {
            prepareDeleteAsset(assetId, asset.assetName);
        }
    });
}

// 获取单个资产详情
async function getAssetDetails(id) {
    try {
        const response = await assetAPI.getAssetById(id);
        if (response.code === 0) {
            return response.data;
        } else {
            showNotification('error', '获取资产失败', response.message || '请求失败');
            return null;
        }
    } catch (error) {
        showNotification('error', '获取资产失败', error.message || '网络错误');
        return null;
    }
}

// 渲染资产统计信息
export function renderAssetStats(assets) {
    if (!assets || assets.length === 0) {
        document.getElementById('total-assets').textContent = '0';
        document.getElementById('total-assets-count').textContent = '0';
        return;
    }

    const totalAssets = assets.length;
    document.getElementById('total-assets').textContent = totalAssets;
    document.getElementById('total-assets-count').textContent = totalAssets;
}

// 加载资产数据
export async function loadAssets(searchTerm = '') {
    try {
        utils.showLoading(true);
        let assets;

        if (searchTerm) {
            const response = await assetAPI.searchAssets(searchTerm, searchTerm);
            if (response.code === 0) {
                assets = response.data;
                showNotification('success', '搜索成功', `找到 ${assets.length} 条结果`);
            } else {
                throw new Error(response.message || '搜索失败');
            }
        } else {
            const response = await assetAPI.getAllAssets();
            if (response.code === 0) {
                assets = response.data;
            } else {
                throw new Error(response.message || '获取资产列表失败');
            }
        }

        renderAssetsTable(assets);
        renderAssetStats(assets);
        return assets;
    } catch (error) {
        showNotification('error', '加载失败', error.message);
        console.error('加载资产错误:', error);
        return [];
    } finally {
        utils.showLoading(false);
    }
}

export function prepareDeleteAsset(id, name) {
    openConfirmModal({
        title: '删除资产',
        content: `你确定要删除资产 "${name}" 吗？此操作不可撤销。`,
        buttons: {
            confirmText: '删除',
            cancelText: '取消'
        },
        onConfirm: async () => {
            try {
                // 执行删除逻辑
                await assetAPI.deleteAsset(id);
                showNotification('success', '删除成功', '资产已删除');
                loadAssets(); // 刷新资产列表
            } catch (error) {
                showNotification('error', '删除失败', error.message);
            }
        },
        onCancel: () => {
            console.log('删除操作已取消');
        }
    });
}

// 确认删除资产
export async function confirmDeleteAsset() {
    const id = window.currentDeleteAssetId;
    if (!id) return;

    try {
        utils.showLoading(true);
        const response = await assetAPI.deleteAsset(id);

        if (response.code === 0) {
            showNotification('success', '删除成功', '资产已成功删除');
            
            // 关闭确认模态框（假设closeModal函数在其他地方定义）
            const modal = document.getElementById('delete-confirm-modal');
            if (modal) modal.classList.add('hidden');

            // 刷新资产列表
            const searchTerm = document.getElementById('search-input').value.trim();
            await loadAssets(searchTerm);
        } else {
            throw new Error(response.message || '删除失败');
        }
    } catch (error) {
        showNotification('error', '删除失败', error.message);
        console.error('删除资产错误:', error);
    } finally {
        utils.showLoading(false);
    }
}

// 全局暴露函数
window.openViewAssetModal = openViewAssetModal;
window.openEditAssetModal = openEditAssetModal;
window.prepareDeleteAsset = prepareDeleteAsset;
window.confirmDeleteAsset = confirmDeleteAsset;