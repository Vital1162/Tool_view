function loadContent(page) {
    fetch(page)
        .then(response => {
            // Check if the response is not ok
            if (!response.ok) {
                return response.text().then(errorText => {
                    window.location.href = `./html/error.html?error=${encodeURIComponent(errorText)}`;
                });
            }
            return response.text();
        })
        .then(data => {
            if (data) { // Ensure data exists before processing it
                document.getElementById('main-content').innerHTML = data;

                // Create a script element to load clock.js
                const script = document.createElement('script');
                script.src = './js/clock.js';
                document.body.appendChild(script);
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            window.location.href = `./html/error.html?error=${encodeURIComponent(error.message)}`;
        });
}
