function renderNews() {
    const newsContainer = document.getElementById("news-container");

    const newsList = [
        {
            title: "Giá vàng nhẫn chiều 19/5 quay đầu giảm",
            link: "https://cafef.vn/gia-vang-nhan-chieu-19-5-quay-dau-giam-188250519072021247.chn",
            image: "https://cafefcdn.com/203337114487263232/2025/5/19/screenshot-2025-05-19-133555-1747636920282-1747636920874311486314.png",
            description: "Trong phiên giao dịch chiều nay, một nhà vàng hạ giá vàng nhẫn xuống còn 114,2 - 117,2 triệu đồng/lượng."
        },
        {
            title: "Giá vàng thế giới giảm trở lại",
            link: "https://vnexpress.net/gia-vang-the-gioi-giam-tro-lai-4887088.html",
            image: "https://i1-kinhdoanh.vnecdn.net/2025/05/17/gold-2025-05-17T080119-167-174-2153-9366-1747443911.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=rJbr7MpTB9awI8fCYmvu5A",
            description: "Thỏa thuận thương mại Mỹ - Trung Quốc vẫn gây sức ép lớn lên giá vàng, bất chấp thông tin Mỹ bị hạ xếp hạng tín nhiệm."
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
