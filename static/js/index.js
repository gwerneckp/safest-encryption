const element = (id) => {
  return document.getElementById(id);
};

const keyThere = () => {
  if (element("key").value != "") {
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  element("password").addEventListener("input", () => {
    if(element("password").value.trim() === ''){
      console.log(element("password").value.trim())
      element("key").readOnly = false
      element("key").style.color = 'rgba(255,255,255, 1)'
      return
    }
    else{
      element("key").readOnly = true
      element("key").style.color = 'rgba(255,255,255, 0.6)'
    }
  })
  element("encrypt-button").addEventListener("click", () => {
    let clear = element("message").value.trim();
    let password = element("password").value.trim();
    let key = ''
//if something in password input generate key
    if (password) {
      key = numberArrayToString(seedToNumberArray(passwordToSeed(password), utf8toByteArray(clear).length));
      element("key").value = key;
    } else {
    if(keyThere()){
        key = element('key').value
        if (utf8toByteArray(key).length < utf8toByteArray(clear).length){
            alert("This key is too small! Generate a new one.");
            return
        }
    } else{
        key = randomString(utf8toByteArray(clear).length);
        element("key").value = key; 
    }
    }
    console.log(xorEncrypt(utf8toByteArray(clear), utf8toByteArray(key)))
    let encrypted = utf8ToBase64(byteArrayToUtf8(xorEncrypt(utf8toByteArray(clear), utf8toByteArray(key))))
    console.log(encrypted)
    element('encrypted').value = encrypted
  });

  element('new-key-button').addEventListener("click", () => {
    let clear = element('message').value.trim();
    let key = ''
    if (!element('password').value.trim()) {
      key = randomString(utf8toByteArray(clear).length);
      element('key').value = key
    } else {
      let password = element('password').value
      key = numberArrayToString(seedToNumberArray(passwordToSeed(password), clear.length));
      element("key").value = key;
    }
  });

  element('decrypt-button').addEventListener("click", () => {
//encrypted is B64 encoded
    let encrypted = element('encrypted').value.trim();
    let password = element('password').value.trim();
    let key = ''
    if (password) {
      key = numberArrayToString(seedToNumberArray(passwordToSeed(password), utf8toByteArray(base64ToUtf8(encrypted)).length))
      element('key').value = key
    } else{
      key = element('key').value.trim()
    }
    if (!keyThere()) {
      alert("Need decryption key!");
      return
    } 
    if (utf8toByteArray(key).length < utf8toByteArray(base64ToUtf8(encrypted)).length) {
        let needBytes =  utf8toByteArray(base64ToUtf8(encrypted)).length - utf8toByteArray(key).length;
        alert("This key is too small! Please provide a valid one. (Need " + needBytes + " more bytes)");
    } 
    let clear = byteArrayToUtf8(xorEncrypt(utf8toByteArray(base64ToUtf8(encrypted)), utf8toByteArray(key)))
    element('message').value = clear
  });
});
