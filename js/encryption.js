//seeded rng
function mulberry32(seed) {
    var t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function seededKey(seed, length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    let randomSequence = generateRnaCorrectLength(seed, length)
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(randomSequence[i] * charactersLength))
    }
    return result;
}

function generateRnaCorrectLength(seed, length){
  var result = [];
  let x = mulberry32(seed);
  for(let i=0; i<length; i++){
    result.push(x);
    x = mulberry32(Math.ceil(x * 1000000000))
  }
  return result
}

function generateKeyBasedOnSeed() {
    let password = $.trim($("#password").val());
    let bytesPassword = encoder.encode(password);
    let seed = 0;
    byteArrayLength = byteArray.length
    for (var i = 0; i < bytesPassword.length; i++) {
        seed += bytesPassword[i] * bytesPassword[i] * i
    }
    let seededBasedKey = seededKey(seed, byteArray.length)
    $("#key").val(seededBasedKey);
    return seededBasedKey
}

//defining function for random string generator
function randomstring(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

//encrypt fonction
function encrypt(str1, str2) {
    let str1Bytes = encoder.encode(str1)
    let str2Bytes = encoder.encode(str2)
    let encrypted = []
    for (var i = 0; i < str1Bytes.length; i++) {
        encrypted.push(str1Bytes[i] ^ str2Bytes[i])
    }
    return encrypted
}

function keyThere() {
    if ($.trim($("#key").val()) != "") {
        return 1;
    } else {
        return 0;
    }
}

function decryptFromBaSE64(encryptedMessageB64, key) {
    str1Bytes = window.atob(encryptedMessageB64).split(',').map(x => parseInt(x));
    str2Bytes = encoder.encode(key)
    decryptedBytes = []
    for (var i = 0; i < str1Bytes.length; i++) {
        decryptedBytes.push(str1Bytes[i] ^ str2Bytes[i])
    }
    decrypted = decoder.decode(new Uint8Array(decryptedBytes));
    return decrypted;
}

function keyThere() {
    if ($.trim($("#key").val()) != "") {
        return 1;
    } else {
        return 0;
    }
}

function getKeyAndEncrypt(message){
  key = $.trim($("#key").val());
  encryptedMessage = encrypt(message, key);
  encryptedMessageClear = window.btoa(encryptedMessage)
  $('#encrypted').val(encryptedMessageClear);
}

$(function() {
    $("#encrypt-button").click(function() {
            let message = $.trim($("#message").val());
            if ($.trim($("#password").val()) != "") {
              byteArray = encoder.encode(message);
              $('#key').val(generateKeyBasedOnSeed.apply(this, byteArray));
              getKeyAndEncrypt(message);
            } else{
            if (keyThere() == 0) {
              key = randomstring(encoder.encode(message).length)
              $('#key').val(key)
              getKeyAndEncrypt(message);
            } else{
              if ($.trim($("#key").val()).length < encoder.encode(message).length && keyThere() != 0) {
                  alert("This key is too small! Generate a new one.")
              } else{
                getKeyAndEncrypt(message);
              }
            }
          }
        })
        
    $("#new-key-button").click(function() {
        let message = $.trim($("#message").val());
        if ($.trim($("#password").val()) == "") {
            key = randomstring(encoder.encode(message).length)
            $('#key').val(key)
        } else {
            byteArray = encoder.encode(message);
            $('#key').val(generateKeyBasedOnSeed.apply(this, byteArray));
        }
    });

    $("#decrypt-button").click(function() {
        encryptedMessageB64 = $.trim($("#encrypted").val());
        password = $.trim($("#password").val());
        if(password != ""){
          byteArray = window.atob(encryptedMessageB64).split(',').map(x => parseInt(x))
          $('#key').val(generateKeyBasedOnSeed.apply(byteArray))
        }
        if (keyThere() == 0) {
            alert("Need decryption key!")
        } else {
            if (encoder.encode($.trim($("#key").val())).length < window.atob(encryptedMessageB64).split(',').map(x => parseInt(x)).length) {
                needBytes = window.atob(encryptedMessageB64).split(',').map(x => parseInt(x)).length - encoder.encode($.trim($("#key").val())).length
                alert("This key is too small! Please provide a valid one. (Need " + needBytes + " more bytes)")
            } else {
                key = $.trim($("#key").val());
                decryptedMessage = decryptFromBaSE64(encryptedMessageB64, key);
                $('#message').val(decryptedMessage);
            }
        }
    });
});
