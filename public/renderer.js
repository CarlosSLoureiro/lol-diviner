const inputField = document.getElementById("input");

inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    try {
      output(input);
    } catch (error) {
      alert(error.message);
    }
  }
});

const output = async (input) => {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Blitzcrank is thinking...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  const result = await window.API.sendPrompt(input);

  const typewriter = new Typewriter(botText, {
    skipAddStyles: true,
    delay: 10,
    cursor: '',
  });

  const image = `<img src="${result.icon}" width="20px" height="20px">`;

  typewriter
    .typeString(
      `<span class="champion"><strong>${result.name}</strong> ${image} ${result.title}</span>`
    )
    .typeString(
      `<span><em>(similarity: ${result.similarity})</em><br>Lore: ${result.lore}</span>`
    )
    .start();
};
