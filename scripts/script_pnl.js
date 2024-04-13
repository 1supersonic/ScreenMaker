// интициализация перменных 
let template_type = "";
let coin = "";
let option = "";
let leverage = "";
let entry_price = "";
let exit_price = "";
let margin = "";


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
}


function generateScreenshot () {
    // Получение вводных данных из формы 
    template_type = document.myform.template_type.value;
    coin = document.myform.coin.value + "USDT"
    option = document.myform.option.value;
    leverage = document.myform.laverage.value;
    entry_price = document.myform.entry_price.value;
    exit_price = document.myform.exit_price.value;
    margin = document.myform.margin.value;
    
    
    // Вычисление значений 
    value = margin * leverage;  
    position_size = value / entry_price;
    roi = (mark_price - entry_price) * position_size; // верно
    pnl = (roi / margin) * 100 // верно
    
    
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
        document.getElementById("laverage").style.backgroundColor = "#21322C";
        document.getElementById("laverage").style.color = "#20B26C";
    } else if (option == "Short") {
        document.getElementById("laverage").style.backgroundColor = "#331E22";
        document.getElementById("laverage").style.color = "#EF454A";
    }

    // Отрисовка шапки
    document.getElementById("coin").textContent = coin;
    document.getElementById("laverage").textContent = laverage;

    // Отрисовка тела 
    document.getElementById("roipnl").textContent = roipnl;
    document.getElementById("entry_price").textContent = entry_price;
    document.getElementById("exit_price").textContent = exit_price;
};



