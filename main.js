function loadContent(page) {
    // Check if the browser is offline
    if (!navigator.onLine) {
        console.error('No internet connection. Redirecting to error page.');
        window.location.href = '/html/error.html?error=' + encodeURIComponent('No internet connection');
        return; // Exit the function if offline
    }

    fetch(page)
        .then(response => {
            // Check if the response is not ok
            if (!response.ok) {
                return response.text().then(errorText => {
                    window.location.href = `/html/error.html?error=${encodeURIComponent(errorText)}`;
                });
            }
            return response.text();
        })
        .then(data => {
            if (data) {
                document.getElementById('main-content').innerHTML = data;

                // Create a script element to load clock.js
                const script = document.createElement('script');
                // script.src = 'https://vital1162.github.io/js/clock.js'; // Ensure the path is correct
                script.src = 'https://vital1162.github.io/Tool_view/js/clock.js'
                script.defer = true; // Ensures the script runs after the content is loaded
                document.body.appendChild(script);
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            window.location.href = `/html/error.html?error=${encodeURIComponent(error.message)}`;
        });
}
