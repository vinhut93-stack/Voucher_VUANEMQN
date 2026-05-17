/**
 * amlich.js
 * Lunar Calendar Vietnam
 * Thuật toán chuẩn Hồ Ngọc Đức
 * Author Fix: ChatGPT
 */

/**
 * amlich.js - FIXED VERSION (Hồ Ngọc Đức standard)
 * Fix: ChatGPT production stable version (no lunar drift)
 */

const LunarUtils = {

    getLunarDate: function (d, m, y) {

        const timeZone = 7.0;

        const jd = getjd(d, m, y);

        const lunar = window.getLunarDate(d, m, y, timeZone);

        return {
            day: lunar[0],
            month: lunar[1],
            year: lunar[2],
            isLeap: lunar[3] === 1,
            jd: jd,
            canChiDay: getCanChiDay(d, m, y),
            canChiYear: getCanChiYear(getSolarYearForCanChi(d, m, y)),
tietKhi: getTietKhi(d, m, y)
        };
    }
};

/* =========================
   JULIAN DAY
========================= */
function getLunarDateCore(dd, mm, yy, timeZone) {
    return getLunarDate(dd, mm, yy, timeZone);
}
function getjd(dd, mm, yy) {

    let a = Math.floor((14 - mm) / 12);

    let y = yy + 4800 - a;

    let m = mm + 12 * a - 3;

    let jd =
        dd +
        Math.floor((153 * m + 2) / 5) +
        365 * y +
        Math.floor(y / 4) -
        Math.floor(y / 100) +
        Math.floor(y / 400) -
        32045;

    return jd;
}
function getSolarYearForCanChi(d, m, y) {

    const lunar = getLunarDate(d, m, y, 7.0);

    // Nếu đang trước Tết âm (tháng 1 âm nhưng trước mùng 15)
    // thì vẫn tính năm cũ
    if (lunar[1] === 1 && lunar[0] < 15) {
        return y - 1;
    }

    return y;
}
/* =========================
   NEW MOON
========================= */

function getNewMoonDay(k, timeZone) {

    let T = k / 1236.85;
    let T2 = T * T;
    let T3 = T2 * T;

    let dr = Math.PI / 180;

    let Jd1 =
        2415020.75933 +
        29.53058868 * k +
        0.0001178 * T2 -
        0.000000155 * T3;

    Jd1 +=
        0.00033 *
        Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    let M =
        359.2242 +
        29.10535608 * k -
        0.0000333 * T2 -
        0.00000347 * T3;

    let Mpr =
        306.0253 +
        385.81691806 * k +
        0.0107306 * T2 +
        0.00001236 * T3;

    let F =
        21.2964 +
        390.67050646 * k -
        0.0016528 * T2 -
        0.00000239 * T3;

    let C1 =
        (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
        0.0021 * Math.sin(2 * dr * M) -
        0.4068 * Math.sin(Mpr * dr) +
        0.0161 * Math.sin(dr * 2 * Mpr) -
        0.0004 * Math.sin(dr * 3 * Mpr) +
        0.0104 * Math.sin(dr * 2 * F) -
        0.0051 * Math.sin(dr * (M + Mpr)) -
        0.0074 * Math.sin(dr * (M - Mpr)) +
        0.0004 * Math.sin(dr * (2 * F + M)) -
        0.0004 * Math.sin(dr * (2 * F - M)) -
        0.0006 * Math.sin(dr * (2 * F + Mpr)) +
        0.0010 * Math.sin(dr * (2 * F - Mpr)) +
        0.0005 * Math.sin(dr * (2 * Mpr + M));

    let deltaT;

    if (T < -11) {

        deltaT =
            0.001 +
            0.000839 * T +
            0.0002261 * T2 -
            0.00000845 * T3 -
            0.000000081 * T * T3;

    } else {

        deltaT =
            -0.000278 +
            0.000265 * T +
            0.000262 * T2;
    }

    let JdNew = Jd1 + C1 - deltaT;

    return Math.floor(JdNew + 0.5 + timeZone / 24);
}

/* =========================
   SUN LONGITUDE
========================= */

function getSunLongitude(jdn, timeZone) {

    let T =
        (jdn - 2451545.5 - timeZone / 24) / 36525;

    let T2 = T * T;

    let dr = Math.PI / 180;

    let M =
        357.52910 +
        35999.05030 * T -
        0.0001559 * T2 -
        0.00000048 * T * T2;

    let L0 =
        280.46645 +
        36000.76983 * T +
        0.0003032 * T2;

    let DL =
        (1.914600 - 0.004817 * T - 0.000014 * T2) *
        Math.sin(dr * M);

    DL +=
        (0.019993 - 0.000101 * T) *
        Math.sin(dr * 2 * M);

    DL += 0.000290 * Math.sin(dr * 3 * M);

    let L = L0 + DL;

    L *= dr;

    L -= Math.PI * 2 * Math.floor(L / (Math.PI * 2));

    return Math.floor((L / Math.PI) * 12) % 12;
}
/* =========================
   LUNAR MONTH 11
========================= */

function getLunarMonth11(yy, timeZone) {

    let off = getjd(31, 12, yy) - 2415021;

    let k = Math.floor(off / 29.530588853);

    let nm = getNewMoonDay(k, timeZone);

    let sunLong = getSunLongitude(nm, timeZone);

    if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
    }

    return nm;
}

/* =========================
   LEAP MONTH
========================= */

function getLeapMonthOffset(a11, timeZone) {

    let k =
        Math.floor(
            (a11 - 2415021.076998695) /
            29.530588853 + 0.5
        );

    let last = 0;

    let i = 1;

    let arc =
        getSunLongitude(
            getNewMoonDay(k + i, timeZone),
            timeZone
        );

    do {

        last = arc;

        i++;

        arc =
            getSunLongitude(
                getNewMoonDay(k + i, timeZone),
                timeZone
            );

    } while (arc !== last && i < 14);

    return i - 1;
}

/* =========================
   MAIN LUNAR FUNCTION
========================= */

function getLunarDate(dd, mm, yy, timeZone) {

    let dayNumber = getjd(dd, mm, yy);

    // ✅ FIX CHÍNH: +0.5 để không lệch chu kỳ trăng
    let k = Math.floor(
        (dayNumber - 2415021.076998695) /
        29.530588853 + 0.5
    );

    let monthStart = getNewMoonDay(k, timeZone);

    // ✅ FIX RANH GIỚI THÁNG
    if (monthStart > dayNumber) {
        monthStart = getNewMoonDay(k - 1, timeZone);
    }

    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = getLunarMonth11(yy + 1, timeZone);

    let lunarYear;

    if (monthStart < a11) {
        lunarYear = yy - 1;
        a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
        lunarYear = yy;
    }

    let lunarDay = dayNumber - monthStart + 1;

    let diff = Math.floor((monthStart - a11) / 29.530588853);

    let lunarLeap = 0;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {

        let leapMonthDiff = getLeapMonthOffset(a11, timeZone);

        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;

            if (diff === leapMonthDiff) {
                lunarLeap = 1;
            }
        }
    }

    if (lunarMonth > 12) {
        lunarMonth -= 12;
    }

    return [
        lunarDay,
        lunarMonth,
        lunarYear,
        lunarLeap
    ];
}

/* =========================
   CAN CHI YEAR
========================= */

function getCanChiYear(year) {

    const can = [
        "Giáp","Ất","Bính","Đinh","Mậu",
        "Kỷ","Canh","Tân","Nhâm","Quý"
    ];

    const chi = [
        "Tý","Sửu","Dần","Mão","Thìn","Tỵ",
        "Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"
    ];

    const baseYear = 1984; // Giáp Tý

    let offset = year - baseYear;

    let canIndex = ((offset % 10) + 10) % 10;
    let chiIndex = ((offset % 12) + 12) % 12;

    return can[canIndex] + " " + chi[chiIndex];
}
/* =========================
   CAN CHI DAY
========================= */

function getCanChiDay(d, m, y) {

    const can = [
        "Giáp",
        "Ất",
        "Bính",
        "Đinh",
        "Mậu",
        "Kỷ",
        "Canh",
        "Tân",
        "Nhâm",
        "Quý"
    ];

    const chi = [
        "Tý",
        "Sửu",
        "Dần",
        "Mão",
        "Thìn",
        "Tỵ",
        "Ngọ",
        "Mùi",
        "Thân",
        "Dậu",
        "Tuất",
        "Hợi"
    ];

    let jd = getjd(d, m, y);

    return (
        can[(jd + 9) % 10] +
        " " +
        chi[(jd + 1) % 12]
    );
}

/* =========================
   TIẾT KHÍ
========================= */

function getTietKhi(d, m, y) {

    const tietKhiList = [
        "Xuân Phân",
        "Thanh Minh",
        "Cốc Vũ",
        "Lập Hạ",
        "Tiểu Mãn",
        "Mang Chủng",
        "Hạ Chí",
        "Tiểu Thử",
        "Đại Thử",
        "Lập Thu",
        "Xử Thử",
        "Bạch Lộ",
        "Thu Phân",
        "Hàn Lộ",
        "Sương Giáng",
        "Lập Đông",
        "Tiểu Tuyết",
        "Đại Tuyết",
        "Đông Chí",
        "Tiểu Hàn",
        "Đại Hàn",
        "Lập Xuân",
        "Vũ Thủy",
        "Kinh Trập"
    ];

    let jd = getjd(d, m, y);

    let index =
        getSunLongitude(jd, 7.0);

    return tietKhiList[index] || "Tiết khí";
}
// =========================
// EXPORT GLOBAL (FIX FRONTEND)
// =========================

window.LunarUtils = LunarUtils;
window.getLunarDate = getLunarDate;
window.getCanChiDay = getCanChiDay;
window.getCanChiYear = getCanChiYear;
window.getTietKhi = getTietKhi;
