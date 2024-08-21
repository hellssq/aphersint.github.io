function logout() {
    window.location.href = "/";
  }

  async function search() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Очистить предыдущие результаты

    const number = document.getElementById('number-input').value.trim();
    const ip = document.getElementById('ip-input').value.trim();
    const inn = document.getElementById('inn-input').value.trim();
    const car = document.getElementById('car-input').value.trim();
    const tg = document.getElementById('tg-input').value.trim();

    if (number) {
        await loadResults(number, 'phone');
    }
    if (ip) {
        await lookupIP(ip);
    }
    if (inn) {
        loadResultn(inn);
    }
    if (car) {
        await loadResults(car, 'car');
    }
    if (tg) {
        await getUserData(tg);
    }
}



function func() {

    window.location.href = "number.html";
      
}
function ftg(){
  window.location.href = "telegram.html";

}
function fIP(){
  window.location.href = "IP.html";

}
function fcar(){
  window.location.href = "car.html";
}
function getUserData(userId) {
  const url = `http://79.174.85.141/tg.php?id=${userId}`;

  fetch(url)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error(`Ошибка: ${response.status}`);
          }
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          if (error.name === "SyntaxError") {
              console.log("Ошибка при разборе JSON.");
          } else {
              console.log(error.message);
          }
      });
}

async function loadResultad() {

  const numb = document.getElementById('number-input').value.trim();

  
  if (numb === '') {
      alert('Пожалуйста, введите номер телефона.');
      return;
  }


  const url = `http://79.174.85.141/search.php?phone=${numb}`;

  try {

      let response = await fetch(url);

      
      if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
      }


      let data = await response.json();


      const jsonData = JSON.stringify(data, null, 4);

 
      const blob = new Blob([jsonData], { type: 'application/json' });


      const a = document.createElement('a');
      const downloadUrl = URL.createObjectURL(blob);
      a.href = downloadUrl;
      a.download = `${numb}.json`;
      a.textContent = 'Нажмите здесь, чтобы скачать файл';
      document.body.appendChild(a);


      alert(`Файл с данными для номера ${numb} готов к скачиванию. Ссылка появится ниже.`);

  
      a.click();

 
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
  } catch (error) {
      console.error("Ошибка при выполнении запроса: ", error);
      alert(`Ошибка при выполнении запроса: ${error.message}`);

      if (error.message === 'Failed to fetch') {
          alert('Не удалось выполнить запрос. Возможно, проблема с политикой CORS или сервер недоступен.');
      }
  }
}



function loadResultn() {


    const inn = document.getElementById('inn-input').value.trim();

 
    if (inn === '') {
        alert('Пожалуйста, введите ИНН.');
        return;
    }

    const url = `https://egrul.itsoft.ru/${inn}.xml`;

    const a = document.createElement('a');
    a.href = url;
    a.download = `${inn}.xml`;
    a.textContent = 'Нажмите здесь, чтобы скачать файл';
    document.body.appendChild(a);
    

    alert(`Файл с данными ИНН ${inn} готов к скачиванию. Ссылка появится ниже.`);
    

    a.click();
    

    document.body.removeChild(a);
}

async function loadResults() {
  const carNumber = document.getElementById('car-input').value.trim();

  if (carNumber === '') {
      alert('Пожалуйста, введите гос. номер.');
      return;
  }


  const apiKey = '1365e81148986bf10b1663ae676c69e9';
  const url = `https://baza-gai.com.ua/nomer/${carNumber}`;

  try {

      let response = await fetch(url, {
          headers: {
              'Accept': 'application/json',
              'X-Api-Key': apiKey
          }
      });


      if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
      }


      let data = await response.json();


      const jsonData = JSON.stringify(data, null, 4);


      const blob = new Blob([jsonData], { type: 'application/json' });

      const a = document.createElement('a');
      const downloadUrl = URL.createObjectURL(blob);
      a.href = downloadUrl;
      a.download = `${carNumber}.json`;
      a.textContent = 'Нажмите здесь, чтобы скачать файл';
      document.body.appendChild(a);


      alert(`Файл с данными для гос. номера ${carNumber} готов к скачиванию. Ссылка появится ниже.`);


      a.click();


      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
  } catch (error) {
      console.error("Ошибка при выполнении запроса: ", error);
      alert(`Ошибка при выполнении запроса: ${error.message}`);

      if (error.message === 'Failed to fetch') {
          alert('Не удалось выполнить запрос. Возможно, проблема с политикой CORS или сервер недоступен.');
      }
  }
}
async function lookupIP() {

    const ip = document.getElementById('ip-input').value.trim();


    if (ip === '') {
        alert('Пожалуйста, введите IP-адрес.');
        return;
    }

    const apiKey = '32f020f49becc1'; 
    const url = `https://ipinfo.io/${ip}/json?token=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        const jsonData = JSON.stringify(data, null, 4);

        const blob = new Blob([jsonData], { type: 'application/json' });

 
        const a = document.createElement('a');
        const downloadUrl = URL.createObjectURL(blob);
        a.href = downloadUrl;
        a.download = `${ip}.json`;
        a.textContent = 'Нажмите здесь, чтобы скачать файл';


        const fileLinkContainer = document.getElementById('file-link-container');
        if (fileLinkContainer) {
            fileLinkContainer.innerHTML = ''; 
            fileLinkContainer.appendChild(a);
        } else {
            console.error('Элемент с ID "file-link-container" не найден.');
            alert('Не удалось найти контейнер для ссылки.');
        }

   
        alert(`Файл с данными для IP ${ip} готов к скачиванию. Ссылка появится ниже.`);

     
        a.click();

        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Ошибка при выполнении запроса: ", error);
        alert(`Ошибка при выполнении запроса: ${error.message}`);
 
        if (error.message === 'Failed to fetch') {
            alert('Не удалось выполнить запрос. Возможно, проблема с политикой CORS или сервер недоступен.');
        }
    }
}
