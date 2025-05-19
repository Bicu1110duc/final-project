const previousPrices = {}; // key: title → value: số


function renderGoldPrices() {
    const pricesContainer = document.getElementById("gold-prices");
    pricesContainer.innerHTML = "";

    const goldPrices = mockGoldPrices();

    goldPrices.forEach(item => {
        const color = item.status === "up"
            ? "text-green-600"
            : item.status === "down"
                ? "text-red-600"
                : "text-gray-500";

        const icon = item.status === "up"
            ? "📈"
            : item.status === "down"
                ? "📉"
                : "➖";

        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md p-4";

        card.innerHTML = `
        <h3 class="text-lg font-semibold mb-1 text-yellow-700">${item.title}</h3>
        <p class="text-2xl font-bold text-gray-800 price-value">0</p>
        <p class="mt-1 ${color} text-sm font-medium">${icon} ${item.change}</p>
      `;

        pricesContainer.appendChild(card);

        const priceEl = card.querySelector(".price-value");

        // Giá trước đó
        const prev = previousPrices[item.title] ?? item.value;
        animateValue(priceEl, prev, item.value, 1000, item.isUSD, item.unit);
        previousPrices[item.title] = item.value;
    });
}

function animateValue(element, start, end, duration, isUSD = false, unit = "") {
    const range = end - start;
    const startTime = performance.now();

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const current = start + range * progress;

        const display = isUSD
            ? `${current.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : `${Math.round(current).toLocaleString("en-US")}`;

        element.textContent = isUSD
            ? `$${display} ${unit}`
            : `${display} ${unit}`;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function mockGoldPrices() {
    const basePrices = [
        { title: "Vàng miếng SJC", base: 74300000, unit: "VND/lượng" },
        { title: "Vàng nhẫn 9999", base: 63500000, unit: "VND/lượng" },
        { title: "Vàng DOJI", base: 73800000, unit: "VND/lượng" },
        { title: "Vàng PNJ", base: 74000000, unit: "VND/lượng" },
        { title: "Giá vàng thế giới (XAU/USD)", base: 2158.0, unit: "USD/oz", isUSD: true },
        { title: "Giá vàng giao ngay (Spot)", base: 2155.5, unit: "USD/oz", isUSD: true }
    ];

    return basePrices.map(item => {
        const delta = item.isUSD ? (Math.random() * 10 - 5) : (Math.random() * 200000 - 100000);
        const newValue = item.base + delta;

        return {
            title: item.title,
            value: newValue,            // Số thuần
            unit: item.unit,            // Chuỗi đơn vị
            isUSD: item.isUSD || false,
            change: delta > 0 ? `+${item.isUSD ? delta.toFixed(2) : parseInt(delta).toLocaleString("vi-VN")}` : `${item.isUSD ? delta.toFixed(2) : parseInt(delta).toLocaleString("vi-VN")}`,
            status: delta > 0 ? "up" : delta < 0 ? "down" : "neutral"
        };
    });
}