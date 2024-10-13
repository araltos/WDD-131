document.getElementById('credit-card-form').addEventListener('submit', function(e) {
    e.preventDefault();

    document.getElementById('error-message').innerText = '';

    const name = document.getElementById('name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiration = document.getElementById('expiration').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!name) {
        displayError('Cardholder name is required.');
        return;
    }

    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        displayError('Please enter a valid 16-digit card number.');
        return;
    }

    const today = new Date();
    const [month, year] = expiration.split('/').map(Number);
    const expirationDate = new Date(`20${year}`, month - 1);

    if (expirationDate < today) {
        displayError('The card has expired.');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        displayError('Please enter a valid CVV (3 digits).');
        return;
    }

    alert('Payment submitted successfully!');
});


function displayError(message) {
    document.getElementById('error-message').innerText = message;
}
