// API配置和请求方法
const API_BASE_URL = 'http://localhost:8080';
export {API_BASE_URL}

// 获取认证头
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? {'Authorization': `Bearer ${token}`} : {})
    };
}

// 用户API
export const userAPI = {
    async login(username, password) {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        return response.json();
    },

    async register(username, email, password) {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        });
        return response.json();
    }
};

// 资产API
export const assetAPI = {
    async getAllAssets() {
        const response = await fetch(`${API_BASE_URL}/assets`, {
            headers: getAuthHeaders()
        });
        return response.json();
    },

    async searchAssets(assetName, assetNumber) {
        const params = new URLSearchParams();
        if (assetName) params.append('assetName', assetName);
        if (assetNumber) params.append('assetNumber', assetNumber);

        const response = await fetch(`${API_BASE_URL}/assets/search?${params}`, {
            headers: getAuthHeaders()
        });
        return response.json();
    },

    async getAssetById(id) {
        const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
            headers: getAuthHeaders()
        });
        return response.json();
    },

    async createAsset(assetData) {
        const response = await fetch(`${API_BASE_URL}/assets`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(assetData)
        });
        return response.json();
    },

    async updateAsset(id, assetData) {
        const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(assetData)
        });
        return response.json();
    },

    async deleteAsset(id) {
        const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return response.json();
    }
};