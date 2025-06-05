# 个人博客：
**博客地址**：[fyed.top](https://fyed.top)  
如果对您有任何帮助，请给我一个star或者到我的博客看一眼可好😘


# 资产管理系统开发记录

## 一、项目背景
基于前端模块化开发的资产管理系统，实现资产增删改查、用户认证、数据可视化等功能。技术栈包括：
- **前端**：HTML5 + Tailwind CSS + JavaScript（模块化开发）
- **工具**：Font Awesome（图标）、Chart.js（图表）
- **开发模式**：原生 JavaScript 模块化（ES6+），未使用框架，适合学习基础架构设计。


## 二、核心功能模块

### 1. 用户认证模块
实现登录/注册功能，使用 localStorage 存储用户令牌，路由控制页面访问权限。
#### 技术要点：
- 表单验证（用户名/密码规则、邮箱格式）
- HTTP 请求封装（用户登录/注册接口调用）
- 全局通知系统（使用 `notification.js` 实现操作反馈）

**代码示例：登录表单提交逻辑**
```javascript
// login.js
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        utils.showLoading(true);
        const response = await userAPI.login({ username, password });
        if (response.code === 200) {
            localStorage.setItem('token', response.data.token);
            router.navigate('/dashboard');
            notify.success('登录成功', `欢迎回来，${username}`);
        } else {
            notify.error('登录失败', response.message);
        }
    } catch (error) {
        notify.error('网络错误', '请检查网络连接');
    } finally {
        utils.showLoading(false);
    }
});
```


### 2. 资产核心操作模块
#### （1）资产列表与搜索
- 动态渲染资产表格，支持按名称/编号搜索
- 分页功能（预留逻辑，暂未实现真实分页）
- 统计卡片展示资产总数、状态分布等

**HTML 结构片段**
```html
<table class="w-full">
    <thead>
        <tr class="bg-gray-50">
            <th>资产编号</th>
            <th>资产名称</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody id="assets-table-body">
        <!-- 由 JavaScript 动态填充资产数据 -->
    </tbody>
</table>
```

#### （2）模态框组件（`modals.js`）
- 通用模态框（查看/编辑/删除）
- 动态创建 DOM 结构，避免 `null` 指针错误
- 表单验证与数据回显

**编辑资产模态框逻辑**
```javascript
// modals.js
export function openEditAssetModal(asset = {}, onSave) {
    const container = createModalContainer();
    const modalTitle = asset.id ? '编辑资产' : '新增资产';
    
    container.innerHTML = `
        <h3>${modalTitle}</h3>
        <form>
            <input type="text" value="${asset.name || ''}" placeholder="资产名称" required>
            <!-- 其他表单字段 -->
        </form>
    `;
    
    // 保存时自动处理新增/编辑逻辑
    saveBtn.addEventListener('click', () => {
        const updatedAsset = {
            id: asset.id, // 新增时为 undefined，后端自动生成
            name: input.value,
            // ...其他字段
        };
        onSave(updatedAsset);
    });
}
```


### 3. 全局通知与加载状态
#### （1）通知组件（`notifications.js`）
- 支持成功/错误/信息/警告四种类型
- 自动关闭与手动关闭功能
- 动态创建 DOM，无需预定义 HTML

**使用示例**
```javascript
notify.success('操作成功', '资产已保存'); // 成功通知
notify.error('系统错误', '网络请求失败'); // 错误通知
```

#### （2）加载状态管理
- 全局遮罩层（`loading-overlay`）
- 配合 API 请求显示/隐藏

```javascript
// utils.js
export const utils = {
    showLoading(isLoading) {
        const overlay = document.getElementById('loading-overlay');
        overlay.style.display = isLoading ? 'flex' : 'none';
    }
};
```


## 三、关键问题与解决方案

### 1. 模块化开发中的依赖问题
**问题**：浏览器不支持 ES6 模块语法，导致 `import/export` 报错。  
**解决**：在 `<script>` 标签中添加 `type="module"`，启用模块化加载。
```html
<script type="module" src="js/main.js"></script>
```

### 2. DOM 加载顺序问题
**问题**：JavaScript 操作 DOM 时元素未加载，导致 `null` 错误（如模态框未定义）。  
**解决**：
- 使用 `DOMContentLoaded` 事件确保 DOM 加载完成
- 动态创建模态框容器，避免依赖预定义 HTML

### 3. 新增资产时的 ID 逻辑
**问题**：新增资产时误传 `id` 导致后端主键冲突。  
**解决**：
- 前端新增时传递空对象，不包含 `id`
- 后端接口自动生成唯一 ID（如数据库自增字段）


## 四、项目结构
```
assets-management-system/
├── index.html          # 主页面
├── js/
│   ├── main.js         # 应用入口
│   ├── api.js          # API 接口封装
│   ├── utils.js        # 工具函数
│   ├── router.js       # 路由管理
│   ├── components/     # 组件模块
│   │   ├── auth.js     # 认证逻辑
│   │   ├── assets.js   # 资产操作
│   │   ├── modals.js   # 模态框组件
│   │   └── notifications.js # 通知组件
│   └── pages/          # 页面模块
│       ├── login.js    # 登录页
│       └── dashboard.js# 仪表盘页
└── css/
    └── styles.css      # 自定义样式
```


## 五、下一步计划
1. 完善资产删除功能（带确认对话框）
2. 集成 Chart.js 实现资产状态可视化
3. 优化响应式布局，适配移动端
4. 增加 API 接口文档与错误处理机制

如需完整代码或交流技术问题，欢迎访问我的博客：[fyed.top](https://fyed.top)，期待与你共同探讨前端开发！