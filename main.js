function loadContent(page) {
    console.log('Attempting to load content from:', page);

    // // Lấy đường dẫn hiện tại của trang
    // const currentPath = window.location.pathname;

    // // Kiểm tra URL không đúng (dùng biểu thức chính quy để kiểm tra các đường dẫn sai)
    // const validPath = '/Tool_view/';
    // if (!currentPath.includes(validPath)) {
    //     console.warn('Incorrect URL. Redirecting to error page.');
    //     window.location.href = '/html/error.html?error=' + encodeURIComponent('Page not found or URL incorrect');
    //     return;
    // }

    // Check if the browser is offline
    if (!navigator.onLine) {
        console.error('No internet connection. Redirecting to error page.');
        window.location.href = '/html/Error.html?error=' + encodeURIComponent('No internet connection');
        return; // Exit the function if offline
    }

    fetch(page)
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                return response.text().then(errorText => {
                    window.location.href = `/html/Error.html?error=${encodeURIComponent(errorText)}`;
                });
            }
            return response.text();
        })
        .then(data => {
            console.log('Data loaded:', data);
            if (data) {
                document.getElementById('main-content').innerHTML = data;

                const script = document.createElement('script');
                script.src = 'https://vital1162.github.io/Tool_view/js/clock.js';
                script.defer = true;
                document.body.appendChild(script);
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            window.location.href = `/html/Error.html?error=${encodeURIComponent(error.message)}`;
        });
}
