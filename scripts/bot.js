// Переменные 
let selected_id = "";
let balance = ""; // введенный в форме баланс 
let available = ""; // калькуляция (баланс + профит)
let withdraw_date = ""; // дата вывода 
let total_profit = 0; // сумма профитов в $ за 7 дней 
let period = ""; // даты (границы) текущей недели
let deposit_date = ""; // дата депозита текущего баланса 
let day_part = ""; // часть дня в которую был сделан депозит
let short_day_index = 0;
let key = ""; // уникальный ключ генерации
let week_days_dates = []; // список дней текущей недели в виде дат
let week_trades = []; // массив количества трейдов за день
let week_percentages = []; // массив количества процентов прибыли за день 
let days_profits = []; // Массив значений прибыли за день
let first_day_index = 0; // Индекс дня, с которого идет трейдинг на текущей неделе
let last_day_index = 0; // Индекс дня, до которого включительно идет трейдинг (сегодня)


console.log("hello");
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data');
        container.innerHTML = JSON.stringify(data, null, 2);
        console.log(data);
    });



// получение данных из формы ввода 
function getInputData() {
    key = document.myform.key.value;
    balance = document.myform.balance.value;
    withdraw_date = document.myform.withdraw_date.value;
    deposit_date = document.myform.deposit_date.value;
    day_part = document.myform.day_part.value;
};


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = async function() {
        await generateScreenshot(); // Вызов главной вычислительно-конструирующей функции
        
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


// Формирование скриншота 
async function generateScreenshot () {
    getInputData(); // Получение и сохранение в переменные данных из полей ввода формы

    week_days_dates = generateWeekArray(); // Получение списка дней текущей недели в виде дат

    // Получение индекса первого дня генерации 
    deposit_date = transformDateFormat(deposit_date);  
    if (week_days_dates.includes(deposit_date)) {
        first_day_index = week_days_dates.indexOf(deposit_date);
    } else {
        first_day_index = 0;
    }
    // Получение индекса последнего дня генерации
    let current_date = getCurrentDateFormatted();
    last_day_index = week_days_dates.indexOf(current_date);

    // Если введен ключ генерации 
    if (key != "") {
        let [user_id, last_balance, wd_date, days_array] = key.split("$"); // расшифрока ключа генерации

        // Заполняем массивы данными из ключа генерации
        let rows = days_array.split("#");
            rows.forEach(row => {
                let [trade1, percent1] = row.split('&');
                week_trades.push(parseFloat(trade1));
                week_percentages.push(parseFloat(percent1));
        })
    // Если ключа генерации нет
    } else { 
        [week_trades, week_percentages] = genTradesAndPercentages(first_day_index, last_day_index);
    }

    // Вычисление прибыли в usd для каждого дня
    for (let i = first_day_index; i <= last_day_index; i++) {
        let day_profit = (balance * week_percentages[i]) / 100;
        days_profits[i] = day_profit.toFixed(2);
        total_profit += Number(day_profit.toFixed(2));
    }

    // Генерация строки периода с первой и последней дат недели
    period = `${week_days_dates[0]} - ${week_days_dates[6]}`;
    console.log(period);

    available = `${(Number(balance) + Number(total_profit)).toFixed(2)}$`; // вычисление значения 

    // ---- ОТРИСОВКА ---- 
    // Отрисовка тела скрина (все, кроме таблицы)
    document.getElementById("period").textContent = period;
    document.getElementById("available").textContent = available;
    document.getElementById("total_profit").textContent = `${total_profit.toFixed(2)}$`;
    // Отрисовка таблицы
    const table = document.getElementById('table');
    for (let i = 0; i < 7; i++) {
        const row = table.rows[i]; 
        row.cells[0].innerText = `${week_days_dates[i]} -`;
        row.cells[1].innerText = `${week_trades[i]} TR`;
        row.cells[3].innerText = `+${week_percentages[i]}%`;
        row.cells[4].innerText = `+${days_profits[i]}$`;
    }

    // замена фона скрина 
    let image_url = "url(../images/bot/dashboard-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;


    // дебаг в консоли
    console.log(week_days_dates);
    console.log(week_trades);
    console.log(week_percentages);
    console.log(days_profits);
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


// Генерация ранломных значений количества трейдов и размеров процентов прибыли
function genTradesAndPercentages(startIndex, endIndex) {
    let week_trades = [];
    let week_percentages = [];
    // Перебор 7 дней недели (c 0 по 6) 
    for (let day = startIndex; day <= endIndex; day++) {
        let total_day_percent = 0;

        // Рандомная генерация числа трейдров за день
        let min = 13;
        let max = 19;
        let trades_count = Math.floor(Math.random() * (max - min + 1)) + min;

        for (let trade = 1; trade <= trades_count; trade++) {
            // Рандомная генерация процента прибыли одного трейда 
            let min = 0.67;
            let max = 0.95;
            const profit_percentage = Math.random() * (max - min) + min;
            total_day_percent += profit_percentage;
        }

        week_trades[day] = trades_count;
        week_percentages[day] = total_day_percent.toFixed(2);
    }
    return [week_trades, week_percentages];
}


// Перевод даты из формата 2024-10-23 в формат 23.10
function transformDateFormat() {
    const [year, month, day] = deposit_date.split('-');
    const date = `${day}.${month}`;
    return date;
}


// Генерация текущей даты в формате DD.MM
function getCurrentDateFormatted() {
    const today = new Date();

    // Получаем день и месяц
    let day = today.getDate();
    let month = today.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1

    // Добавляем ведущий ноль, если день или месяц меньше 10
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    // Форматируем дату как DD.MM
    return `${day}.${month}`;
}