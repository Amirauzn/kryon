function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  
  if (input.value.trim() === "") return;

  const userMessage = `<div><strong>You:</strong> ${input.value}</div>`;
  const aiReply = `<div><strong>KRYON:</strong> ${getResponse(input.value)}</div>`;
  
  chatBox.innerHTML += userMessage + aiReply;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getResponse(text) {
  // Ganti nanti dengan AI logic (misal pakai API)
  return `You said: "${text}". I'm still learning 🧠`;
}
