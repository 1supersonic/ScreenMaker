// Переменные 
let selected_id = "";
let balance = "";
let available = "";
let withdraw_date = "";
let total_profit = 0;
let period = "";
let deposit_date = "";


// получение данных из формы ввода 
function getInputData() {
    balance = document.myform.balance.value;
    withdraw_date = document.myform.withdraw_date.value;
    deposit_date = document.myform.deposit_date.value;
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

    let week_days_dates = generateWeekArray(); // Получение списка дней текущей недели в виде дат
    let week_trades = []; // массив количества трейдов за день
    let week_percentages = []; // массив количества процентов прибыли за день 
    let day_profits = []; // массив значений прибыли за день

    // Перебор 7 дней недели (c 0 по 6) для генерации числа трейдов и процентов за день
    for (let day = 0; day <= 6; day++) {
        let total_day_percent = 0;

        // Генерация рандомного числа трейдров за день
        let min = 13;
        let max = 19;
        let trades_count = Math.floor(Math.random() * (max - min + 1)) + min;

        for (let trade = 1; trade <= trades_count; trade++) {
            // Генерация рандомного процента прибыли одного трейда 
            let min = 0.67;
            let max = 0.95;
            const profit_percentage = Math.random() * (max - min) + min;
            total_day_percent += profit_percentage;
        }

        week_trades[day] = trades_count;
        week_percentages[day] = total_day_percent.toFixed(2);
    }

    // вычисление прибыли в usd для каждого дня
    for (let i = 0; i <= 6; i++) {
        let day_profit = (balance * week_percentages[i]) / 100;
        day_profits[i] = day_profit.toFixed(2);
        total_profit += Number(day_profit.toFixed(2));
    }

    // Генерация строки периода с первой и последней дат недели
    period = `${week_days_dates[0]} - ${week_days_dates[6]}`;
    console.log(period);

    available = `${Number(balance) + Number(total_profit)}$`;
    

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
        row.cells[4].innerText = `+${day_profits[i]}$`;
    }

    // замена фона скрина 
    let image_url = "url(../images/bot/dashboard-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;


    // дебаг в консоли
    console.log(week_days_dates);
    console.log(week_trades);
    console.log(week_percentages);
    console.log(day_profits);
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



