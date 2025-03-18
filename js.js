const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


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
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/\s/g, "+")}`, "_blank");
        speak("Tôi chưa hiểu yêu cầu của bạn. Tôi đã tìm trên Google giúp bạn!");
    }
}
 
            