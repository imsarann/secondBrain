export const random = (len: number) =>{
    let words = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let length = words.length;
    let randomWord = ""
    for(let i = 0; i <= len; i++){
        randomWord += words[Math.floor(Math.random() * length)]
    }
    return randomWord;
} 
