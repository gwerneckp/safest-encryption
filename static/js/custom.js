const element = (id) => {
  return document.getElementById(id);
};

document.addEventListener("DOMContentLoaded", () => {

  element("modal").style.display = "block";

  element("message").addEventListener("input", () => {
    let clear = element("message").value.trim();
    let password = element("password").value.trim();
    let key = numberArrayToString(seedToNumberArray(passwordToSeed(password), utf8toByteArray(clear).length));
    let encrypted = utf8ToBase64(byteArrayToUtf8(xorEncrypt(utf8toByteArray(clear), utf8toByteArray(key))));
    element("encrypted").value = encrypted;
  });

  element("encrypted").addEventListener("input", () => {
    let encrypted = element("encrypted").value.trim();
    let password = element("password").value.trim();
    let key = numberArrayToString(seedToNumberArray(passwordToSeed(password),utf8toByteArray(base64ToUtf8(encrypted)).length));
    let clear = byteArrayToUtf8(xorEncrypt(utf8toByteArray(base64ToUtf8(encrypted)), utf8toByteArray(key)));
    element("message").value = clear;
  });

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
});
