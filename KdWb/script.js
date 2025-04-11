document.addEventListener("DOMContentLoaded", function () {
    // 🎯 Get references to static buttons
    const btnShow = document.getElementById("btnshw"); // Show/hide social links
    const btnMystery = document.getElementById("btnmys"); // Open video
    const btnBackground = document.getElementById("btncbg"); // Change background

    // 🎯 Get references to moving buttons
    const movingButtons = document.querySelectorAll(".social-links"); // The bouncing buttons
    const buttons = document.querySelectorAll(".social-links a"); // The links inside them

    const buttonSize = 100;
    let positions = [];
    let velocities = [];

    const mainBox = document.querySelector('.container');
    const mainBoxRect = mainBox.getBoundingClientRect();

    const area = {
        minX: 0,
        maxX: window.innerWidth - buttonSize,
        minY: 100,
        maxY: window.innerHeight - buttonSize
    };

    function isOverlappingMainBox(x, y) {
        return (
            x + buttonSize > mainBoxRect.left &&
            x < mainBoxRect.right &&
            y + buttonSize > mainBoxRect.top &&
            y < mainBoxRect.bottom
        );
    }

    function getSafePosition() {
        let x, y;
        let isOverlapping;
        do {
            x = Math.random() * (area.maxX - area.minX) + area.minX;
            y = Math.random() * (area.maxY - area.minY) + area.minY;

            isOverlapping = isOverlappingMainBox(x, y);

            for (let pos of positions) {
                const dx = pos.x - x;
                const dy = pos.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < buttonSize) {
                    isOverlapping = true;
                    break;
                }
            }
        } while (isOverlapping);
        return { x, y };
    }

    buttons.forEach((button, index) => {
        let { x, y } = getSafePosition();
        let speedX = (Math.random() - 0.5) * 1;
        let speedY = (Math.random() - 0.5) * 1;

        positions.push({ x, y });
        velocities.push({ speedX, speedY });

        button.style.transform = `translate(${x}px, ${y}px)`;
    });

    function moveButtons() {
        for (let i = 0; i < buttons.length; i++) {
            positions[i].x += velocities[i].speedX;
            positions[i].y += velocities[i].speedY;

            if (positions[i].x < area.minX || positions[i].x > area.maxX) velocities[i].speedX *= -1;
            if (positions[i].y < area.minY || positions[i].y > area.maxY) velocities[i].speedY *= -1;

            if (
                positions[i].x + buttonSize > mainBoxRect.left &&
                positions[i].x < mainBoxRect.right &&
                positions[i].y + buttonSize > mainBoxRect.top &&
                positions[i].y < mainBoxRect.bottom
            ) {
                const overlapLeft = positions[i].x + buttonSize - mainBoxRect.left;
                const overlapRight = mainBoxRect.right - positions[i].x;
                const overlapTop = positions[i].y + buttonSize - mainBoxRect.top;
                const overlapBottom = mainBoxRect.bottom - positions[i].y;

                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                    velocities[i].speedX *= -1;
                } else {
                    velocities[i].speedY *= -1;
                }
            }

            for (let j = i + 1; j < buttons.length; j++) {
                const dx = positions[i].x - positions[j].x;
                const dy = positions[i].y - positions[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < buttonSize) {
                    let tempSpeedX = velocities[i].speedX;
                    let tempSpeedY = velocities[i].speedY;
                    velocities[i].speedX = velocities[j].speedX;
                    velocities[i].speedY = velocities[j].speedY;
                    velocities[j].speedX = tempSpeedX;
                    velocities[j].speedY = tempSpeedY;

                    const angle = Math.atan2(dy, dx);
                    const separationDistance = buttonSize - distance;

                    positions[i].x += Math.cos(angle) * (separationDistance / 2);
                    positions[i].y += Math.sin(angle) * (separationDistance / 2);
                    positions[j].x -= Math.cos(angle) * (separationDistance / 2);
                    positions[j].y -= Math.sin(angle) * (separationDistance / 2);
                }
            }

            buttons[i].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        }

        requestAnimationFrame(moveButtons);
    }

    moveButtons();

    // ✅ Toggle visibility of "social-links" buttons (only moving buttons)
    btnshw.addEventListener("click", function () {
        movingButtons.forEach(link => {
            link.style.display = (link.style.display === "none" || link.style.display === "") ? "block" : "none";
        });
    });

    // ✅ Open an embedded video
    btnmys.addEventListener("click", function () {
        const videoUrl = "https://geo.dailymotion.com/player.html?video=x7m9778";
        const videoPopup = document.createElement("div");
        videoPopup.innerHTML = `
            <div class="video-overlay">
                <div class="video-container">
                    <iframe width="760" height="650" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                    <button class="close-video">X</button>
                </div>
            </div>
        `;
        document.body.appendChild(videoPopup);

        document.querySelector(".close-video").addEventListener("click", function () {
            videoPopup.remove();
        });
    });

    // Select the button element
    btncbg.addEventListener("click", function () {
        const sound = new Audio('pyro.mp3');
            sound.play();
    });


    });

// Sound effect for profile image click
const clickSound = new Audio('owo.mp3');
clickSound.preload = 'auto'; // Ensures faster playback

const profileImage = document.querySelector('.profile-img');
if (profileImage) {
    profileImage.addEventListener('click', () => {
        clickSound.currentTime = 0; // Reset to start
        clickSound.play().catch(e => console.warn("Audio play failed:", e));
    });
}

document.getElementById("panicBtn").addEventListener("click", () => {
    
    document.title = "Totally Google Search";

    document.head.innerHTML = ''; // Remove all <style>, <link>, etc.
    document.body.innerHTML = ''; // Clear all content

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#ffffff';
    document.body.style.overflow = 'hidden';

    const fakeExcel = document.createElement('img');
    fakeExcel.src = 'fakebg.png';
    fakeExcel.alt = 'naughty fucker';
    fakeExcel.style.position = 'fixed';
    fakeExcel.style.top = '0';
    fakeExcel.style.left = '0';
    fakeExcel.style.width = '100vw';
    fakeExcel.style.height = '100vh';
    fakeExcel.style.objectFit = 'cover';
    fakeExcel.style.zIndex = '9999';

    document.body.appendChild(fakeExcel);
});

