// получение данных из формы ввода 
function getInputData() {
    let selected_id = document.myform.selected_id.value;
    let balance = document.myform.balance.value;
    let trades = [];
    let percentages = [];
    let profits = [];

    for (let i = 1; i <= 7; i++) {
        trades[i-1] = document.getElementById(`trades_${i}`).value || 0;
        percentages[i-1] = document.getElementById(`percentages_${i}`).value || 0;
        profits[i-1] = document.getElementById(`profit_${i}`).value || 0;
    }

    let dates = generateWeekArray();

    return [selected_id, balance, dates, trades, percentages, profits];
};


// Заполнение списка дат в формы ввода при рендере страницы
function fillingFormDates() {
    let dates = generateWeekArray(); // Получаем список дат текущей недели
    // Заполняем span
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`date_${i}`).innerText = dates[i-1];
    }
}
document.addEventListener('DOMContentLoaded', function() {
    fillingFormDates(); 
});


// Генерация значения ID в инпуте
function generateId() {
    let randomNumber = '';
    for (let i = 0; i < 6; i++) {
        const digit = Math.floor(Math.random() * 10); 
        randomNumber += digit;
    }
    document.getElementById("selected_id").value = parseInt(randomNumber, 10); 
}


// Генерация значений в инпутах формы ввода
function generateValues(row) {
    let trades_cnt = Math.floor(Math.random() * (19 - 13 + 1)) + 13; // количество трейдов

    // Рандомная генерация процента прибыли одного трейда 
    let total_day_percent = 0;
    for (let trade = 1; trade <= trades_cnt; trade++) {
        let one_trade_percent = Math.random() * (0.95 - 0.67) + 0.67; 
        total_day_percent += one_trade_percent;
    }

    // Вычисление прибыли в usd для каждого дня
    let balance = document.myform.balance.value;
    let profit = balance / 100 * total_day_percent;

    // Заполнение полей ввода полученными значениями
    document.getElementById(`trades_${row}`).value = trades_cnt;
    document.getElementById(`percentages_${row}`).value = total_day_percent.toFixed(2);
    document.getElementById(`profit_${row}`).value = profit.toFixed(2);
}


// Очистить поля ввода определенной строки
function clearTableInputs(row) {
    document.getElementById(`trades_${row}`).value = "";
    document.getElementById(`percentages_${row}`).value = "";
    document.getElementById(`profit_${row}`).value = "";
}




// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = async function() {
        await generateScreenshot(); // Вызов главной вычислительно-конструирующей функции
        
        // конвертация html блока в png изображение
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            let file_name = "bot_"+generateFileName() + ".png";
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
}


// Формирование скриншота 
async function generateScreenshot () {
    // Получение и сохранение в переменные данных из полей ввода формы
    let [selected_id, balance, dates, trades, percentages, profits] = getInputData(); 

    let period = `${dates[0]} - ${dates[6]}`; // Генерация строки периода с первой и последней дат недели

    // суммарный недельный профит
    let total_profit = profits.reduce(function(a, b) {
        return Number(a) + Number(b);
    }, 0);

    let available = (Number(balance) + Number(total_profit)).toFixed(2);

    // Отрисовка тела скрина (все, кроме таблицы)
    document.getElementById("selected_id").textContent = selected_id;
    document.getElementById("period").textContent = period;
    document.getElementById("balance").textContent =`${balance}$`;
    document.getElementById("available").textContent = `${available}$`;
    document.getElementById("withdraw_date").textContent = `${dates[5]}.2024`;
    document.getElementById("total_profit").textContent = `${total_profit.toFixed(2)}$`;

    // Отрисовка таблицы
    const table = document.getElementById('ss_table');
    for (let i = 0; i < 7; i++) {
        const row = table.rows[i]; 
        row.cells[0].innerText = `${dates[i]} -`;
        row.cells[1].innerText = `${trades[i]} TR`;
        row.cells[3].innerText = `+${percentages[i]}%`;
        row.cells[4].innerText = `+${profits[i]}$`;
    }

    // замена фона скрина 
    let image_url = "url(../images/bot/dashboard-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;

}





// Генерация списка дней текущей календарной недели
function generateWeekArray() {
    // получение текущей даты
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    let currentDate = `${year}-${month}-${day}`;

    // Преобразуем входную дату в объект Date
    const date = new Date(currentDate);
    
    // Получаем день недели (0 - воскресенье, 1 - понедельник и т.д.)
    const dayOfWeek = date.getDay();
    
    // Определяем дату начала недели (понедельник)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    const weekArray = [];
    
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        
        // Форматируем дату в строку "DD-MM"
        const day = String(currentDay.getDate()).padStart(2, '0');
        const month = String(currentDay.getMonth() + 1).padStart(2, '0');
        weekArray.push(`${day}.${month}`);
    }
    return weekArray;
}
