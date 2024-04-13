// интициализация перменных 
let template_type = "";
let coin = "";
let option = "";
let leverage = "";
let entry_price = "";
let exit_price = "";
let margin = "";
let value = 0;

// цвета 
let color_green_bg = "#21322C";
let color_green_text = "#20B26C";
let color_red_bg = "#331E22";
let color_red_text = "#EF454A";


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("save_ss").onclick = function() {
        generateScreenshot();
        
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            
            let file_name = "pnlroi_" + generateFileName() + ".png";
            
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
};


// Получение вводных данных из формы 
function getInputData() {
    template_type = document.myform.template_type.value;
    coin = document.myform.coin.value + "USDT"
    option = document.myform.option.value;
    leverage = parseFloat(document.myform.laverage.value);
    entry_price = parseFloat(document.myform.entry_price.value);
    exit_price = document.myform.exit_price.value;
    margin = parseFloat(document.myform.margin.value);
};


// тестовоe калькулирование PNL 
function testCalculation() {
    getInputData(); 
    
    value = margin * leverage;  
    position_size = value / entry_price;
    roi = (exit_price - entry_price) * position_size; 
    pnl = (roi / margin) * 100 

    console.log(margin, leverage, entry_price);
    console.log(value, position_size, roi, pnl);
};


function generateScreenshot () {
    getInputData(); // Получение вводных данных из формы 
    
    
    // Вычисление значений 
    value = margin * leverage;  
    position_size = value / entry_price;
    roi = (exit_price - entry_price) * position_size; 
    pnl = (roi / margin) * 100 
    

    console.log(margin, leverage, entry_price);
    console.log(value, position_size, roi, pnl);
    
    
    // Визуальное формирование вывода 
    laverage = option + " " + laverage + ".0X";
    roi = roi.toFixed(2);
    pnl = pnl.toFixed(2);

    
    var image_url = "";
    if (template_type == "roi") {
        image_url = "url(../images/pnl/work/roi2.png)";
        roipnl = "+" + roipnl + "%";
    } else if (template_type == "pnl") {
        image_url = "url(../images/pnl/work/pnl2.png)"; 
        roipnl = "+" + roipnl;
    }
    document.getElementById('screenshot').style.backgroundImage = image_url;
    

    // Отрисовка ярлыка продажа / покупка
    if (option == "Long") {
        document.getElementById("laverage").style.backgroundColor = color_green_bg;
        document.getElementById("laverage").style.color = color_green_text;
    } else if (option == "Short") {
        document.getElementById("laverage").style.backgroundColor = color_red_bg;
        document.getElementById("laverage").style.color = color_red_text;
    }

    // Отрисовка шапки
    document.getElementById("coin").textContent = coin;
    document.getElementById("laverage").textContent = laverage;

    // Отрисовка тела 
    document.getElementById("roipnl").textContent = roipnl;
    document.getElementById("entry_price").textContent = entry_price;
    document.getElementById("exit_price").textContent = exit_price;
};



