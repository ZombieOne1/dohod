document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }

  function loadSummary() {
    fetch('https://script.google.com/macros/s/AKfycbzWVSvH6HuaB6Qyw5D_YZ4NsxwMmW3esLZxHQfuGECyzzFA66873Br1T0uAq50m1xm8/exec')
      .then(res => res.json())
      .then(data => {
        const summary = `
          Доход: <b>${data.income.toFixed(2)} ₽</b><br>
          Расход: <b>${data.expense.toFixed(2)} ₽</b><br>
          Баланс: <b>${data.balance.toFixed(2)} ₽</b>
        `;
        document.getElementById('summary').innerHTML = summary;

        let entriesHtml = '<h3>Последние записи</h3>';
        data.entries.forEach(e => {
          entriesHtml += `<div>${e.date} — ${e.type}: ${e.category} — ${e.amount} ₽</div>`;
        });

        document.getElementById('recent').innerHTML = entriesHtml;
      });
  }

  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', () => {
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const statusDiv = document.getElementById('status');

    if (!category || !amount) {
      statusDiv.textContent = "Заполните все поля.";
      return;
    }

    fetch('https://script.google.com/macros/s/AKfycbzWVSvH6HuaB6Qyw5D_YZ4NsxwMmW3esLZxHQfuGECyzzFA66873Br1T0uAq50m1xm8/exec', {
      method: 'POST',
      body: JSON.stringify({ type, category, amount }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.text())
    .then(data => {
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
