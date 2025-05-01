
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' в навигаторе) {
    navigator.serviceWorker.register('service-worker.js');
  }

  функция loadSummary() {
    fetch('https://script.google.com/macros/s/AKfycbzWVSvH6HuaB6Qyw5D_YZ4NsxwMmW3esLZxHQfuGECyzzFA66873Br1T0uAq50m1xm8/exec')
      .тогда(res => res.json())
      .тогда(данные => {
        константа резюме = `
          Доход: <b>${data.income.toFixed(2)} ₽</b><br>
          Расход: <b>${data.expense.toFixed(2)} ₽</b><br>
          Баланс: <b>${data.balance.toFixed(2)} ₽</b>
        `;
        document.getElementById('summary').innerHTML = summary;

        let entersHtml = '<h3>Последние записи</h3>';
        данные.записи.forEach(e => {
          записиHtml += `<div>${e.date} — ${e.type}: ${e.category} — ${e.amount} ₽</div>`;
        });

        document.getElementById('recent').innerHTML = записиHtml;
      });
  }

  const submitBtn = document.getElementById('отправить');
  submitBtn.addEventListener('click', () => {
    константный тип = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    константа сумма = document.getElementById('amount').value;
    const statusDiv = document.getElementById('status');

    если (!категория || !количество) {
      statusDiv.textContent = "Заполните все поля.";
      возвращаться;
    }

    fetch('https://script.google.com/macros/s/AKfycbzWVSvH6HuaB6Qyw5D_YZ4NsxwMmW3esLZxHQfuGECyzzFA66873Br1T0uAq50m1xm8/exec', {
      метод: «ПОСТ»,
      тело: JSON.stringify({ тип, категория, количество }),
      заголовки: { 'Content-Type': 'application/json' }
    })
    .тогда(res => res.текст())
    .тогда(данные => {
      statusDiv.textContent = "Успешно отправлено!";
      document.getElementById('category').value = '';
      document.getElementById('amount').value = '';
      loadSummary();
    })
    .catch(err => {
      statusDiv.textContent = "Ошибка отправки данных.";
    });
  });

  loadSummary();
});
