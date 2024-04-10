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
	var template_type = document.myform.template_type.value;
    var coin = document.myform.coin.value + "USDT"
    var option = document.myform.option.value;
    var laverage = document.myform.laverage.value;
    var roipnl = document.myform.roipnl.value;
    var entry_price = document.myform.entry_price.value;
    var exit_price = document.myform.exit_price.value;

    
    // Получение цены монеты 
    const url = "https://api.binance.com/api/v3/ticker/price?symbol=" + coin;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        //console.log(xhr.response.price);
    };
    
    
    // Вычисление / формирование итоговых значений 
    laverage = option + " " + laverage + ".0X";

    
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

    // Отрисовка шапки позиции
    document.getElementById("coin").textContent = coin;
    document.getElementById("laverage").textContent = laverage;

    // Отрисовка тела позиции
    document.getElementById("roipnl").textContent = roipnl;
    document.getElementById("entry_price").textContent = entry_price;
    document.getElementById("exit_price").textContent = exit_price;
    
};



