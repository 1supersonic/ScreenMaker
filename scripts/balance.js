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


// получение данных из формы ввода 
function getInputData() {
    time = document.myform.time.value;
    battery = document.myform.battery.value;
    funding = parseFloat(document.myform.funding.value);
    trading = parseFloat(document.myform.trading.value);
    derivatives = parseFloat(document.myform.derivatives.value);   
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
            return xhr.response.BTC;
        };
}


// тестовоe калькулирование PNL 
function testCalculation() {
    getInputData(); // получение данных из формы
    
    // рассчет 
    value = margin * leverage;  
    position_size = value / entry_price;
    unr_pnl = (mark_price - entry_price) * position_size;
    unr_pnl_percent = (unr_pnl / margin) * 100;
    
    // визуал 
    unr_pnl = unr_pnl.toFixed(4);
    unr_pnl_percent = unr_pnl_percent.toFixed(2); 
    
    document.getElementById("unr_pnl_example").textContent = addComma(unr_pnl) + " USDT " + "(" + unr_pnl_percent + "%)";
}


// Создание и сохранение скриншота
window.onload = function() {
        
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = function() {
        generateScreenshot();
        
        // конвертация html блока в png изображение
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            let file_name = "position_"+generateFileName() + ".png";
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
function generateScreenshot () {
    getInputData(); // получение данных из полей ввода 
    
    // Вычисление итоговых значений 
    total_usd = trading + funding + derivatives;
    total_btc = "0.00088644";
    derivatives = derivatives.toFixed(2);
    total_btc = await getCoinPrice(total_usd);
    
    //  отрисовка иконок верхнего правого угла 
    let icons_url = "";
    switch (battery) {
        case "10":
            icons_url = "url(../images/icons/10.png)";
            break;
        case "50":
            icons_url = "url(../images/icons/50.png)";
            break;
        case "90":
            icons_url = "url(../images/icons/90.png)";
            break;
    }
    document.getElementById('iphone_icons').style.backgroundImage = icons_url;
    

    // Отрисовка шапки скрина
    document.getElementById("iphone_time").textContent = time;
    
    // Отрисовка тела скрина
    document.getElementById("total_usd").textContent = total_usd;
    document.getElementById("total_btc").textContent = total_btc;
    document.getElementById("funding").textContent = funding;
    document.getElementById("trading").textContent = trading;
    document.getElementById("derivatives").textContent = derivatives;
        
    // замена фона скрина 
    let image_url = "url(../images/balance/work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
    
}



