const previousIndicators = {}; // Lưu điểm số trước đó

function renderIndicators() {
    const indicatorContainer = document.getElementById("gold-indicators");
    indicatorContainer.innerHTML = "";

    const indicators = mockIndicators();

    indicators.forEach(item => {
        let color =
            item.status === "danger"
                ? "text-red-600"
                : item.status === "safe"
                    ? "text-green-600"
                    : "text-blue-600";

        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md p-4";

        card.innerHTML = `
      <h3 class="text-lg font-semibold mb-2 ${color}" title="${item.tooltip}">
        ${item.title}
      </h3>
      <p class="text-2xl font-bold text-gray-800 indicator-value">0</p>
    `;

        indicatorContainer.appendChild(card);

        const indicatorEl = card.querySelector(".indicator-value");

        const prev = previousIndicators[item.title] ?? item.value;

        animateIndicator(indicatorEl, prev, item.value);
        previousIndicators[item.title] = item.value;
    });
}

function animateIndicator(element, start, end, duration = 1000) {
    const range = end - start;
    const startTime = performance.now();

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const current = start + range * progress;

        element.textContent = `${Math.round(current)} điểm`;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}


function mockIndicators() {
    const indicators = [
        { title: "Trend Strength Indicator (TSI)", tooltip: "Đo lường độ mạnh/yếu của xu hướng giá vàng" },
        { title: "Volatility Score", tooltip: "Mức dao động giá vàng trong thời gian ngắn" },
        { title: "Momentum Index", tooltip: "Đo lực đẩy của xu hướng giá" },
        { title: "Market Sentiment Index", tooltip: "Thể hiện cảm xúc thị trường (tham lam / sợ hãi)" },
        { title: "Gold Composite Score", tooltip: "Tổng hợp các chỉ báo kỹ thuật" }
    ];

    return indicators.map(item => {
        const score = Math.floor(Math.random() * (95 - 30 + 1)) + 30;
        let status = "neutral";

        if (score < 40) status = "danger";
        else if (score > 74) status = "safe";

        return {
            title: item.title,
            tooltip: item.tooltip,
            value: score,
            status: status
        };
    });
}
