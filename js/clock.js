document.getElementById('start').addEventListener('click', function() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const display = document.getElementById('display');

    const countdown = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            display.textContent = "Time's up!";
            return;
        }

        totalSeconds--;

        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        display.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
});
