// ---- ПЕРЕМЕННЫЕ ---- 
let time = "";
let battery = "";
let total_usd = 0;
let total_btc = 0;
let funding = 0;
let trading = 0;
let derivatives = 0;
// Цвета
let text_color_red = "#CD5C61";
let text_color_green = "#42A17F";
// Технические переменные 
let charactersAfterDot = 0; // количество цифр после точки 



// ГЛАВНАЯ ФУНКЦИЯ 
async function saveScreenshot() {
    await formingScreenshot();
    convertHtmlToPng("balance", "screenshot", "");
}



// Формирование скриншота 
async function formingScreenshot () {
    getInputData();
    
    total_usd = trading + funding + derivatives; 

    getCoinPrice(total_usd); 

    // Конфигурация округления чисел 
    total_usd = total_usd.toFixed(2);
    funding = funding.toFixed(2);
    trading = trading.toFixed(2);
    derivatives = derivatives.toFixed(2);
        
    // Добавление делителя тысяч (запятой)
    total_usd = addComma(total_usd); 
    funding = addComma(funding);
    trading = addComma(trading);
    derivatives = addComma(derivatives);
        
    // Отрисовка иконок верхнего правого угла айфона 
    let icons_url = "";
    switch (battery) {
        case "10":
            icons_url = "url(../images/icons/black/10.png)";
            break;
        case "50":
            icons_url = "url(../images/icons/black/50.png)";
            break;
        case "90":
            icons_url = "url(../images/icons/black/90.png)";
            break;
    }
    document.getElementById('iphone_icons').style.backgroundImage = icons_url;
        
    // Отрисовка времени айфона 
    document.getElementById("iphone_time").textContent = time;
        
    // Отрисовка тела скрина
    document.getElementById("total_usd").textContent = total_usd;
    document.getElementById("funding").textContent = funding;
    document.getElementById("trading").textContent = trading;
    document.getElementById("derivatives").textContent = derivatives;

    // Костыль-задержка для ожидания получения цены BTC
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await delay(2000).then(() => {
        document.getElementById("total_btc").textContent = total_btc;
    });
            
    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/bybit-balance/work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



// ---- РАБОТА С ПОЛЯМИ ВВОДА ФОРМЫ ---- 

// Получение данных из формы ввода 
function getInputData() {
    time = document.form.time.value;
    battery = document.form.battery.value;
    funding = parseFloat(document.form.funding.value.replace(",", ""));
    trading = parseFloat(document.form.trading.value.replace(",", ""));
    derivatives = parseFloat(document.form.derivatives.value.replace(",", ""));   
}

// Очистка формы 
function clearForm() {
    document.form.time.value = "";
    document.form.funding.value = "";
    document.form.trading.value = "";
    document.form.derivatives.value = "";
}



// ---- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---- 

// Конвертация usd в btc по api 
function getCoinPrice(amount) {
    const url = "https://api.coinconvert.net/convert/usd/btc?amount=" + amount;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response.BTC);
        total_btc = xhr.response.BTC;
    }
}

// Тестовоe калькулирование PNL 
function testCalculation() {
    getInputData(); // Получение данных из формы
    
    // Сасчет 
    value = margin * leverage;  
    position_size = value / entry_price;
    unr_pnl = (mark_price - entry_price) * position_size;
    unr_pnl_percent = (unr_pnl / margin) * 100;
    
    // Визуал для чисел
    unr_pnl = unr_pnl.toFixed(4);
    unr_pnl_percent = unr_pnl_percent.toFixed(2); 
    
    // Вывод результата в блоке формы на странице сайта 
    document.getElementById("unr_pnl_example").textContent = addComma(unr_pnl) + " USDT " + "(" + unr_pnl_percent + "%)";
}