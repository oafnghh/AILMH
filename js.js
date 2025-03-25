const btn = document.querySelector('.talk')
const content = document.querySelector('.content')
function openPopup() {
    document.getElementById("popup").style.display = "block";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    text_speak.lang  ="vi-VN"

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    var hour = new Date(day).getHours();

    if (hour >= 0 && hour < 12) {
        speak("Chào buổi sáng . Chào mừng đến với H-Tech chủ sở hữu Minh Hoàng");
    } else if (hour >= 12 && hour < 17) {
        speak("Chào buổi chiều . Chào mừng đến với H-Tech chủ sở hữu Minh Hoàng");
    } else {
        speak("Chào buổi tối . Chào mừng đến với H-Tech chủ sở hữu Minh Hoàng");
    }
}


window.addEventListener('load', ()=>{
    speak("Hoàng đây...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();
recognition.lang = "vi-VN";
recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Nói...."
    recognition.start();
})

function takeCommand(message) {
    const mathExpression = message.match(/(\d+|\b[một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười]\b)\s*(cộng|trừ|nhân|chia|\+|\-|\*|\/)\s*(\d+|\b[một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười]\b)/i);

    if (mathExpression) {
        const num1 = convertToNumber(mathExpression[1]);
        const operator = mathExpression[2];
        const num2 = convertToNumber(mathExpression[3]);
        let result;

        switch (operator) {
            case "cộng": case "+": result = num1 + num2; break;
            case "trừ": case "-": result = num1 - num2; break;
            case "nhân": case "*": result = num1 * num2; break;
            case "chia": case "/": 
                result = num2 !== 0 ? (num1 / num2).toFixed(2) : "không thể chia cho 0"; 
                break;
        }

        speak(`${num1} ${operator} ${num2} bằng ${result}`);
        return;
    }
    if (message.includes('chào') || message.includes('hello') || message.includes('xin chào')) {
        speak("Xin chào! Tôi có thể giúp gì cho bạn?");
    } 
    else if (message.includes("mở google")) {
        window.open("https://google.com", "_blank");
        speak("Đang mở Google...");
    } 
    else if (message.includes("mở youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Đang mở YouTube...");
    } 
    else if (message.includes("facebook")) {
        window.open("https://www.facebook.com/SayHi.MinhHoang", "_blank");
        speak("Đang mở Facebook . Nhớ kết bạn cho LÊ MINH HOÀNG NHÉ ");
    } 
    else if (message.includes('là gì') || message.includes('ai là') || message.includes('cái gì')) {
        window.open(`https://www.google.com/search?q=${message.replace(/\s/g, "+")}`, "_blank");
        const finalText = "Đây là kết quả tôi tìm thấy trên Google về " + message;
        speak(finalText);
    } 
    else if (message.includes('wikipedia')) {
        window.open(`https://vi.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "Đây là thông tin từ Wikipedia về " + message;
        speak(finalText);
    } 
    else if (message.includes('mấy giờ') || message.includes('thời gian')) {
        const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        speak("Bây giờ là " + time);
    } 
    else if (message.includes('ngày bao nhiêu') || message.includes('hôm nay ngày mấy')) {
        const date = new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
        speak("Hôm nay là " + date);
    } 
    else if (message.includes('mở máy tính')) {
        speak("Tính năng này chưa hỗ trợ, bạn có thể mở thủ công nhé!");
    }
    else if (message.includes("Tình yêu") || message.includes("yêu") || message.includes("crush")) {
        speak("Tôi nghĩ bạn nên chia tay nhé bởi vì Minh Hoàng cũng chưa có người yêu");
    }
    else if (message.includes("Minh Hoàng")) {
        speak("Tình yêu là duyên số, nhưng nếu bạn thích Minh Hoàng thì cứ mạnh dạn lên! Nếu không, hãy nhớ rằng thế giới này vẫn còn rất nhiều Minh Hoàng khác.");
    }
    else if (message.includes("mở zalo")) {  
        window.open("https://chat.zalo.me/", "_blank");  
        speak("Đang mở Zalo!");  
    }  
    
    else if (message.includes("mở messenger")) {  
        window.open("https://www.messenger.com/", "_blank");  
        speak("Đang mở Messenger!");  
    }  
    
    else if (message.includes("mở gmail")) {  
        window.open("https://mail.google.com/", "_blank");  
        speak("Đang mở Gmail!");  
    }  
    else if (message.includes("kể chuyện") || message.includes("nói một câu chuyện")) {  
        speak("Có một con gà đi qua đường. Bạn có đoán được tại sao không? Vì nó muốn sang đường đó! Haha!");  
    }
    else if (message.includes("thời tiết")) {  
        window.open("https://www.google.com/search?q=thời+tiết+hôm+nay", "_blank");  
        speak("Đây là dự báo thời tiết hôm nay.");  
    }       
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/\s/g, "+")}`, "_blank");
        speak("Tôi chưa hiểu yêu cầu của bạn. Tôi đã tìm trên Google giúp bạn!");
    }
    function convertToNumber(word) {
        const numbers = {
            "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5,
            "sáu": 6, "bảy": 7, "tám": 8, "chín": 9, "mười": 10
        };
        return numbers[word] || parseInt(word);
    }
}
