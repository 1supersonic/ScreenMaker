console.log("hello");
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data');
        container.innerHTML = JSON.stringify(data, null, 2);
        console.log(data);
    });