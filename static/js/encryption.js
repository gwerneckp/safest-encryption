const mulberry32 = (seed) => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const numberArrayToString = (randomArray) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < randomArray.length; i++) {
    key += characters.charAt(Math.floor(randomArray[i] * characters.length));
  }
  return key;
};

const seedToNumberArray = (seed, length) => {
  const salt = 1000000000;
  let randomNumber = mulberry32(seed);
  let randomArray = [];
  for (let i = 0; i < length; i++) {
    randomArray.push(randomNumber);
    randomNumber = mulberry32(Math.ceil(randomNumber * salt));
  }
  return randomArray;
};

const passwordToSeed = (password) => {
  const encoder = new TextEncoder();
  let bytesPassword = encoder.encode(password);
  var long = 0;
  for (var i = bytesPassword.length - 1; i >= 0; i--) {
    long = long * 256 + bytesPassword[i];
  }
  return long;
  // let seed =    0;
  // for (var i = 0; i < bytesPassword.length; i++) {
  //     seed += bytesPassword[i] * bytesPassword[i] * i
  // }
  // let seededBasedKey = seededKey(seed, byteArray.length)
  // return seededBasedKey
};

const randomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const utf8toByteArray = (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const byteArrayToUtf8 = (byteArray) => {
  const decoder = new TextDecoder();
  const arrayBuffer = new Uint8Array(byteArray);
  const utf8String = decoder.decode(arrayBuffer);
  return utf8String;
};

const xorEncrypt = (byteArray1, byteArray2) => {
  let encryptedByteArray = [];
  for (var i = 0; i < byteArray1.length; i++) {
    encryptedByteArray.push(byteArray1[i] ^ byteArray2[i]);
  }
  return encryptedByteArray;
};

//credits: brandonscript
const utf8ToBase64 = (utf8String) => {
  return btoa(
    encodeURIComponent(utf8String).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
  // const b64Encoded = window.btoa(utf8String)
  // return b64Encoded
};

//credits: brandonscript
const base64ToUtf8 = (b64Encoded) => {
  return decodeURIComponent(
    atob(b64Encoded)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  // const string = window.atob(b64Encoded);
  // return string
};

const help = (functionName) => {
  if (typeof (functionName == "function")) {
    functionName = functionName.name;
  }
  switch (functionName) {
    case "mulberry32":
      console.log(`mulberry32(number) 🡆 number
Takes seed and returns pseudo-random number between 0 and 1`);
      break;

    case "numberArrayToString":
      console.log(`numberArrayToString(array<number>) 🡆 string
Takes array of numbers and returns a string using the following characters.`);
      break;

    case "seedToNumberArray":
      console.log(`seedToNumberArray(seed:number, lenght:number) 🡆 array<number>
Takes a seed and a lenght and returns a number array of that lenght.`);
      break;

    case "passwordToSeed":
      console.log(`passwordToSeed(string) 🡆 number
Takes a string and returns a number seed.`);
      break;

    case "randomString":
      console.log(`randomString(number) 🡆 string
Takes lenght and returns string of that length with the following characters:
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'`);
      break;

    case "utf8toByteArray":
      console.log(`utf8toByteArray(string) 🡆 byte array
Takes UTF-8 encoded string and returns its byte array.`);
      break;

    case "byteArrayToUtf8":
      console.log(`byteArrayToUtf8(byte array) 🡆 string
Takes bytes array and encodes it to Unicode (UTF-8) string.`);
      break;

    case "xorEncrypt":
      console.log(`xorEncrypt(byte array, byte array) 🡆 byte array
Encrypts a byte array using XOR logical operation and key of the same length.`);
      break;

    case "utf8ToBase64":
      console.log(`utf8ToBase64(unicode string) 🡆 B64 string
Converts a UTF-8 encoded string to base 64.`);
      break;

    case "base64ToUtf8":
      console.log(`base64ToUtf8(B64 string) 🡆 UTF-8 string
Converts a base 64 encoded string to Unicode (UTF-8).`);

    default:
      console.log(`Encryption.js help:

mulberry32(number) 🡆 number
Takes seed and returns pseudo-random number between 0 and 1
            
numberArrayToString(array<number>) 🡆 string
Takes array of numbers and returns a string using the following characters.
        
seedToNumberArray(seed:number, lenght:number) 🡆 array<number>
Takes a seed and a lenght and returns a number array of that lenght.
        
passwordToSeed(string) 🡆 number
Takes a string and returns a number seed.
        
randomString(number) 🡆 string
Takes lenght and returns string of that length with the following characters:
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        
utf8toByteArray(string) 🡆 byte array
Takes UTF-8 encoded string and returns its byte array.
        
byteArrayToUtf8(byte array) 🡆 string
Takes bytes array and encodes it to Unicode (UTF-8) string.
        
xorEncrypt(byte array, byte array) 🡆 byte array
Encrypts a byte array using XOR logical operation and key of the same length.
        
utf8ToBase64(unicode string) 🡆 B64 string
Converts a UTF-8 encoded string to base 64.
        
base64ToUtf8(B64 string) 🡆 UTF-8 string
Converts a base 64 encoded string to Unicode (UTF-8).
        
Written by Gabriel Werneck Paiva`);
      break;
  }
};

console.log("Loaded encryption.js module");
console.log("Run help('function') for help");
