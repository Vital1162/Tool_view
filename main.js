function loadContent(page) {
    fetch(page)
        .then(response => {
            // Check if the response is not ok
            if (!response.ok) {
                window.location.href = `/html/error.html?error=${encodeURIComponent(response.text())}`;
                return;
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            // Create a script element to load clock.js
            const script = document.createElement('script');

            script.src = '../js/clock.js';
            document.body.appendChild(script);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            window.location.href = `/html/error.html?error=${encodeURIComponent(error.message)}`;
        });
}
