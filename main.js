const API_KEY = "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"; //

const chatArea = document.getElementById("chat-area");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage("You", userMessage);
  userInput.value = "";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", //
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const aiReply = data.choices?.[0]?.message?.content || "Gagal mendapatkan jawaban 😢";

  addMessage("KRYON", aiReply);
});

function addMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatArea.appendChild(msgDiv);
}
