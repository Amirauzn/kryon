let API_KEY = localStorage.getItem("openrouter_api_key") || "";

const chatArea = document.getElementById("chat-area");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

sendButton.addEventListener("click", handleSend);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSend();
  }
});

function handleSend() {
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage("You", userText);
  userInput.value = "";

  if (userText.toLowerCase().startsWith("setapikey")) {
    const parts = userText.split(" ");
    if (parts.length === 2) {
      API_KEY = parts[1];
      localStorage.setItem("openrouter_api_key", API_KEY);
      addMessage("Kryon", "✅ API key berhasil disimpan di browser kamu!");
    } else {
      addMessage("Kryon", "⚠️ Format salah. Ketik seperti ini:\n`setapikey sk-xxxxx`");
    }
    return;
  }

  if (!API_KEY) {
    addMessage("Kryon", "❗ API key belum diset. Ketik `setapikey sk-xxxxx` untuk mulai.");
    return;
  }

  fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
    messages: [
      { role: "system", content: "You are Kryon, a helpful and ambitious male-style personal AI assistant." },
      { role: "user", content: userText }
    ]
  })
})

    .then(response => response.json())
    .then(data => {
      const reply = data.choices?.[0]?.message?.content || "⚠️ Kryon tidak bisa menjawab saat ini.";
      addMessage("Kryon", reply);
    })
    .catch(error => {
      console.error("Error:", error);
      addMessage("Kryon", "❌ Terjadi kesalahan. Coba lagi nanti.");
    });
}

function addMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message.replace(/\n/g, "<br>")}`;
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}
