// ======================================
// FORTUNE DATA PREMIUM
// ======================================

const fortuneData = {

    "Thanh Long": {
        type: "Hoàng Đạo",
        level: "ĐẠI CÁT",
        icon: "🐉",

        finance: 95,
        sales: 98,

        color: "#16a34a",

        desc: "Ngày cực tốt cho khai trương, ký kết và chốt sale.",

        quote: "Càng chủ động càng dễ bùng nổ doanh số.",

        goodFor: [
            "Khai trương",
            "Ký hợp đồng",
            "Chốt sale",
            "Gặp khách VIP",
            "Mở bán"
        ],

        avoid: [
            "Tranh cãi",
            "Nóng vội"
        ],

        todos: [
            "Tư vấn khách",
            "Livestream",
            "Khai trương"
        ],

        hours: "23h-01h • 03h-05h • 07h-09h • 09h-11h",

        energy: "Năng lượng cực mạnh cho bán hàng và marketing.",

        tip: "Rất hợp upsale combo & khách gia đình."
    },

    "Minh Đường": {
        type: "Hoàng Đạo",
        level: "CÁT",
        icon: "🌟",

        finance: 88,
        sales: 90,

        color: "#0891b2",

        desc: "Quý nhân hỗ trợ, công việc dễ hanh thông.",

        quote: "Khách hàng dễ mở lòng khi bạn chân thành.",

        goodFor: [
            "Nhập hàng",
            "Họp nhóm",
            "Tiếp khách"
        ],

        avoid: [
            "Quyết định nóng"
        ],

        todos: [
            "Kiểm kho",
            "Tư vấn",
            "Họp team"
        ],

        hours: "03h-05h • 09h-11h • 15h-17h",

        energy: "Hợp teamwork và chăm sóc khách hàng.",

        tip: "Nên tập trung khách cũ & upsale."
    },

    "Kim Quỹ": {
        type: "Hoàng Đạo",
        level: "ĐẠI CÁT",
        icon: "💰",

        finance: 99,
        sales: 96,

        color: "#ca8a04",

        desc: "Tài lộc mạnh, cực hợp kinh doanh và thu tiền.",

        quote: "Ngày dễ ra đơn lớn và khách quyết nhanh.",

        goodFor: [
            "Thu tiền",
            "Mở bán",
            "Đẩy doanh số"
        ],

        avoid: [
            "Do dự"
        ],

        todos: [
            "Sale",
            "Upsale",
            "Chốt đơn"
        ],

        hours: "05h-07h • 11h-13h • 15h-17h",

        energy: "Năng lượng tài lộc rất cao.",

        tip: "Nên tập trung combo giá trị cao."
    },

    "Ngọc Đường": {
        type: "Hoàng Đạo",
        level: "CÁT",
        icon: "💎",

        finance: 85,
        sales: 87,

        color: "#7c3aed",

        desc: "Tốt cho quan hệ khách hàng và xây dựng uy tín.",

        quote: "Khách hàng tin tưởng sẽ dễ chốt hơn.",

        goodFor: [
            "CSKH",
            "Tư vấn",
            "Gặp khách"
        ],

        avoid: [
            "Thiếu kiên nhẫn"
        ],

        todos: [
            "CSKH",
            "Gọi khách cũ"
        ],

        hours: "23h-01h • 05h-07h • 11h-13h",

        energy: "Hợp chăm sóc khách & tạo uy tín.",

        tip: "Nên follow khách cũ hôm nay."
    },

    "Bảo Quang": {
        type: "Hoàng Đạo",
        level: "CÁT",
        icon: "✨",

        finance: 82,
        sales: 92,

        color: "#2563eb",

        desc: "Cát tinh soi chiếu, thích hợp quảng bá và triển khai.",

        quote: "Marketing tốt sẽ kéo khách về liên tục.",

        goodFor: [
            "Marketing",
            "Quảng bá",
            "Triển khai"
        ],

        avoid: [
            "Thiếu tập trung"
        ],

        todos: [
            "Đăng bài",
            "Livestream",
            "Sale"
        ],

        hours: "01h-03h • 07h-09h • 13h-15h",

        energy: "Rất mạnh cho quảng bá & social.",

        tip: "Nên livestream hoặc chạy content."
    },

    // =========================
    // HẮC ĐẠO
    // =========================

    "Bạch Hổ": {
        type: "Hắc Đạo",
        level: "RẤT XẤU",
        icon: "🐯",

        finance: 45,
        sales: 40,

        color: "#dc2626",

        desc: "Không phù hợp việc lớn, cần cẩn trọng.",

        quote: "Bình tĩnh sẽ giúp tránh sai sót.",

        goodFor: [
            "Ổn định nội bộ"
        ],

        avoid: [
            "Khai trương",
            "Ký hợp đồng",
            "Đầu tư"
        ],

        todos: [
            "Kiểm kê",
            "Sắp xếp"
        ],

        hours: "05h-07h • 15h-17h",

        energy: "Năng lượng bất ổn, tránh quyết định lớn.",

        tip: "Nên giữ ổn định và tránh nóng vội."
    }
};

// ======================================
// ZODIAC TABLE
// ======================================

const zodiacTable = {

    "Tý": "Thanh Long",
    "Sửu": "Minh Đường",
    "Dần": "Bạch Hổ",
    "Mão": "Ngọc Đường",
    "Thìn": "Kim Quỹ",
    "Tỵ": "Bảo Quang",
    "Ngọ": "Thanh Long",
    "Mùi": "Minh Đường",
    "Thân": "Bạch Hổ",
    "Dậu": "Ngọc Đường",
    "Tuất": "Kim Quỹ",
    "Hợi": "Bảo Quang"
};

// ======================================
// THEME
// ======================================

const fortuneTheme = {

    "Hoàng Đạo": {

        bg: "linear-gradient(135deg,#ecfeff,#cffafe)",

        border: "#67e8f9"
    },

    "Hắc Đạo": {

        bg: "linear-gradient(135deg,#fef2f2,#fecaca)",

        border: "#fca5a5"
    }
};

// ======================================
// GET INFO
// ======================================

function getFortuneInfo(canChiDay) {

    try {

        const parts =
            canChiDay.split(" ");

        const chi =
            parts[1];

        const dayName =
            zodiacTable[chi] ||
            "Minh Đường";

        const data =
            fortuneData[dayName] ||
            fortuneData["Minh Đường"];

        return {

            name: dayName,

            type: data.type,

            level: data.level,

            icon: data.icon,

            color: data.color,

            finance: data.finance,

            sales: data.sales,

            desc: data.desc,

            quote: data.quote,

            goodFor: data.goodFor,

            avoid: data.avoid,

            todos: data.todos,

            hours: data.hours,

            energy: data.energy,

            tip: data.tip,

            theme:
                fortuneTheme[data.type]
        };

    } catch (e) {

        console.log("fortune error:", e);

        return {

            name: "Bình Thường",

            type: "Ổn Định",

            level: "BÌNH",

            icon: "🌤️",

            color: "#64748b",

            finance: 70,

            sales: 70,

            desc: "Chúc bạn một ngày thuận lợi.",

            quote: "Giữ tinh thần tích cực là đủ.",

            goodFor: ["Làm việc thường ngày"],

            avoid: ["Nóng vội"],

            todos: ["Tư vấn", "Bán hàng"],

            hours: "07h-09h • 13h-15h",

            energy: "Ổn định.",

            tip: "Nên tập trung khách cũ.",

            theme: {
                bg: "linear-gradient(135deg,#f8fafc,#e2e8f0)",
                border: "#cbd5e1"
            }
        };
    }
}

// export global

window.getFortuneInfo = getFortuneInfo;
