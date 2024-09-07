// ПЕРЕМЕННЫЕ 
let current_waxp_section = "dashboard"; // текущая выбранная секция бота



// ---- УПРАВЛЕНИЕ ВКЛАДКАМИ (СЕКЦИЯМИ) ФОРМЫ ----

// Восстановление нужной вкладки после перезагрузки страницы
function recoverSection() {
    current_waxp_section = sessionStorage.getItem("current_waxp_section");

    if (current_waxp_section) {
        document.getElementById('waxp_form_withdraw').classList.remove('current');
        document.getElementById('waxp_form_progress').classList.remove('current');
        document.getElementById('waxp_image_withdraw').classList.remove('current');
        document.getElementById('waxp_image_progress').classList.remove('current');

        switch(current_waxp_section) {
            case "withdraw":
                document.getElementById("waxp_form_withdraw").classList.add('current');
                document.getElementById("waxp_image_withdraw").classList.add('current');
                // document.getElementById('screenshot').style.backgroundImage = "url(../images/bot/dashboard-test.png)";
                document.querySelector('select[name="waxp_section"]').value = "withdraw";
                break;
            case "progress":
                document.getElementById("waxp_form_progress").classList.add('current');
                document.getElementById("waxp_image_progress").classList.add('current');
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
    document.getElementById('waxp_image_withdraw').classList.remove('current');
    document.getElementById('waxp_image_progress').classList.remove('current');

    switch(current_waxp_section) {
        case "withdraw":
            document.getElementById("waxp_form_withdraw").classList.add('current');
            document.getElementById("waxp_image_withdraw").classList.add('current');
            document.getElementById('screenshot').style.backgroundImage = "url(../images/bot/dashboard-test.png)";
            break;
        case "progress":
            document.getElementById("waxp_form_progress").classList.add('current');
            document.getElementById("waxp_image_progress").classList.add('current');
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

        // Конвертация html блоков в png изображения
        switch (current_waxp_section) {
            case "withdraw":
                let blocks = ["screenshot_withdraw", "screenshot_withdrawal_details", "screenshot_email"];
                let names = ["withdraw_", "withdrawal_details_", "email_"];
                for (let i=0; i<3; i++) {
                    html2canvas(document.getElementById(blocks[i])).then(function(canvas) {
                        let file_name = "waxp_" + names[i] + generateFileName() + ".png";
                        const link = document.createElement('a');
                        link.download = file_name;
                        link.href = canvas.toDataURL("image/png");
                        link.target = '_blank';
                        link.click();
                        link.delete;
                    });
                }
                break;
            case "progress":
                html2canvas(document.getElementById("waxp_image_progress")).then(function(canvas) {
                    let file_name = "waxp_"+generateFileName() + ".png";
                    const link = document.createElement('a');
                    link.download = file_name;
                    link.href = canvas.toDataURL("image/png");
                    link.target = '_blank';
                    link.click();
                    link.delete;
                })
                break;
        }
    }
}



// ---- ФОРМИРОВАНИЕ СКРИНОВ ----

// Получение данных из формы ввода 
function getInputData(section) {
    switch(section) {
        case "withdraw":
            let iphone_time = document.form.iphone_time.value;
            let iphone_battery = document.form.iphone_battery.value;
            let address = document.form.address.value;
            let memo = document.form.memo.value;
            let amount = document.form.amount.value;
            let available = document.form.available.value;
            let withdraw_date = document.form.withdraw_date.value;
            let withdraw_time = document.form.withdraw_time.value;

            return [iphone_time, iphone_battery, address, memo, amount, available, withdraw_date, withdraw_time];

        case "progress":
            let progress_percentage = document.form.progress_percentage.value;

            return [progress_percentage];
    }
}


// Общая распределительная функция
async function generateScreenshot () {
    switch (current_waxp_section) {
        case "withdraw":
            // Получение и сохранение в переменные данных из полей ввода формы
            let [iphone_time, iphone_battery, address, memo, amount, available, withdraw_date, withdraw_time] = getInputData("withdraw"); 
            formingWithdrawScreenshot(iphone_time, iphone_battery, address, memo, available, amount);
            formingDetailsScreenshot(amount, withdraw_date, withdraw_time, address);
            formingEmailScreenshot(amount, address, memo);
            break;
        case "progress":
            let [progress_percentage] = getInputData("progress"); 
            formingProgressScreenshot(progress_percentage);
            break;
    }
}


// Формирование скрина формы вывода
function formingWithdrawScreenshot(iphone_time, iphone_battery, address, memo, available, amount) {
    available = addCommaToNumber(available);
    let total_amount = `${addCommaToNumber(amount)} WAXP`

    // Отрисовка тела скрина 
    document.getElementById("iphone_time").textContent = iphone_time; // время в левом верхенем углу айфона 
    document.getElementById("withdraw_adress").textContent = address;
    document.getElementById("withdraw_memo").textContent = memo;
    document.getElementById("withdraw_available_1").textContent = available;
    document.getElementById("withdraw_amount").textContent = amount;
    document.getElementById("withdraw_available_2").textContent = available;
    document.getElementById("withdraw_total_amount").textContent = total_amount;

    // Отрисовка иконок верхнего правого угла экрана айфона 
    let icons_url = "";
    console.log(iphone_battery);
    switch (iphone_battery) {
        case "10":
            icons_url = "url(../images/icons/light-gray/10.png)";
            break;
        case "50":
            icons_url = "url(../images/icons/light-gray/50.png)";
            break;
        case "90":
            icons_url = "url(../images/icons/light-gray/90.png)";
            break;
    }
    document.getElementById('iphone_icons').style.backgroundImage = icons_url;
    
    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/withdraw-work.png)"; 
    document.getElementById('screenshot_withdraw').style.backgroundImage = image_url;
}


// Формирование скрина деталей выполненного вывода 
function formingDetailsScreenshot(amount, withdraw_date, withdraw_time, address) {
    let datetime = `${withdraw_date} ${withdraw_time}`;
    amount = `${addCommaToNumber(amount)} WAXP`;

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


// Формирование скрина прогресса транзации WAXP
function formingProgressScreenshot(progress_percentage) {
    progress_percentage = `${progress_percentage}%`
    document.getElementById("progress_percentage").textContent = progress_percentage;

    // Замена фона скрина на рабочий (пустой)
    let image_url = "url(../images/waxp/progress-work.png)"; 
    document.getElementById('waxp_image_progress').style.backgroundImage = image_url;
}



// ---- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----

// Добавление запятой в написании тысяч 1234.45 -> 1,234.56
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