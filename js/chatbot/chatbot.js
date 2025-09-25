// Chatbot functionality - Main file with persistent conversation history

// Chat History Management
const ChatHistory = {
  key: "rokPortfolioChatHistory",
  maxMessages: 100, // Limit stored messages to prevent localStorage overflow

  // Save message to localStorage
  saveMessage: function (message, isUser) {
    try {
      const history = this.getHistory();
      const messageObj = {
        message: message,
        isUser: isUser,
        timestamp: new Date().toISOString(),
      };

      history.push(messageObj);

      // Keep only the latest messages
      if (history.length > this.maxMessages) {
        history.splice(0, history.length - this.maxMessages);
      }

      localStorage.setItem(this.key, JSON.stringify(history));
    } catch (error) {
      console.warn("Failed to save chat message to localStorage:", error);
    }
  },

  // Get chat history from localStorage
  getHistory: function () {
    try {
      const history = localStorage.getItem(this.key);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.warn("Failed to load chat history from localStorage:", error);
      return [];
    }
  },

  // Clear chat history
  clearHistory: function () {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.warn("Failed to clear chat history:", error);
    }
  },
};

function initializeChatbot() {
  console.log("Initializing chatbot...");

  // Create chatbot HTML structure
  const chatbotHTML = `
    <!-- Chatbot Toggle Button -->
    <div id="chatbot-toggle" class="fixed bottom-6 right-6 z-50 bg-[#05324d] text-white p-4 rounded-full shadow-lg hover:bg-[#07507a] transition-all duration-300 cursor-pointer">
      <svg id="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg id="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden">
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Chatbot Window - Moved higher to prevent overlap -->
    <div id="chatbot-window" class="fixed bottom-32 right-4 z-40 w-80 md:w-96 h-96 md:h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 hidden max-w-[calc(100vw-2rem)] transition-all duration-300">
      <!-- Header -->
      <div class="bg-[#05324d] text-white p-4 rounded-t-lg">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-lg">Howdy! I'm Rok's assistant</h3>
            <p class="text-sm opacity-90">I'm here to help!</p>
          </div>
          <div class="flex items-center gap-2">
            <!-- Clear Chat Button -->
            <button id="clear-chat-btn" class="text-white hover:text-red-300 transition-colors" title="Clear chat history">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <!-- Expand/Contract Button (Desktop only) -->
            <button id="expand-btn" class="hidden md:block text-white hover:text-gray-300 transition-colors" title="Expand window">
              <svg id="expand-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="15,3 21,3 21,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="9,21 3,21 3,15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="21" y1="3" x2="14" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="3" y1="21" x2="10" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg id="contract-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden">
                <polyline points="4,14 10,14 10,20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="20,10 14,10 14,4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="14" y1="10" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="3" y1="21" x2="10" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <!-- Minimize Button (Mobile only) -->
            <button id="minimize-btn" class="text-white hover:text-gray-300 transition-colors md:hidden">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Messages Container -->
      <div id="chat-messages" class="h-64 md:h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 overflow-x-hidden">
        <!-- Messages will be loaded from localStorage -->
      </div>
      
      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div class="flex gap-2">
          <input 
            id="chat-input" 
            type="text" 
            placeholder="Type your message..." 
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#05324d] focus:ring-2 focus:ring-[#05324d] focus:ring-opacity-20 text-sm min-w-0"
          />
          <button 
            id="send-btn" 
            class="bg-[#38A881] text-white p-3 rounded-lg hover:bg-[#1D5843] transition-colors flex items-center justify-center flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <!-- Quick suggestion buttons -->
        <div class="flex flex-wrap gap-2 mt-3" id="quick-suggestions">
          <button class="suggestion-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors flex-shrink-0" data-message="Tell me about projects">Projects</button>
          <button class="suggestion-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors flex-shrink-0" data-message="What are his skills?">Skills</button>
          <button class="suggestion-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors flex-shrink-0" data-message="Social media links">Socials</button>
        </div>
      </div>
    </div>
  `;

  // Add chatbot HTML to body
  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  // Add CSS to prevent horizontal scroll and ensure proper spacing
  const style = document.createElement("style");
  style.innerHTML = `
    body { overflow-x: hidden; }
    #chatbot-toggle { 
      max-width: calc(100vw - 1.5rem);
      z-index: 60; /* Ensure button is above window */
    }
    #chatbot-window { 
      max-width: calc(100vw - 2rem);
      z-index: 50; /* Window below button */
    }
    
    /* Expanded chatbot styles */
    #chatbot-window.expanded {
      width: 36rem !important; /* 1.5x of 24rem (96 * 1.5 = 144, 144/4 = 36rem) */
      height: 46rem !important; /* 1.5x of ~31rem (500px ≈ 31rem, 31 * 1.5 ≈ 46rem) */
      max-width: calc(100vw - 2rem);
      max-height: calc(100vh - 10rem);
    }
    
    #chatbot-window.expanded #chat-messages {
      height: 32rem !important; /* Increased messages area */
    }
    
    #chatbot-window.expanded .max-w-xs,
    #chatbot-window.expanded .max-w-sm {
      max-width: 20rem !important; /* Allow wider messages in expanded mode */
    }
    
    @media (max-width: 400px) {
      #chatbot-window { 
        right: 1rem; 
        width: calc(100vw - 2rem); 
        max-width: none;
        bottom: 28; /* Slightly higher on mobile */
      }
      #chatbot-toggle { right: 1rem; }
      
      /* Disable expansion on small screens */
      #chatbot-window.expanded {
        width: calc(100vw - 2rem) !important;
        height: 24rem !important;
      }
    }
    
    @media (max-width: 768px) {
      /* Disable expansion on tablets and below */
      #chatbot-window.expanded {
        width: 24rem !important;
        height: 24rem !important;
      }
      
      #chatbot-window.expanded #chat-messages {
        height: 16rem !important;
      }
    }

    /* Clear chat button hover effect */
    #clear-chat-btn:hover {
      color: #fca5a5 !important;
    }
  `;
  document.head.appendChild(style);

  // Initialize chatbot functionality
  setupChatbotEvents();
}

function setupChatbotEvents() {
  // Get DOM elements
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatWindow = document.getElementById("chatbot-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatIcon = document.getElementById("chat-icon");
  const closeIcon = document.getElementById("close-icon");
  const minimizeBtn = document.getElementById("minimize-btn");
  const expandBtn = document.getElementById("expand-btn");
  const expandIcon = document.getElementById("expand-icon");
  const contractIcon = document.getElementById("contract-icon");
  const clearChatBtn = document.getElementById("clear-chat-btn");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");

  let isOpen = false;
  let isExpanded = false;

  // Load chat history on initialization
  function loadChatHistory() {
    const history = ChatHistory.getHistory();

    if (history.length === 0) {
      // Show default welcome message if no history
      addMessage(
        "Ask me about his projects, skills, or experience!",
        false,
        false
      );
    } else {
      // Load all previous messages
      history.forEach((item) => {
        addMessage(item.message, item.isUser, false);
      });
    }

    // Scroll to bottom
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
  }

  // Toggle chatbot
  function toggleChatbot() {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.classList.remove("hidden");
      chatIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
      setTimeout(() => chatInput.focus(), 100);
    } else {
      chatWindow.classList.add("hidden");
      chatIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
      // Reset expansion when closing
      if (isExpanded) {
        toggleExpansion();
      }
    }
  }

  // Toggle expansion (desktop only)
  function toggleExpansion() {
    // Only allow expansion on desktop (md and above)
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    isExpanded = !isExpanded;

    if (isExpanded) {
      chatWindow.classList.add("expanded");
      expandIcon.classList.add("hidden");
      contractIcon.classList.remove("hidden");
      expandBtn.title = "Contract window";
    } else {
      chatWindow.classList.remove("expanded");
      expandIcon.classList.remove("hidden");
      contractIcon.classList.add("hidden");
      expandBtn.title = "Expand window";
    }

    // Scroll to bottom after resize
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 300);
  }

  // Clear chat history
  function clearChatHistory() {
    if (confirm("Are you sure you want to clear the chat history?")) {
      ChatHistory.clearHistory();
      chatMessages.innerHTML = "";
      // Add welcome message
      addMessage(
        "Ask me about his projects, skills, or experience!",
        false,
        false
      );
    }
  }

  // Get bot response using external modules
  function getBotResponse(userMessage) {
    const category = KeywordMatcher.findBestMatch(userMessage);
    const responses = chatbotResponses[category] || chatbotResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Add message to chat - Updated to handle HTML content and history saving
  function addMessage(message, isUser = false, saveToHistory = true) {
    const messageDiv = document.createElement("div");
    messageDiv.className =
      "flex items-start gap-3 opacity-0 translate-y-2 transition-all duration-300";

    if (isUser) {
      messageDiv.innerHTML = `
        <div class="flex-1"></div>
        <div class="bg-[#05324d] text-white p-3 rounded-lg max-w-xs md:max-w-sm shadow-sm break-words">
          <p class="text-xs">${message}</p>
        </div>
        <div class="w-8 h-8 bg-[#38A881] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">U</div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="w-8 h-8 bg-[#05324d] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">R</div>
        <div class="bg-white p-3 rounded-lg max-w-xs md:max-w-sm shadow-sm border break-words">
          <div class="text-sm text-gray-800">${message}</div>
        </div>
      `;
    }

    chatMessages.appendChild(messageDiv);
    setTimeout(
      () => messageDiv.classList.remove("opacity-0", "translate-y-2"),
      50
    );
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Save to history (if not loading from history)
    if (saveToHistory) {
      ChatHistory.saveMessage(message, isUser);
    }
  }

  // Send message
  function sendMessage(message = null) {
    const messageText = message || chatInput.value.trim();
    if (messageText === "") return;

    addMessage(messageText, true);
    if (!message) chatInput.value = "";

    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      addMessage(botResponse, false);
    }, 800 + Math.random() * 1200);
  }

  // Handle window resize - reset expansion on mobile
  function handleResize() {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop && isExpanded) {
      // Reset expansion on mobile
      chatWindow.classList.remove("expanded");
      expandIcon.classList.remove("hidden");
      contractIcon.classList.add("hidden");
      expandBtn.title = "Expand window";
      isExpanded = false;
    }
  }

  // Event listeners
  toggleBtn?.addEventListener("click", toggleChatbot);
  minimizeBtn?.addEventListener("click", toggleChatbot);
  expandBtn?.addEventListener("click", toggleExpansion);
  clearChatBtn?.addEventListener("click", clearChatHistory);
  sendBtn?.addEventListener("click", () => sendMessage());
  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Handle window resize
  window.addEventListener("resize", handleResize);

  suggestionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const message = btn.getAttribute("data-message");
      sendMessage(message);
    });
  });

  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !chatWindow.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      toggleChatbot();
    }
  });

  // Load chat history when chatbot initializes
  loadChatHistory();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeChatbot);
} else {
  initializeChatbot();
}
