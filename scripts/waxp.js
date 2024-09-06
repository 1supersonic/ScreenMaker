// ПЕРЕМЕННЫЕ 
let current_waxp_section = "dashboard"; // текущая выбранная секция бота



// Получение данных из формы ввода 
function getInputData(section) {
    switch(section) {
        case "dashboard":
            let selected_id_dashboard = document.form.selected_id_dashboard.value;
            let balance = document.form.balance.value;
            let prev_total_profit = document.form.prev_total_profit.value;

            return [selected_id_dashboard, balance, prev_total_profit, dates, trades, percentages, profits];

        case "settings":
            let selected_id_settings = document.form.selected_id_settings.value;
            let deposit_address = document.form.deposit_address.value;
            let withdrawal_address = document.form.withdrawal_address.value;

            return [selected_id_settings, deposit_address, withdrawal_address];
    }
}



// Восстановление нужной вкладки после перезагрузки страницы
function recoverSection() {
    current_waxp_section = sessionStorage.getItem("current_waxp_section");

    if (current_waxp_section) {
        document.getElementById('waxp_form_withdraw').classList.remove('current');
        document.getElementById('waxp_form_progress').classList.remove('current');
        document.getElementById('bot_screen_dashboard').classList.remove('current');
        document.getElementById('bot_screen_settings').classList.remove('current');

        switch(current_waxp_section) {
            case "withdraw":
                document.getElementById("waxp_form_withdraw").classList.add('current');
                document.getElementById("bot_screen_dashboard").classList.add('current');
                // document.getElementById('screenshot').style.backgroundImage = "url(../images/bot/dashboard-test.png)";
                document.querySelector('select[name="waxp_section"]').value = "withdraw";
                break;
            case "progress":
                document.getElementById("waxp_form_progress").classList.add('current');
                document.getElementById("bot_screen_settings").classList.add('current');
                // document.getElementById('screenshot').style.backgroundImage = "url(../images/bot/settings-test.png)";
                document.querySelector('select[name="waxp_section"]').value = "progress";
                break;
        }
    }
}



// Смена выбранной секции бота 
function changeWaxpSection() {
    current_waxp_section = document.form.waxp_section.value;
    sessionStorage.setItem("current_waxp_section", current_waxp_section);

    document.getElementById('waxp_form_withdraw').classList.remove('current');
    document.getElementById('waxp_form_progress').classList.remove('current');
    document.getElementById('bot_screen_dashboard').classList.remove('current');
    document.getElementById('bot_screen_settings').classList.remove('current');

    switch(current_waxp_section) {
        case "withdraw":
            document.getElementById("waxp_form_withdraw").classList.add('current');
            document.getElementById("bot_screen_dashboard").classList.add('current');
            document.getElementById('screenshot').style.backgroundImage = "url(../images/bot/dashboard-test.png)";
            break;
        case "progress":
            document.getElementById("waxp_form_progress").classList.add('current');
            document.getElementById("bot_screen_settings").classList.add('current');
            document.getElementById('screenshot').style.backgroundImage = "url(../images/bot/settings-test.png)";
            break;
    }
}



// Создание и сохранение скриншота
window.onload = function() {
    recoverSection(); // восстановление последней выбранной секции бота

    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = async function() {
        await generateScreenshot(); // Вызов главной вычислительно-конструирующей функции
        
        // конвертация html блока в png изображение
        console.log("первый скрин")
        html2canvas(document.getElementById("screenshot_iphone")).then(function(canvas) {
            let file_name = "bot_"+generateFileName() + ".png";
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });

        // конвертация html блока в png изображение
        console.log("второй скрин")
        html2canvas(document.getElementById("screenshot_details")).then(function(canvas) {
            let file_name = "bot_"+generateFileName() + ".png";
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });

        // конвертация html блока в png изображение
        console.log("третий скрин")
        html2canvas(document.getElementById("screenshot_email")).then(function(canvas) {
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
    
}



// Формирование скрина дешборда (списка трейдов)
function formingDashboardScreenshot() {
    // Получение и сохранение в переменные данных из полей ввода формы
    let [selected_id, balance, prev_total_profit, dates, trades, percentages, profits] = getInputData("dashboard"); 

    // Генерация строки периода с первой и последней датами недели
    let period = `${dates[0]} - ${dates[6]}`; 

    // Суммарный недельный профит
    let total_profit = profits.reduce(function(a, b) {
        return Number(a) + Number(b);
    }, 0);

    // Вычисление параметра "Available"
    let available = 0;
    if (prev_total_profit == "") {
        available = (Number(balance) + Number(total_profit)).toFixed(2);
    } else {
        available = (Number(prev_total_profit) + Number(balance) + Number(total_profit)).toFixed(2);
        total_profit = total_profit + Number(prev_total_profit);
    }

    // Отрисовка тела скрина (все, кроме таблицы)
    document.getElementById("selected_id_dashboard").textContent = selected_id;
    document.getElementById("period").textContent = period;
    document.getElementById("balance").textContent =`${balance}$`;
    document.getElementById("available").textContent = `${available}$`;
    document.getElementById("withdraw_date").textContent = `${dates[5]}.2024`;
    document.getElementById("total_profit").textContent = `${total_profit.toFixed(2)}$`;

    // Отрисовка таблицы со списком трейдов
    const table = document.getElementById('ss_table');
    for (let i = 0; i < 7; i++) {
        const row = table.rows[i]; 
        row.cells[0].innerText = `${dates[i]} -`;
        row.cells[1].innerText = `${trades[i]} TR`;
        row.cells[3].innerText = `+${percentages[i]}%`;
        row.cells[4].innerText = `+${profits[i]}$`;
    }

    // Замена фона скрина на "пустой"
    let image_url = "url(../images/bot/dashboard-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



// Формирование скрина настроек с адресами
function formingSettingsScreenshot() {
    // Получение и сохранение в переменные данных из полей ввода формы
    let [selected_id, deposit_address, withdrawal_address] = getInputData("settings"); 

    // Отрисовка тела скрина 
    document.getElementById("selected_id_settings").textContent = `Selected ID: ${selected_id}`;
    document.getElementById("deposit_address").textContent = deposit_address;
    document.getElementById("withdrawal_address").textContent = withdrawal_address;

    // Замена фона скрина на "Пустой"
    let image_url = "url(../images/bot/settings-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}
