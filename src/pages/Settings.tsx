import './Settings.css'

function Settings() {
  return (
    <div className="settings-page">
      <header className="settings-header">
        <h2 className="settings-title">设置</h2>
      </header>

      <div className="settings-content">
        <div className="settings-section">
          <h3 className="section-title">模型配置</h3>
          <div className="setting-item">
            <label className="setting-label">选择模型</label>
            <select className="setting-select">
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="claude-3">Claude 3</option>
            </select>
          </div>
          <div className="setting-item">
            <label className="setting-label">API Key</label>
            <input
              type="password"
              className="setting-input"
              placeholder="输入 API Key"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">通用设置</h3>
          <div className="setting-item">
            <label className="setting-label">后端服务地址</label>
            <input
              type="text"
              className="setting-input"
              placeholder="http://localhost:8000"
              defaultValue="http://localhost:8000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
