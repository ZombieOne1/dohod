
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
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

    fetch('https://script.google.com/macros/s/AKfycbw4yfG-UTN3T0iEamScnBr9nLDzA0ha2mQ9YAZAFAnxvnESgEKnlG_PJr8ZcUkRkNG0/exec', {
      method: 'POST',
      body: JSON.stringify({ type, category, amount }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.text())
    .then(data => {
      statusDiv.textContent = "Успешно отправлено!";
      document.getElementById('category').value = '';
      document.getElementById('amount').value = '';
    })
    .catch(err => {
      statusDiv.textContent = "Ошибка отправки данных.";
    });
  });
});
