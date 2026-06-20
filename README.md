<p align="center">
  <img src="https://img.shields.io/badge/version-2.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" alt="PRs">
</p>

<h1 align="center">🌌 星辰科技 — 企业数字化转型官网模板</h1>

<p align="center">
  <b>现代化的企业级官网模板 · 开箱即用 · 极速部署</b><br>
  集暗黑模式、AI 智能客服、粒子特效、博客系统于一体
</p>

<p align="center">
  <a href="https://xingchen-tech.surge.sh"><b>🎯 在线演示</b></a> ·
  <a href="#-特性亮点"><b>✨ 特性</b></a> ·
  <a href="#-快速开始"><b>🚀 快速开始</b></a> ·
  <a href="#-页面结构"><b>📂 结构</b></a> ·
  <a href="#-技术亮点"><b>⚡ 技术</b></a>
</p>

---

## ✨ 特性亮点

<table>
  <tr>
    <td width="50%">
      <h3>🌓 暗黑模式</h3>
      <p>一键切换，自动检测系统偏好，localStorage 持久化记忆，CSS 变量全局驱动</p>
    </td>
    <td width="50%">
      <h3>🤖 AI 智能客服</h3>
      <p>右下角悬浮对话组件，支持快捷回复+自由输入，关键词智能匹配回复</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>✨ 粒子动效背景</h3>
      <p>Canvas 粒子网络 + 鼠标跟随光晕 + 视差滚动，桌面端流畅 60fps</p>
    </td>
    <td>
      <h3>📱 全响应式设计</h3>
      <p>移动端侧滑菜单、自适应网格、触摸手势轮播，覆盖 320px-4K</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📝 博客资讯系统</h3>
      <p>6篇行业深度文章、分类标签、阅读量统计、邮件订阅组件</p>
    </td>
    <td>
      <h3>🎯 滚动渐入动画</h3>
      <p>Intersection Observer 驱动，卡片、时间轴、数字递增，丝滑入场</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>✅ 表单实时验证</h3>
      <p>输入即时校验 + 错误提示动画，邮箱格式/长度检查，成功反馈</p>
    </td>
    <td>
      <h3>📧 双重邮件订阅</h3>
      <p>页脚 + 博客页双重入口，输入校验 + 订阅成功视觉反馈</p>
    </td>
  </tr>
</table>

---

## 🎯 在线演示

| 环境 | 地址 |
|------|------|
| 🌍 **生产环境** | **[https://xingchen-tech.surge.sh](https://xingchen-tech.surge.sh)** |
| 📦 **GitHub** | **[github.com/a0903716558-baixiaobai/xingchen-digital-website](https://github.com/a0903716558-baixiaobai/xingchen-digital-website)** |

---

## 🚀 快速开始

### 零依赖，开箱即用

```bash
# 1. 克隆仓库
git clone https://github.com/a0903716558-baixiaobai/xingchen-digital-website.git

# 2. 进入目录
cd xingchen-digital-website

# 3. 直接用浏览器打开，或用任意静态服务器
npx serve .          # Node.js
python3 -m http.server 8080   # Python
```

### 一键部署到 Surge.sh（免费）

```bash
npm install -g surge
surge . your-domain.surge.sh
```

### 部署到 Vercel / Netlify / GitHub Pages

直接连接仓库，零配置自动部署。（纯静态 HTML+CSS+JS，无需构建）

---

## 📂 页面结构

```
xingchen-digital-website/
├── index.html          # 🏠 首页 — Hero粒子动画、客户走马灯、服务概览、案例、FAQ
├── about.html          # ℹ️ 关于 — 公司简介、发展时间轴、荣誉资质、团队
├── services.html       # 🛠️ 服务 — 6大行业、4项核心服务详情、合作流程、套餐价格
├── blog.html           # 📝 博客 — 6篇文章、分类标签、订阅组件
├── contact.html        # 📞 联系 — 联系信息、在线表单（含验证）、地图
├── css/
│   └── style.css       # 🎨 完整样式表（~3000行）— 响应式 + 暗黑模式
└── js/
    └── main.js         # ⚡ 交互引擎（~840行）— 动画/AI/验证/轮播
```

---

## ⚡ 技术亮点

| 类别 | 技术实现 |
|------|---------|
| **粒子背景** | Canvas 2D + requestAnimationFrame，60fps，页面隐藏自动暂停 |
| **暗黑模式** | CSS Variables + `data-theme` 属性 + localStorage + prefers-color-scheme |
| **AI 客服** | 关键词匹配 + HTML响应 + 快捷回复 + 点击外部关闭 |
| **滚动动画** | Intersection Observer + CSS transition + 逐字显示 |
| **数字递增** | easeOutExpo 缓动函数 + 完成高亮效果 |
| **表单验证** | 实时校验 + 动态错误提示 + 邮箱正则 + 提交模拟 |
| **轮播组件** | CSS transform + 自动播放 + 触摸手势 + 指示点联动 |
| **性能优化** | passive事件、requestAnimationFrame节流、visibilitychange暂停 |

---

## 🎨 配色方案

| 变量 | 浅色模式 | 暗黑模式 |
|------|---------|----------|
| `--primary` | `#1a56db` | `#3b82f6` |
| `--dark` | `#111827` | `#f1f5f9` |
| `--white` | `#ffffff` | `#0f172a` |
| `--gray-bg` | `#f9fafb` | `#1e293b` |
| `--border` | `#e5e7eb` | `#334155` |

---

## 🌟 适用场景

- 🏢 **企业官网** — 科技公司、SaaS服务商、咨询公司
- 🚀 **产品展示站** — 数字化产品、平台服务介绍
- 📊 **服务型公司** — 面向B端客户的专业服务门户  
- 🎓 **学习参考** — 前端学习、响应式设计、CSS变量实践
- 📝 **内容营销** — 内置博客系统，支持技术内容输出

---

## 📄 License

MIT © 2026 星辰科技 | 二次开发 by [白小白](https://github.com/a0903716558-baixiaobai)

---

<p align="center">
  <b>⭐ 如果这个项目对你有帮助，请给一个 Star！</b><br>
  <sub>Made with ❤️ by 白小白 · Powered by Surge.sh</sub>
</p>
