import { useState, useRef, useEffect } from "react"
import { Send, Moon, Sun } from "lucide-react"
import "./ChatDemo.css"

export default function ChatDemo() {
  const [theme, setTheme] = useState("dark")
  const [messages, setMessages] = useState([
  {
    role: "ai",
    text: `🤖 Phương – Trợ lý tra cứu phí TNDS theo NĐ 67/2023 (Internal System). Để tránh sai sót và nhiễu thông tin, mình vui lòng nhập theo đúng cấu trúc:

<Xe>+<Số chỗ/Tải trọng>+<THBH>

📌 Ví dụ hợp lệ:
• Xe 7 chỗ 180 ngày
• Taxi 5 chỗ 30 ngày
• Xe tải 10 tấn 90 ngày
• Đầu kéo 365 ngày

Em sẽ trả lời theo NĐ 67/2023/NĐ-CP.

Nếu dữ liệu chưa đúng định dạng, em sẽ phản hồi để anh/chị nhập lại. Nếu có thắc mắc khác, mình để lại SĐT nhé!`,
    time: new Date(),
  },
])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const chatRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    })
  }, [messages, loading])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 120) + "px"
  }, [input])

  const formatTime = (date) =>
    date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    })

  const handleSend = async () => {
  if (!input.trim() || loading) return

  const userText = input.trim()

  setMessages((prev) => [
    ...prev,
    { role: "user", text: userText, time: new Date() }
  ])

  setInput("")
  setLoading(true)

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`,
{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userText
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Server error")
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: data.reply || data.message || "Không có dữ liệu",
        time: new Date()
      }
    ])
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "❌ Không thể tính phí. Vui lòng kiểm tra lại định dạng.",
        time: new Date()
      }
    ])
  } finally {
    setLoading(false)
  }
}

  return (
    <div className={`app-container ${theme}`}>
      <div className="chat-wrapper">

        {/* HEADER */}
        <div className="chat-header">
          <div className="header-left">
            <div className="avatar-ai">AI</div>
            <div>
              <div className="header-title">
                Fubon AI Assistant
                <span className="status-dot"></span>
              </div>
              <div className="header-sub">
                Đang hoạt động • Enterprise AI
              </div>
            </div>
          </div>

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* BODY */}
        <div className="chat-body" ref={chatRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="bubble animate-in">
                {msg.text.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                <div className="timestamp">
                  {formatTime(msg.time)}
                  {msg.role === "user" && (
                    <span className="read"> ✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message ai">
              <div className="bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <textarea
            ref={textareaRef}
            value={input}
            placeholder="Nhập loại xe cần báo phí..."
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button onClick={handleSend} disabled={loading}>
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  )
}