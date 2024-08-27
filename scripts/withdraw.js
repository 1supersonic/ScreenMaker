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

    return [time, battery, adress, amount, minimum, available, network_fee];
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
    // получение данных из полей ввода 
    let [time, battery, adress, amount, minimum, available, network_fee] = getInputData(); 

    let receive_amount = Number(amount) - Number(network_fee);
    minimum = `Withdrawal must be at least ${minimum} USDT.`
        
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
    document.getElementById("withdrawal_amount").textContent = amount;
    document.getElementById("available").textContent = `${available} USDT`;
    document.getElementById("minimum").textContent = minimum;
    document.getElementById("receive_amount").textContent = receive_amount;
    document.getElementById("network_fee").textContent = `${network_fee},00 USDT`;
    

    // замена фона скрина 
    let image_url = "url(../images/withdraw/work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



