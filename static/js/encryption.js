const mulberry32 = (seed) =>  {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

const numberArrayToString = (randomArray) =>  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < randomArray.length; i++) {
        key += characters.charAt(Math.floor(randomArray[i] * characters.length))
    }
    return key;
}

const seedToNumberArray = (seed, length) => {
  const salt = 1000000000
  let randomNumber = mulberry32(seed);
  let randomArray = [];
  for(let i=0; i<length; i++){
    randomArray.push(randomNumber);
    randomNumber = mulberry32(Math.ceil(randomNumber * salt))
  }
  return randomArray
}

const passwordToSeed = (password) =>  {
    const encoder = new TextEncoder
    let bytesPassword = encoder.encode(password);
    var long = 0;
    for ( var i = bytesPassword.length - 1; i >= 0; i--) {
        long = (long * 256) + bytesPassword[i];
    }
    return long;
    // let seed =    0;
    // for (var i = 0; i < bytesPassword.length; i++) {
    //     seed += bytesPassword[i] * bytesPassword[i] * i
    // }
    // let seededBasedKey = seededKey(seed, byteArray.length)
    // return seededBasedKey
}

const randomString = (length) =>  {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const utf8toByteArray = (str) =>  {
    const encoder = new TextEncoder()
    return encoder.encode(str)
}

const byteArrayToUtf8 = (byteArray) => {
    const decoder = new TextDecoder()
    const arrayBuffer = new Uint8Array(byteArray)
    const utf8String = decoder.decode(arrayBuffer)
    console.log(utf8String)
    return utf8String
}

const xorEncrypt = (byteArray1, byteArray2) => {
    let encryptedByteArray = []
    for (var i = 0; i < byteArray1.length; i++) {
        encryptedByteArray.push(byteArray1[i] ^ byteArray2[i])
    }
    return encryptedByteArray
}

//credits: brandonscript
const utf8ToBase64 = (utf8String) => {
    return btoa(encodeURIComponent(utf8String).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    // const b64Encoded = window.btoa(utf8String)
    // return b64Encoded
  }

//credits: brandonscript
const base64ToUtf8 = (b64Encoded) => {
    return decodeURIComponent(atob(b64Encoded).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    // const string = window.atob(b64Encoded);
    // return string
}

console.log("Loaded encryption.js module")