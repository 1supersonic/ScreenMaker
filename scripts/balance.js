// Переменные значений позиции 
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


// Очистка формы 
function clearForm() {
    document.myform.time.value = "";
    document.myform.funding.value = "";
    document.myform.trading.value = "";
    document.myform.derivatives.value = "";
}


// получение данных из формы ввода 
function getInputData() {
    time = document.myform.time.value;
    battery = document.myform.battery.value;
    funding = parseFloat(document.myform.funding.value.replace(",", ""));
    trading = parseFloat(document.myform.trading.value.replace(",", ""));
    derivatives = parseFloat(document.myform.derivatives.value.replace(",", ""));   
};


// конвертация usd в btc по api 
function getCoinPrice(amount) {
    const url = "https://api.coinconvert.net/convert/usd/btc?amount=" + amount;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response.BTC);
        total_btc = xhr.response.BTC;
    };
}


// тестовоe калькулирование PNL 
function testCalculation() {
    getInputData(); // получение данных из формы
    
    // расчет 
    value = margin * leverage;  
    position_size = value / entry_price;
    unr_pnl = (mark_price - entry_price) * position_size;
    unr_pnl_percent = (unr_pnl / margin) * 100;
    
    // визуал для чисел
    unr_pnl = unr_pnl.toFixed(4);
    unr_pnl_percent = unr_pnl_percent.toFixed(2); 
    
    // вывод результата в блоке формы на странице сайта 
    document.getElementById("unr_pnl_example").textContent = addComma(unr_pnl) + " USDT " + "(" + unr_pnl_percent + "%)";
}


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = async function() {
        await generateScreenshot();
        
        // конвертация html блока в png изображение
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            let file_name = "balance_"+generateFileName() + ".png";
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
}





// формирование скриншота 
async function generateScreenshot () {
    getInputData(); // получение данных из полей ввода 
    
    total_usd = trading + funding + derivatives; // Вычисление значения usd 

    getCoinPrice(total_usd); // получение значения btc 

    // конфигурация округления чисел 
    total_usd = total_usd.toFixed(2);
    funding = funding.toFixed(2);
    trading = trading.toFixed(2);
    derivatives = derivatives.toFixed(2);
        
    // добавление делителя тысяч 
    total_usd = addComma(total_usd); 
    funding = addComma(funding);
    trading = addComma(trading);
    derivatives = addComma(derivatives);
        
    // отрисовка иконок верхнего правого угла айфона 
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

    // костыль для ожидания получения цены BTC
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await delay(2000).then(() => {
        document.getElementById("total_btc").textContent = total_btc;
    });
            
    // замена фона скрина 
    let image_url = "url(../images/balance/work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



