const element = (id) => {
  return document.getElementById(id);
};

const socket = io();

const sendMessage = () => {
  let message = element("message").value.trim()
    if (message != "") {
      let password = element("password").value.trim();
      let key = numberArrayToString(seedToNumberArray(passwordToSeed(password), utf8toByteArray(message).length));
      let encrypted = utf8ToBase64(byteArrayToUtf8(xorEncrypt(utf8toByteArray(message), utf8toByteArray(key))));
      socket.emit("chat", encrypted);
      element("message").value = "";
      element('message').focus();
    }
}
document.addEventListener("DOMContentLoaded", () => {

  element("modal").style.display = "block";


  socket.on("chat", (encrypted) => {
    let password = element("password").value.trim();
    let key = numberArrayToString(
      seedToNumberArray(
        passwordToSeed(password),
        utf8toByteArray(base64ToUtf8(encrypted)).length
      )
    );
    let clear = byteArrayToUtf8(
      xorEncrypt(utf8toByteArray(base64ToUtf8(encrypted)), utf8toByteArray(key))
    );

    element("chat-area").innerHTML =
      element("chat-area").innerHTML +
      '<div class="chat-message-padding"><div class="chat-message">' +
      clear +
      "</div></div>";


    element("chat-area").scrollTop = element("chat-area").scrollHeight

  });

  socket.on("panic", () => {
    element("chat-area").innerHTML = "";
    element("message").value = "";
  });

  socket.on("users", (users) => {
    element("online").innerHTML = "Online users: " + users;
  });

  element("send-message").addEventListener("click", sendMessage());

  element("message").addEventListener("keypress", (e) =>{
    if(e.key === 'Enter'){
      sendMessage()
    }
  })


  element("change-password").addEventListener("click", () => {
    element("modal").style.display = "block";
    element("modal-error").style.display = "none"
  })

  element("save-button").addEventListener("click", () => {
    if(element("password").value.trim() == ''){
        element("modal-error").style.display = "block"
    } else{
        element("modal-error").style.display = "block"
        element("modal").style.display = "none"
    }
  })

  element("panic").addEventListener("click", () => {
    socket.emit("panic");
  });
});
