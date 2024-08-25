// Переменные 
let selected_id = "";
let balance = "";
let available = "";
let withdraw_date = "";
let total_profit = 0;


// получение данных из формы ввода 
function getInputData() {
    balance = document.myform.balance.value;
    withdraw_date = document.myform.withdraw_date.value;
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
    
    let available = balance + total_profit;
        
    // Отрисовка тела скрина
    document.getElementById("available").textContent = available;

    // замена фона скрина 
    //let image_url = "url(../images/withdraw/work.png)"; 
    // document.getElementById('screenshot').style.backgroundImage = image_url;
}



