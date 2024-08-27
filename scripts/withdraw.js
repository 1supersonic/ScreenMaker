// Переменные 

// получение данных из формы ввода 
function getInputData() {
    time = document.myform.time.value;
    battery = document.myform.battery.value;
    adress = document.myform.adress.value;
    amount = document.myform.amount.value;
    minimum = document.myform.minimum.value;
    available = document.myform.available.value;
    network_fee = document.myform.network_fee.value;

    return [time, battery, adress, minimum, available, network_fee];
};


function insertBrBeforeLastSix(str) {
    if (str.length <= 6) {
        return "<br>" + str;
    }
    // Разделяем строку на две части: первая часть до последних 6 символов и последние 6 символов
    let beforeLastSix = str.slice(0, -6);
    let lastSix = str.slice(-6);

    // Добавляем <br> перед последними 6 символами
    return beforeLastSix + "<br>" + lastSix;
}


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
    // получение данных из полей ввода 
    let [time, battery, adress, minimum, available, network_fee] = getInputData(); 

    
    adress = insertBrBeforeLastSix(adress);

        
    // отрисовка иконок верхнего правого угла айфона 
    let icons_url = "";
    switch (battery) {
        case "10":
            icons_url = "url(../images/icons/dark-blue/10.png)";
            break;
        case "50":
            icons_url = "url(../images/icons/dark-blue/50.png)";
            break;
        case "90":
            icons_url = "url(../images/icons/bldark-blueack/90.png)";
            break;
    }
    document.getElementById('iphone_icons').style.backgroundImage = icons_url;
        
    // Отрисовка времени айфона 
    document.getElementById("iphone_time").textContent = time;
        
    // Отрисовка тела скрина
    document.getElementById("adress").textContent = adress;
    document.getElementById("amount").textContent = amount;
    document.getElementById("available").textContent = available;
    document.getElementById("minimum").textContent = minimum;
    document.getElementById("network_fee").textContent = network_fee;
    

    // замена фона скрина 
    let image_url = "url(../images/withdraw/work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



