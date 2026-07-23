// src/pages/Chat/Chat.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaCommentDots,
  FaPaperPlane,
  FaStore,
  FaCheckCircle,
  FaCheckDouble,
  FaPaperclip,
  FaSmile,
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaArrowLeft,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  // Set this to false to show the modal, true to hide it
  const chatFunctionAvailable = false;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "👋 Welcome to SazzBazar! How can we help you today?",
      time: "10:30 AM",
      date: "Today",
      read: true,
    },
    {
      id: 2,
      sender: "support",
      text: "Feel free to ask about products, orders, or anything else!",
      time: "10:31 AM",
      date: "Today",
      read: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline] = useState(true);
  const [showModal, setShowModal] = useState(!chatFunctionAvailable);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingTimerRef = useRef(null);
  const isFirstRender = useRef(true);
  const isReplyScheduledRef = useRef(false);
  const shouldScrollToBottomRef = useRef(true);

  // Function to scroll messages container to bottom
  const scrollMessagesToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  // Auto-scroll to bottom on new messages - only when shouldScrollToBottom is true
  useEffect(() => {
    if (shouldScrollToBottomRef.current) {
      scrollMessagesToBottom("smooth");
    }
  }, [messages, scrollMessagesToBottom]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Define addMessage with useCallback
  const addMessage = useCallback((sender, text) => {
    const newMsg = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      read: sender === "user" ? false : true,
    };
    setMessages((prev) => [...prev, newMsg]);
    // Auto-scroll to bottom when a new message is added
    shouldScrollToBottomRef.current = true;
  }, []);

  // Handle auto-reply from support
  const handleAutoReply = useCallback(() => {
    const supportReplies = [
      "Thank you for your message! We'll get back to you shortly. 😊",
      "We're here to help! Please let us know if you need any assistance.",
      "Thanks for reaching out! Our team will assist you as soon as possible.",
      "We appreciate your patience. How can we make your experience better?",
      "Hello! Thanks for contacting SazzBazar. What can we do for you today?",
      "We're always happy to help! Feel free to ask anything about our products.",
      "Great question! Let me check that for you.",
      "We value your feedback! Is there anything specific you'd like to know?",
    ];
    const randomReply =
      supportReplies[Math.floor(Math.random() * supportReplies.length)];
    addMessage("support", randomReply);
    isReplyScheduledRef.current = false;
  }, [addMessage]);

  // Handle typing indicator
  const startTyping = useCallback(() => {
    setIsTyping(true);
  }, []);

  const stopTyping = useCallback(() => {
    setIsTyping(false);
  }, []);

  // Simulate support response
  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const lastMessage = messages[messages.length - 1];

    // Only proceed if last message is from user and no reply is scheduled
    if (lastMessage?.sender === "user" && !isReplyScheduledRef.current) {
      isReplyScheduledRef.current = true;

      // Clear any existing timer
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      // Show typing indicator after a small delay
      const showTypingTimer = setTimeout(() => {
        startTyping();
        // Scroll to show typing indicator
        shouldScrollToBottomRef.current = true;
        scrollMessagesToBottom("smooth");
      }, 300);

      // Set timer to hide typing and send reply
      typingTimerRef.current = setTimeout(
        () => {
          stopTyping();
          handleAutoReply();
          typingTimerRef.current = null;
        },
        1800 + Math.random() * 1000,
      );

      // Cleanup the show typing timer
      return () => {
        clearTimeout(showTypingTimer);
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        isReplyScheduledRef.current = false;
      };
    }
  }, [
    messages,
    startTyping,
    stopTyping,
    handleAutoReply,
    scrollMessagesToBottom,
  ]);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (newMessage.trim() === "") return;

      // Set scroll to bottom before adding message
      shouldScrollToBottomRef.current = true;
      addMessage("user", newMessage.trim());
      setNewMessage("");

      // Keep focus on input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    },
    [newMessage, addMessage],
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage(e);
      }
    },
    [handleSendMessage],
  );

  // Handle scroll events - detect if user has scrolled up
  const handleScroll = useCallback((e) => {
    const container = e.target;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 50;
    shouldScrollToBottomRef.current = isAtBottom;
  }, []);

  // Handle WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "1234567890"; // Replace with your WhatsApp number
    const message = encodeURIComponent(
      "Hello SazzBazar Support! I need help with:",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 md:py-6 h-[calc(100vh-160px)] min-h-125 relative">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 h-full">
          {/* Sidebar - Chat List (Desktop) - Fixed/sticky */}
          <div className="hidden md:block md:col-span-1 border-r border-slate-200 bg-slate-50/50 h-full overflow-hidden flex-col">
            <div className="p-4 border-b border-slate-200 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <FaCommentDots className="h-5 w-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-800">Chats</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Active Chat */}
              <div className="p-3 bg-amber-50/50 border-l-4 border-amber-500 hover:bg-amber-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800">
                      SazzBazar Support
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {messages[messages.length - 1]?.text || "No messages"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400">Now</span>
                  </div>
                </div>
              </div>

              {/* Other Chats (Inactive) */}
              <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold shrink-0">
                    O
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-700">
                      Order Support
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      Your order #12345
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400">2h ago</span>
                  </div>
                </div>
              </div>

              <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold shrink-0">
                    P
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-700">
                      Product Inquiry
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      Product availability
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400">5h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="md:col-span-3 flex flex-col h-full overflow-hidden">
            {/* Chat Header - Fixed */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-slate-200 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="md:hidden p-1 hover:bg-slate-100 rounded-full transition-colors"
                  aria-label="Go back"
                >
                  <FaArrowLeft className="h-5 w-5 text-slate-600" />
                </button>

                <div className="relative shrink-0">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 border-2 border-white rounded-full ${
                      isOnline ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  ></span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-slate-800 truncate">
                    SazzBazar Support
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-500 flex items-center gap-1">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        isOnline ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                    ></span>
                    {isOnline ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 md:gap-2 shrink-0">
                <button
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  title="Call"
                >
                  <FaPhone className="h-4 w-4 text-slate-600 hover:text-amber-600 transition-colors" />
                </button>
                <button
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  title="Video call"
                >
                  <FaVideo className="h-4 w-4 text-slate-600 hover:text-amber-600 transition-colors" />
                </button>
                <button
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:inline-flex"
                  title="More options"
                >
                  <FaEllipsisV className="h-4 w-4 text-slate-600 hover:text-amber-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Messages - Scrollable */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-3 md:p-6 bg-slate-50/30 space-y-4"
            >
              {messages.map((message, index) => {
                const showDate =
                  index === 0 || messages[index - 1].date !== message.date;

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="flex justify-center mb-4">
                        <span className="text-[10px] md:text-xs text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">
                          {message.date}
                        </span>
                      </div>
                    )}

                    <div
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-[75%] ${
                          message.sender === "user"
                            ? "bg-amber-600 text-white"
                            : "bg-white text-slate-800 border border-slate-200"
                        } rounded-2xl px-3 md:px-4 py-2 md:py-2.5 shadow-sm`}
                      >
                        {message.sender === "support" && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                              <FaStore className="h-2.5 w-2.5 text-amber-600" />
                            </div>
                            <span className="text-[10px] font-medium text-amber-600">
                              Support
                            </span>
                          </div>
                        )}

                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </p>

                        <div
                          className={`flex items-center gap-1 mt-1 text-[10px] ${
                            message.sender === "user"
                              ? "text-amber-100"
                              : "text-slate-400"
                          }`}
                        >
                          <span>{message.time}</span>
                          {message.sender === "user" && (
                            <span>
                              {message.read ? (
                                <FaCheckDouble className="h-3 w-3 text-emerald-300" />
                              ) : (
                                <FaCheckCircle className="h-3 w-3 text-amber-300" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Suggestions - Fixed */}
            <div className="px-3 md:px-6 py-2 border-t border-slate-200 bg-white overflow-x-auto shrink-0">
              <div className="flex gap-2">
                {[
                  "Hello! 👋",
                  "Order status",
                  "Product details",
                  "Return policy",
                  "Shipping info",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setNewMessage(suggestion);
                      setTimeout(() => {
                        const fakeEvent = { preventDefault: () => {} };
                        handleSendMessage(fakeEvent);
                      }, 50);
                    }}
                    className="shrink-0 text-xs bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-amber-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input - Fixed */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 md:p-4 border-t border-slate-200 bg-white flex items-end gap-2 shrink-0"
            >
              <button
                type="button"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0"
                title="Attach file"
              >
                <FaPaperclip className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />
              </button>

              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full resize-none rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 outline-none transition-all duration-200 px-4 py-2.5 text-sm bg-slate-50/50 min-h-11 max-h-32"
                  rows={1}
                  style={{
                    height: "auto",
                    minHeight: "44px",
                  }}
                  onInput={(e) => {
                    const target = e.target;
                    target.style.height = "auto";
                    target.style.height = target.scrollHeight + "px";
                  }}
                />
              </div>

              <button
                type="button"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:inline-flex shrink-0"
                title="Emoji"
              >
                <FaSmile className="h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors" />
              </button>

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`p-2.5 rounded-full transition-all duration-300 shrink-0 ${
                  newMessage.trim()
                    ? "bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-amber-200 hover:scale-105"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <FaPaperPlane className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 md:p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            <div className="text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCommentDots className="h-10 w-10 text-amber-600" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Chat Unavailable
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                This chat function is currently unavailable. Please contact us
                via WhatsApp for any assistance.
              </p>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <FaWhatsapp className="h-6 w-6" />
                <span>Contact us on WhatsApp</span>
              </button>

              {/* Optional: Go back button */}
              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 text-slate-500 hover:text-slate-700 text-sm font-medium py-2 transition-colors"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
