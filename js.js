const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const audio = new Audio("nhac.mp4");
const audio2 = new Audio("nhac2.mp4");

function speak(text, lang = "vi-VN") {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    text_speak.lang = lang;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hour = new Date().getHours();
    if (hour < 12) {
        speak("Chào buổi sáng! Good morning!");
    } else if (hour < 18) {
        speak("Chào buổi chiều! Good afternoon!");
    } else {
        speak("Chào buổi tối! Good evening!");
    }
}

window.addEventListener('load', () => {
    speak("Hoàng đây... I'm here...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "vi-VN";
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

btn.addEventListener('click', () => {
    content.textContent = "Nói... Speak...";
    recognition.start();
});

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
        let resultText = result < 0 ? `âm ${Math.abs(result)} (negative ${Math.abs(result)})` : result;
        speak(`${num1} ${operator} ${num2} bằng ${resultText}`);
        return;
    }

    if (message.includes('chào') || message.includes('hello') || message.includes('hi') || message.includes('xin chào')) {
        speak("Xin chào! Hello! Tôi có thể giúp gì cho bạn?");
    } 

    else if (message.includes("mở google") || message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Đang mở Google... Opening Google...");
    } 
    else if (message.includes("mở youtube") || message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Đang mở YouTube... Opening YouTube...");
    } 
    else if (message.includes("facebook")) {
        window.open("https://www.facebook.com/SayHi.MinhHoang", "_blank");
        speak("Đang mở Facebook... Opening Facebook...");
    } 

    else if (message.includes("mấy giờ") || message.includes("thời gian") || message.includes("what time is it")) {
        const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        speak("Bây giờ là " + time);
    } 
    else if (message.includes("ngày bao nhiêu") || message.includes("hôm nay ngày mấy") || message.includes("what is today's date")) {
        const date = new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
        speak("Hôm nay là " + date);
    } 

    else if (message.includes("thời tiết") || message.includes("weather")) {
        speak("Bạn muốn xem thời tiết ở đâu? Where do you want to check the weather?");
    }

    else if (message.includes("phát nhạc") || message.includes("play music")) {
        playOrPauseMusic(audio);
    } 
    else if (message.includes("tắt nhạc") || message.includes("stop music")) {
        audio.pause();
        speak("Đã dừng nhạc! Music stopped!");
    }
    else if (message.includes("tra cứu") || message.includes("wikipedia")) {
        let searchQuery = message.replace("tra cứu", "").replace("wikipedia", "").trim();
        if (searchQuery) {
            window.open(`https://vi.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, "_blank");
            speak(`Đang tìm kiếm ${searchQuery} trên Wikipedia...`);
        } else {
            speak("Bạn muốn tra cứu gì?");
        }
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/\s/g, "+")}`, "_blank");
        speak("Tôi chưa hiểu lệnh này. Để tôi tìm trên Google giúp bạn!");
    }
}

function convertToNumber(word) {
    const numbers = {
        "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5,
        "sáu": 6, "bảy": 7, "tám": 8, "chín": 9, "mười": 10
    };
    return numbers[word] || parseInt(word);
}

function playOrPauseMusic(audio) {
    if (!audio.paused) {
        audio.pause();
        speak("Đã dừng nhạc! Music stopped!");
    } else {
        audio.play();
        speak("Đang phát nhạc! Playing music!");
    }
}
