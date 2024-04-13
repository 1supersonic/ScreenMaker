console.log('8');

// генерация имени файла дата + время 
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


// Добавление запятой в написание тысяч 
function addComma (number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};