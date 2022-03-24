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

function getKeyAndEncrypt(message){
  encryptedMessage = encrypt(message, key);
  encryptedMessageClear = window.btoa(encryptedMessage)
  $('#encrypted').val(encryptedMessageClear);
}

$(function() {
    $("#message").on('input', function() {
            let message = $.trim($("#message").val());
            byteArray = encoder.encode(message);
            key = (generateKeyBasedOnSeed.apply(this, byteArray));
            console.log(key)
            getKeyAndEncrypt(message);
      })


    $("#encrypted").on('input', function() {
          encryptedMessageB64 = $.trim($("#encrypted").val());
          try {
          byteArray = window.atob(encryptedMessageB64).split(',').map(x => parseInt(x))
        }
          catch(err){
            $('#message').val("ERROR! Invalid format.");
          }
          key = (generateKeyBasedOnSeed.apply(this, byteArray));
          decryptedMessage = decryptFromBaSE64(encryptedMessageB64, key);
          $('#message').val(decryptedMessage);
        })

    $("#MyPopup").modal("show");

    $("#save-password-btn").click(function() {
      if($.trim($("#password").val()) != ""){
      password = $.trim($("#password").val());
      $("#MyPopup").modal("hide");
    }else{
        $("#no-password-warning").html("<p style='font-size:10px; color:#FF0000;'>Please add an encryption password!</p>")
        $("#modal-bottom").css("padding-bottom", "72px");
    }
    })

    $("#change-password").click(function() {
      $("#MyPopup").modal("show");
    })

    new ClipboardJS('.copy');
    });
