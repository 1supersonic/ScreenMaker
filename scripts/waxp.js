// ПЕРЕМЕННЫЕ 
let current_waxp_section = "dashboard"; // текущая выбранная секция бота



// Получение данных из формы ввода 
function getInputData(section) {
    switch(section) {
        case "withdraw":
            let address = document.form.address.value;
            let memo = document.form.memo.value;
            let amount = document.form.amount.value;
            let available = document.form.available.value;
            let withdraw_date = document.form.withdraw_date.value;
            let withdraw_time = document.form.withdraw_time.value;

            return [address, memo, amount, available, withdraw_date, withdraw_time];

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



function addCommaToNumber(num) {
    // Преобразуем число в строку
    let numStr = num.toString();
    
    // Найдем позицию точки
    let dotIndex = numStr.indexOf('.');
    
    // Если точка найдена, обработаем часть до точки
    if (dotIndex !== -1) {
        // Отделим целую часть от дробной
        let integerPart = numStr.slice(0, dotIndex);
        let fractionalPart = numStr.slice(dotIndex);
        
        // Добавим запятую перед последними тремя цифрами
        if (integerPart.length > 3) {
            integerPart = integerPart.slice(0, -3) + ',' + integerPart.slice(-3);
        }
        
        // Соединим обратно целую и дробную части
        return integerPart + fractionalPart;
    } else {
        // Если точка не найдена, просто добавляем запятую перед последними тремя цифрами
        if (numStr.length > 3) {
            return numStr.slice(0, -3) + ',' + numStr.slice(-3);
        } else {
            return numStr;
        }
    }
}



// Создание и сохранение скриншота
window.onload = function() {
    recoverSection(); // восстановление последней выбранной секции бота

    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = async function() {
        await generateScreenshot(); // Вызов главной вычислительно-конструирующей функции

        let blocks = ["screenshot_withdraw", "screenshot_withdrawal_details", "screenshot_email"];
        for (let i=0; i<3; i++) {
            html2canvas(document.getElementById(blocks[i])).then(function(canvas) {
                let file_name = "waxp_"+generateFileName() + ".png";
                const link = document.createElement('a');
                link.download = file_name;
                link.href = canvas.toDataURL("image/png");
                link.target = '_blank';
                link.click();
                link.delete;
            });
        }
    }
}



// Формирование скриншотов 
async function generateScreenshot () {
    // Получение и сохранение в переменные данных из полей ввода формы
    let [address, memo, amount, available, withdraw_date, withdraw_time] = getInputData("withdraw"); 

    formingWithdrawScreenshot(address, memo, available, amount);
    formingDetailsScreenshot(amount, withdraw_date, withdraw_time, address);
    formingEmailScreenshot(amount, address, memo);
}



// Формирование скрина формы вывода
function formingWithdrawScreenshot(address, memo, available, amount) {
    available = addCommaToNumber(available);
    let total_amount = `${addCommaToNumber(amount)} WAXP`

    // Отрисовка тела скрина 
    document.getElementById("withdraw_adress").textContent = address;
    document.getElementById("withdraw_memo").textContent = memo;
    document.getElementById("withdraw_available_1").textContent = available;
    document.getElementById("withdraw_amount").textContent = amount;
    document.getElementById("withdraw_available_2").textContent = available;
    document.getElementById("withdraw_total_amount").textContent = total_amount;

    
    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/withdraw-work.png)"; 
    document.getElementById('screenshot_withdraw').style.backgroundImage = image_url;
}



// Формирование скрина деталей выполненного вывода 
function formingDetailsScreenshot(amount, withdraw_date, withdraw_time, address) {
    let datetime = `${withdraw_date} ${withdraw_time}`;
    amount = `${addCommaToNumber(amount)} WAXXP`;

    // Отрисовка тела скрина 
    document.getElementById("withdrawal_details_amount").textContent = amount;
    document.getElementById("withdrawal_details_datetime").textContent = datetime;
    document.getElementById("withdrawal_details_address").textContent = address;

    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/details-work.png)"; 
    document.getElementById('screenshot_withdrawal_details').style.backgroundImage = image_url;
}



// Формирования скрина электронного письма 
function formingEmailScreenshot(amount, address, memo) {
    memo = `(memo:${memo})`

    // Отрисовка тела скрина 
    document.getElementById("email_amount").textContent = amount;
    document.getElementById("email_address").textContent = address;
    document.getElementById("email_memo").textContent = memo;


    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/email-work.PNG)"; 
    document.getElementById('screenshot_email').style.backgroundImage = image_url;
}