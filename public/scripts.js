async function downloadVideo() {
    const url = document.getElementById('url').value;
    const message = document.getElementById('message');
    message.textContent = '';

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = data.downloadUrl;
        } else {
            message.textContent = data.error;
        }
    } catch (error) {
        message.textContent = 'An error occurred. Please try again.';
    }
}
