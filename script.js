const circle = document.getElementById('circle');
const speedDisplay = document.getElementById('speed-display');

let isDragging = false;

circle.addEventListener('dragstart', function (event) {
    isDragging = true;
    // Prevent the default drag behavior
    event.preventDefault();
});

document.addEventListener('dragend', function () {
    isDragging = false;
});

document.addEventListener('dragover', function (event) {
    // Prevent the default behavior to allow drop
    event.preventDefault();
});

document.addEventListener('mousemove', function (event) {
    if (isDragging) {
        const rect = circle.parentElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const centerX = rect.width / 2;
        const centerY = rect.height; // bottom of the SVG
        const radius = rect.width / 2 - 10; // Adjust the radius as needed

        if (x >= 10 && x <= rect.width - 10) {
            const adjustedX = x;
            const adjustedY = centerY - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - centerX), 2));

            circle.style.left = `${adjustedX}px`;
            circle.style.top = `${adjustedY}px`;

            const distance = (x - 10) / (rect.width - 20) * 100; // Normalize to 0-100 range
            const speed = Math.min(Math.max(0, distance), 100);

            speedDisplay.textContent = `Speed: ${Math.round(speed)}%`;
        }
    }
});
