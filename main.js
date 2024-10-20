function loadContent(page) {
    console.log('Attempting to load content from:', page);

    const validPaths = ['']; // Đây là các path hợp lệ sau Tool_view/, bạn có thể thêm vào nếu có nhiều trang con
    const currentURL = window.location.href;
    const baseURL = 'https://vital1162.github.io/Tool_view/';

    // Lấy phần path sau baseURL
    const path = currentURL.replace(baseURL, '');

    // Kiểm tra xem path có nằm trong danh sách path hợp lệ không
    if (!validPaths.includes(path)) {
        console.error('Invalid path:', path);
        window.location.href = `https://vital1162.github.io/Tool_view/html/Error.html?error=${encodeURIComponent('Invalid path: ' + path)}`;
        return;
    }
    
    // Check if the browser is offline
    if (!navigator.onLine) {
        console.error('No internet connection. Redirecting to error page.');
        window.location.href = 'https://vital1162.github.io/Tool_view/html/Error.html?error=' + encodeURIComponent('No internet connection');
        // return; // Exit the function if offline
    }

    fetch(page)
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                return response.text().then(errorText => {
                    window.location.href = `https://vital1162.github.io/Tool_view/html/Error.html?error=${encodeURIComponent(errorText)}`;
                });

                return null;
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
            window.location.href = `https://vital1162.github.io/Tool_view/html/Error.html?error=${encodeURIComponent(error.message)}`;
        });
}
