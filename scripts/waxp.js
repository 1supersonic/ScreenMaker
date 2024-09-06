// ПЕРЕМЕННЫЕ 
let current_waxp_section = "dashboard"; // текущая выбранная секция бота



// Получение данных из формы ввода 
function getInputData(section) {
    switch(section) {
        case "withdraw":
            let selected_id_dashboard = document.form.selected_id_dashboard.value;
            let balance = document.form.balance.value;
            let prev_total_profit = document.form.prev_total_profit.value;

            return [selected_id_dashboard, balance, prev_total_profit, dates, trades, percentages, profits];

        case "progress":
            let progress_percentage = document.form.selected_id_settings.value;

            return [progress_percentage];
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
        html2canvas(document.getElementById("screenshot_withdraw")).then(function(canvas) {
            let file_name = "waxp_"+generateFileName() + ".png";
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });

        // конвертация html блока в png изображение
        console.log("второй скрин")
        html2canvas(document.getElementById("screenshot_withdraw_details")).then(function(canvas) {
            let file_name = "waxp_"+generateFileName() + ".png";
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
            let file_name = "waxp_"+generateFileName() + ".png";
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
    let [selected_id, balance, prev_total_profit, dates, trades, percentages, profits] = getInputData("dashboard"); 

    formingWithdrawScreenshot();
    formingDetailsScreenshot();
    formingEmailScreenshot();
}



// Формирование скрина формы вывода
function formingWithdrawScreenshot() {

    // Отрисовка тела скрина (все, кроме таблицы)
    document.getElementById("selected_id_dashboard").textContent = selected_id;
    document.getElementById("period").textContent = period;
    document.getElementById("balance").textContent =`${balance}$`;

    
    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/withdraw-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



// Формирование скрина деталей выполненного вывода 
function formingDetailsScreenshot() {

    // Отрисовка тела скрина 
    document.getElementById("selected_id_settings").textContent = `Selected ID: ${selected_id}`;
    document.getElementById("deposit_address").textContent = deposit_address;
    document.getElementById("withdrawal_address").textContent = withdrawal_address;

    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/details-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}



// Формирования скрина электронного письма 
function formingEmailScreenshot() {

    // Отрисовка тела скрина 
    document.getElementById("selected_id_settings").textContent = `Selected ID: ${selected_id}`;
    document.getElementById("deposit_address").textContent = deposit_address;
    document.getElementById("withdrawal_address").textContent = withdrawal_address;

    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/email-work.png)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
}