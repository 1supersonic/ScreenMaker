// Переменные 
let time = "";
let battery = "";
let adress = "";
let minimum = "";
let available = "";
let fee = "";


// получение данных из формы ввода 
function getInputData() {
    time = document.myform.time.value;
    battery = document.myform.battery.value;
    adress = document.myform.adress.value;
    minimum = document.myform.minimum.value;
    available = document.myform.available.value;
    fee = document.myform.fee.value;

};


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = async function() {
        await generateScreenshot();
        
        // конвертация html блока в png изображение
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            let file_name = "withdraw_"+generateFileName() + ".png";
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

    // замена фона скрина 
    let image_url = "url(../images/withdraw/work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}


