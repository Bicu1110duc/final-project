function renderNews() {
    const newsContainer = document.getElementById("news-container");

    const newsList = [
        {
            title: "Giá vàng thế giới tăng nhẹ do lo ngại lạm phát",
            link: "#",
            image: "https://via.placeholder.com/300x180",
            description: "Giá vàng tăng do kỳ vọng FED giữ lãi suất ở mức cao hơn."
        },
        {
            title: "Vàng trong nước ổn định, chênh lệch vẫn cao",
            link: "#",
            image: "https://via.placeholder.com/300x180",
            description: "Chênh lệch giá vàng trong nước và thế giới vẫn ở mức cao."
        }
    ];

    newsList.forEach(news => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-md p-4";

        card.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="rounded w-full h-40 object-cover mb-3">
        <h3 class="text-lg font-semibold mb-2">${news.title}</h3>
        <p class="text-gray-600 text-sm mb-2">${news.description}</p>
        <a href="${news.link}" class="text-yellow-600 hover:underline text-sm">Đọc thêm</a>
      `;

        newsContainer.appendChild(card);
    });
}
