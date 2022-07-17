
# Encryption.js
## XOR Encryption
The best form of encryption is the one where finding the key is equally difficult as finding the message. The use of the [exclusive or (XOR)](https://en.wikipedia.org/wiki/Exclusive_or) logical operation allows us to encrypt and decrypt a message using a key of the same length as the message.</br>

The XOR (⊕) operation is only true when only one of the conditions is true.</br>
|   A   |   B   |  A ⊕ B  |
|:-----:|:-----:|:---------:|
| false | false | **false** |
| false |  true |  **true** |
|  true | false |  **true** |
|  true |  true | **false** |
</br>

Let's take a look at this example, we are going to encrypt 8 bits with an 8-bit key.</br>
| message | key | encrypted |
|:-------:|:---:|:---------:|
|    0    |  1  |   **1**   |
|    1    |  0  |   **1**   |
|    0    |  1  |   **1**   |
|    0    |  0  |   **0**   |
|    0    |  0  |   **0**   |
|    1    |  0  |   **1**   |
|    0    |  1  |   **1**   |
|    1    |  1  |   **0**   |
</br>

Again using the XOR operation, we are going to decrypt the encrypted message with the same key.</br>


| encrypted | key | message |
|:---------:|:---:|:-------:|
|     1     |  1  |  **0**  |
|     1     |  0  |  **1**  |
|     1     |  1  |  **0**  |
|     0     |  0  |  **0**  |
|     0     |  0  |  **0**  |
|     1     |  0  |  **1**  |
|     1     |  1  |  **0**  |
|     0     |  1  |  **1**  |
</br>

We obtain the same initial message we encrypted.

## Functions
**mulberry32(number) 🡆 number**</br>
Takes seed and returns pseudo-random number between 0 and 1.</br>

    $ mulberry32(69420) 
    ▶ 0.5890528310555965
</br>

**numberArrayToString(array<<span>number>) 🡆 string**</br>
Takes array of numbers and returns a string using the following characters.</br> 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'</br>

    $ numberArrayToString([0.69, 0.420, 0.4815162342, 0.5890528310555965])
    ▶ 'qadk'
</br> 
   
**seedToNumberArray(seed:number, lenght:number) 🡆 array<<span>number>**</br>
Takes a seed and a lenght and returns a number array of that lenght.</br>

    $ seedToNumberArray(69, 6)
    ▶ [0.7964120346587151, 0.9098359290510416, 0.12758133537136018, 0.7879517334513366, 0.7471530991606414, 0.7873547316994518]
</br>
   
**passwordToSeed(string) 🡆 number**</br>
Takes a string and returns a number seed.</br>

    $ passwordToSeed('hey mom')
    ▶ 30803286948406630
</br> 
   
**randomString(number) 🡆 string**</br>
Takes lenght and returns string of that length with the following characters:</br>
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'</br>

    $ randomString(69)
    ▶ 'M0zlj7PFFQncz24zZpg4ABAkKIMkIagYDIcw1BXMg7R2Trh4Lm2F2Up7NvgP9LHA5z0MG'
</br> 
   
**utf8toByteArray(string) 🡆 byte array** </br> 
Takes UTF-8 encoded string and returns its byte array.</br> 

    $ utf8toByteArray('hippity dippity')
    ▶ Uint8Array(15) [104, 105, 112, 112, 105, 116, 121, 32, 100, 105, 112, 112, 105, 116, 121, buffer: ArrayBuffer(15), byteLength: 15, byteOffset: 0, length: 15, Symbol(Symbol.toStringTag): 'Uint8Array']
</br> 
   
**byteArrayToUtf8(byte array) 🡆 string** </br> 
Takes bytes array and encodes it to Unicode (UTF-8) string.</br>

    $ byteArrayToUtf8([104, 105, 112, 112, 105, 116, 121, 32, 100, 105, 112, 112, 105, 116, 121])
    ▶ 'hippity dippity'
</br> 
   
**xorEncrypt(byte array, byte array) 🡆 byte array** </br> 
Encrypts a byte array using XOR logical operation and key of the same length. </br> 

    $ xorEncrypt([4,8,15,16,23,42],[30,60,90,120,150,180])
    ▶ [26, 52, 85, 104, 129, 158]
</br> 
   
**utf8ToBase64(unicode string) 🡆 B64 string**   </br> 
Converts a UTF-8 encoded string to base 64.   </br> 

    $ utf8ToBase64('i am iron man')
    ▶ 'aSBhbSBpcm9uIG1hbg=='
</br> 
   
**base64ToUtf8(B64 string) 🡆 UTF-8 string**
Converts a base 64 encoded string to Unicode (UTF-8).

    $ base64ToUtf8('aSBhbSBpcm9uIG1hbg==')
    ▶ 'i am iron man'

</br> 
   
  
## ~~Stolen~~ borrowed code:
mulberry32 => [**Tommy Ettinger**](https://gist.github.com/tommyettinger/46a874533244883189143505d203312c) + [**bryc**](https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript) for javascript implementation</br>
utf8ToBase64, base64ToUtf8 => [**brandonscript**](https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings)
