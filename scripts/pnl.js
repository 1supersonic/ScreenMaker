// интициализация перменных 
let coin = "";
let template_type = "";
let option = "";
let leverage = 0;
let entry_price = 0;
let exit_price = 0;
let margin = 0;
let value = 0;
let roi = 0;
let pnl = 0;
let result = 0;

// цвета 
let color_green_bg = "#21322C";
let color_green_text = "#20B26C";
let color_red_bg = "#331E22";
let color_red_text = "#EF454A";


// Очистка формы 
function clearForm() {
    document.form.coin.value = "";
    document.form.leverage.value = "";
    document.form.entry_price.value = "";
    document.form.exit_price.value = "";
    document.form.margin.value = "";
}


// Заполнение полей ввода имеющимися данными
function insertExistingValues() {
    if (sessionStorage.getItem("coin") != "") {
        document.form.coin.value = sessionStorage.getItem("coin");
    } 
    if (sessionStorage.getItem("leverage") != "") {
        document.form.leverage.value = sessionStorage.getItem("leverage");
    }
    if (sessionStorage.getItem("margin") != "") {
        document.form.margin.value = sessionStorage.getItem("margin");
    }
    if (sessionStorage.getItem("entry_price") != "") {
        document.form.entry_price.value = sessionStorage.getItem("entry_price");
    }
}


// Создание и сохранение скриншота
window.onload = function() {
    insertExistingValues();

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
    template_type = document.form.template_type.value;
    coin = document.form.coin.value + "USDT"
    option = document.form.option.value;
    leverage = parseFloat(document.form.leverage.value);
    entry_price = parseFloat(document.form.entry_price.value.replace(",", ""));
    exit_price = parseFloat(document.form.exit_price.value.replace(",", ""));
    margin = parseFloat(document.form.margin.value.replace(",", ""));
};


// тестовоe калькулирование PNL 
function testCalculation() {
    getInputData(); 
    
    value = margin * leverage;  
    position_size = value / entry_price;
    pnl = (exit_price - entry_price) * position_size; 
    roi = (pnl / margin) * 100;
    
    roi = roi.toFixed(2);
    pnl = pnl.toFixed(2);
    
    if (template_type == "roi") {
        document.getElementById("roi_pnl_example").textContent = "ROI: " + roi;
    } else if (template_type == "pnl") {
        document.getElementById("roi_pnl_example").textContent = "PnL: " + pnl;
    };
};


function generateScreenshot () {
    getInputData(); // Получение вводных данных из формы 
    
    // Вычисление значений 
    value = margin * leverage;  
    position_size = value / entry_price;
    pnl = (exit_price - entry_price) * position_size; 
    roi = (pnl / margin) * 100 
    
    if (template_type == "roi") {
        result = roi.toFixed(2);
    } else if (template_type == "pnl") {
        result = pnl.toFixed(2);
    };
    
    // Визуальное формирование вывода 
    leverage = option + " " + leverage + ".0X";

    // Настройка отображения PnL в зависимости от Long / Short и наличия минуса 
    if (option == "Short") {
        if (String(result)[0] == "-") {
            result = result.slice(1);
        };
    };
    
    
    var image_url = "";
    if (template_type == "roi") {
        image_url = "url(../images/pnl/work/roi2.png)";
        result = result + "%";
    } else if (template_type == "pnl") {
        image_url = "url(../images/pnl/work/pnl2.png)"; 
    }
    result = "+" + result;
    document.getElementById('screenshot').style.backgroundImage = image_url;
    

    // Отрисовка ярлыка продажа / покупка
    if (option == "Long") {
        document.getElementById("leverage").style.backgroundColor = color_green_bg;
        document.getElementById("leverage").style.color = color_green_text;
    } else if (option == "Short") {
        document.getElementById("leverage").style.backgroundColor = color_red_bg;
        document.getElementById("leverage").style.color = color_red_text;
    }

    // Отрисовка шапки
    document.getElementById("coin").textContent = coin;
    document.getElementById("leverage").textContent = leverage;

    // Отрисовка тела 
    document.getElementById("roipnl").textContent = result;
    document.getElementById("entry_price").textContent = entry_price;
    document.getElementById("exit_price").textContent = exit_price;
};



