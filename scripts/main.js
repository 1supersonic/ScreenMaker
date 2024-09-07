console.log('22'); // индикатор апдейта для консиоли браузера 



// Постоянное обновление перменных в хранилище при изменении данных в полях ввода 
function updateVariable(input_name) {
    switch(input_name) {
        case 'coin':
            sessionStorage.setItem(input_name, document.myform.coin.value);
            break;
        case "leverage":
            sessionStorage.setItem(input_name, document.myform.leverage.value);
            break;
        case "margin":
            sessionStorage.setItem(input_name, document.myform.margin.value);
            break;
        case "entry_price":
            sessionStorage.setItem(input_name, document.myform.entry_price.value);
    }
}



// Генерация даты и времени для названий файлов скринов 
function generateFileName() {
    let current_time = new Date();
    let year = String(current_time.getFullYear());
    let month = String(current_time.getMonth());
    let day = String(current_time.getDate());
    let hours = String(current_time.getHours());
    let minutes = String(current_time.getMinutes());
    let seconds = String(current_time.getSeconds());
    let file_name = year+"-"+month+"-"+day+"_"+hours+"-"+minutes+"-"+seconds;
    return file_name;
}



// Добавление запятой в написание тысяч (для скринов позы)
function addComma (number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};



// Заполнение поля ввода текущего времени (через кнопку)
function setCurrentTime() {
    let time = new Date();
    let hours = String(time.getHours());
    let minutes = String(time.getMinutes());
    
    if (hours.length == 1) {
        hours = "0" + hours;
    }
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }
    
    let current_time = hours + ":" + minutes;
    document.getElementById("input_time").setAttribute("value", current_time);
}