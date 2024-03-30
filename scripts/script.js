// Создание и сохранение скриншота
    window.onload = function() {
    // Кнопка нажата
    document.getElementById("save_ss").onclick = function() {
        
        save_pnl();
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
}