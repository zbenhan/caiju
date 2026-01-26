import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('国内')
  const [showDonation, setShowDonation] = useState(false)

  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("Attempting to fetch news from: ./data/news.json");
    
    // Use relative URL for fetching
    fetch('./data/news.json')
      .then(res => {
        console.log("Fetch response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Loaded news data:", data);
        setNews(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load news:", err)
        setLoading(false)
      })
  }, [])

  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: '',
    content: ''
  })

  const handleNewsClick = (item) => {
    console.log(`[Analytics] User clicked on: ${item.id} - ${item.title}`)
  }

  const openModal = (title, content) => {
    setModalContent({ title, content })
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const pageContents = {
    '关于本站': '财信聚合（caiju.link）是一个专业的财经资讯聚合平台，致力于为用户提供及时、全面、准确的财经新闻和资讯。我们聚合了来自各大权威媒体的财经信息，为投资者和财经爱好者提供一站式的资讯服务。',
    '隐私政策': '我们非常重视用户的隐私保护。本隐私政策描述了我们如何收集、使用、存储和保护您的个人信息。\n\n1. 信息收集：我们仅收集必要的信息，如访问日志等，用于改进网站服务。\n2. 信息使用：我们不会将您的个人信息用于任何未经授权的用途。\n3. 信息保护：我们采取严格的安全措施保护您的信息。\n4. 信息共享：我们不会与第三方共享您的个人信息，除非法律要求。',
    '免责声明': '本网站提供的所有资讯仅供参考，不构成投资建议。投资者据此操作，风险自担。\n\n1. 资讯来源：本网站聚合的资讯来自各大媒体，我们力求信息准确，但不保证其完整性和准确性。\n2. 投资风险：市场有风险，投资需谨慎。我们不对任何投资决策负责。\n3. 版权声明：本网站部分内容可能来自网络，如有侵权请联系我们删除。',
    '联系我们': '如有任何问题或建议，欢迎通过以下方式联系我们：\n\n- 电子邮箱：zbenhan0123@gmail.com\n- 网站地址：caiju.link\n\n我们将尽快回复您的邮件。'
  }

  return (
    <div className="container">
      <header className="site-header">
        <div className="header-content">
          <h1>财信聚合 - caiju.link</h1>
        </div>
      </header>

      <main>
        <div className="tabs">
          {['国际', '国内', '区域', '以前'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">正在加载最新资讯...</p>
          </div>
        ) : (
          <div className="news-content">
            <div className="news-list">
              {(() => {
                const filteredNews = news.filter(item => item.tag === activeTab);
                if (filteredNews.length === 0) {
                  return (
                    <div className="empty-state">
                      <h2>暂无资讯</h2>
                      <p>请稍后再来查看更新。</p>
                    </div>
                  );
                }
                return filteredNews.map((item, index) => (
                  <article key={index + '_' + item.tag + '_' + item.date} className="news-card">
                    <div className="news-meta">
                      <span className="tag">{item.source}</span>
                      <span className="date">{item.date}</span>
                    </div>
                    <h2>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleNewsClick(item)}
                      >
                        {item.title}
                      </a>
                    </h2>
                  </article>
                ));
              })()}
            </div>
            <div className="donation-section">
              <button className="donation-toggle" onClick={() => setShowDonation(!showDonation)}>
                <h3>💝 支持我们 {showDonation ? '▼' : '▶'}</h3>
              </button>
              {showDonation && (
                <div className="donation-card">
                  <p>如果您觉得财新聚合对您有帮助，欢迎打赏支持我们的发展</p>
                  <div className="donation-qr">
                    <div className="qr-item">
                      <img src="./RewardCode.png" alt="微信扫码" className="qr-image" />
                      <p className="qr-label">微信扫码</p>
                    </div>
                  </div>
                  <p className="donation-note">感谢您的每一份支持！</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-links">
            <button onClick={() => openModal('关于本站', pageContents['关于本站'])} className="footer-link">关于本站</button>
            <span className="footer-divider">|</span>
            <button onClick={() => openModal('隐私政策', pageContents['隐私政策'])} className="footer-link">隐私政策</button>
            <span className="footer-divider">|</span>
            <button onClick={() => openModal('免责声明', pageContents['免责声明'])} className="footer-link">免责声明</button>
            <span className="footer-divider">|</span>
            <button onClick={() => openModal('联系我们', pageContents['联系我们'])} className="footer-link">联系我们</button>
          </div>
          <div className="footer-friendship">
            <p>友情链接：<a href="https://valuegu.com" target="_blank" rel="noopener noreferrer" className="friendship-link">valuegu.com</a></p>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} 财信聚合 - caiju.link</p>
            <p className="footer-description">市场有风险，投资需谨慎</p>
          </div>
        </div>
      </footer>

      {/* 模态框组件 */}
      {modalVisible && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalContent.title}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {modalContent.content.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={closeModal}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
