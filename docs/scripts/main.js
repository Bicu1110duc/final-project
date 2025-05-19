document.addEventListener("DOMContentLoaded", () => {
    renderNews();
    renderGoldPrices();
    renderIndicators();

    setInterval(renderIndicators, 3000);
    setInterval(renderGoldPrices, 5000);

});


// AI Handler
const analyzeBtn = document.getElementById("analyze-btn");
const loadingBox = document.getElementById("ai-loading");
const loadingText = document.getElementById("loading-text");
const modal = document.getElementById("ai-modal");
const closeModalBtn = document.getElementById("close-modal");
const decisionEl = document.getElementById("ai-decision");
const reasonsEl = document.getElementById("ai-reasons");
const timerSection = document.getElementById("ai-timer-section");
const timerDisplay = document.getElementById("ai-timer");
const unlockBtn = document.getElementById("unlock-ai-btn");
const unlockForm = document.getElementById("unlock-form");

let countdownInterval;

analyzeBtn.addEventListener("click", () => {
    analyzeBtn.disabled = true;
    loadingBox.classList.remove("hidden");
    loadingText.textContent = "Đang khởi tạo AI...";

    let step = 0;
    const fakeSteps = [
        "Đang phân tích chỉ số kỹ thuật...",
        "Đang tổng hợp xu hướng giá...",
        "Đang tham chiếu dữ liệu thị trường...",
        "Đang đưa ra khuyến nghị chiến lược..."
    ];
    const interval = setInterval(() => {
        if (step < fakeSteps.length) {
            loadingText.textContent = fakeSteps[step];
            step++;
        }
    }, 1500);

    const delay = Math.random() * 5000 + 5000;

    setTimeout(() => {
        clearInterval(interval);
        loadingBox.classList.add("hidden");
        showAIModal();
        startCooldown(); // ⏳ Bắt đầu đếm ngược
    }, delay);
});

function showAIModal() {
    const fakeReasons = [
        "TSI cho thấy xu hướng đang mạnh lên đáng kể.",
        "Volatility đang ổn định ở mức thấp.",
        "Momentum Index cho thấy lực mua tăng nhẹ.",
        "Chỉ số cảm xúc thị trường đang chuyển sang trạng thái tham lam.",
        "Gold Composite Score đang vượt ngưỡng 70.",
        "Chênh lệch giá vàng trong nước và thế giới thấp hơn mức trung bình."
    ];

    const action = Math.random() > 0.5 ? "Mua" : "Bán";
    decisionEl.textContent = `✅ Đây là thời điểm thích hợp để ${action}`;

    const reasons = shuffle(fakeReasons).slice(0, 4);
    reasonsEl.innerHTML = "";
    reasons.forEach(reason => {
        const li = document.createElement("li");
        li.textContent = reason;
        reasonsEl.appendChild(li);
    });

    modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// ⏳ Countdown 60 phút
function startCooldown() {
    const cooldownMinutes = 60;
    let remaining = cooldownMinutes * 60;

    timerSection.classList.remove("hidden");
    analyzeBtn.disabled = true;

    countdownInterval = setInterval(() => {
        const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
        const seconds = (remaining % 60).toString().padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (remaining <= 0) {
            clearInterval(countdownInterval);
            analyzeBtn.disabled = false;
            timerSection.classList.add("hidden");
        }

        remaining--;
    }, 1000);
}


const unlockModal = document.getElementById("unlock-modal");
const closeUnlockModal = document.getElementById("close-unlock-modal");

unlockBtn.addEventListener("click", () => {
    unlockModal.classList.remove("hidden");
});

closeUnlockModal.addEventListener("click", () => {
    unlockModal.classList.add("hidden");
});
