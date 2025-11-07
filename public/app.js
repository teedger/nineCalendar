// Nine Calendar Data
const nineCalendar = {
    1: {
        title: "Нэрмэл архи хөлдөнө",
        description: "Эхний ес: Нарийн хагарсан архи хүртэл хөлддөг үе. Өвлийн хамгийн хүйтэн үе эхэллээ.",
        animation: "extreme-cold"
    },
    2: {
        title: "Хорз архи хөлдөнө",
        description: "Хоёрдугаар ес: Хүчтэй архи хөлдөх үе. Хүйтэн улам хүчтэй болж байна.",
        animation: "harsh-cold"
    },
    3: {
        title: "Гунан үхрийн эвэр хуга хөлдөнө",
        description: "Гуравдугаар ес: Гурван настай үхрийн эвэр хүртэл хөлдөх үе.",
        animation: "deep-freeze"
    },
    4: {
        title: "Дөнөн үхрийн эвэр хуга хөлдөнө",
        description: "Дөрөвдүгээр ес: Дөрвөн настай үхрийн эвэр хүртэл хөлдөх үе. Хүйтэн цаг улам эрчимждэг.",
        animation: "bitter-cold"
    },
    5: {
        title: "Тавьсан будаа хөлдөхгүй",
        description: "Тавдугаар ес: Тавьсан будаа хөлдөхөө больж эхэллээ. Дулаан эхлэх шинж.",
        animation: "thawing"
    },
    6: {
        title: "Зурайсан зам гарна",
        description: "Зургаадугаар ес: Мөсөнд үлдсэн зам тодорхой харагдах болсон. Хаврын урьдчилсан шинж.",
        animation: "ice-melting"
    },
    7: {
        title: "Довын толгой борлоно",
        description: "Долоодугаар ес: Довын толгой цайж, шинэ нахиа гарч эхлэх үе.",
        animation: "new-growth"
    },
    8: {
        title: "Нал, шал болно",
        description: "Наймдугаар ес: Газар нь нал, шал мэт болж эхлэх үе. Хавар ойртож байна.",
        animation: "muddy-season"
    },
    9: {
        title: "Ерийн дулаан болно",
        description: "Есдүгээр ес: Ердийн дулаан цаг ирсэн. Хавар эхэллээ!",
        animation: "spring-warmth"
    }
};

// Mongolian landscape images from Unsplash (free high-quality images)
const landscapeImages = [
    'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1920&q=80', // Mongolian steppe
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80', // Mountains
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Mountain landscape
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Snow mountains
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80', // Vast plains
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Sunset mountains
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80', // Rolling hills
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80', // Nature vista
];

// Alternative Pexels images (specific Mongolian/Asian steppe landscapes)
const alternativeImages = [
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

let currentImageIndex = 0;
let backgroundInterval = null;

// Calculate current Nine period
function calculateNinePeriod() {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Nine starts on December 22nd each year
    let nineStartDate = new Date(currentYear, 11, 22); // Month is 0-indexed, 11 = December

    // If today is before December 22nd, check if we're in the Nine from last year
    if (today < nineStartDate) {
        nineStartDate = new Date(currentYear - 1, 11, 22);
    }

    // Calculate days difference
    const timeDiff = today - nineStartDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Determine which period we're in
    if (daysPassed < 0) {
        // Before Nine starts
        const daysUntilStart = Math.abs(daysPassed);
        return {
            status: 'before',
            daysUntilStart: daysUntilStart
        };
    } else if (daysPassed < 81) {
        // During Nine (81 days total)
        const currentNine = Math.floor(daysPassed / 9) + 1;
        const dayInCurrentNine = daysPassed % 9;
        const daysRemainingInNine = 8 - dayInCurrentNine;

        return {
            status: 'during',
            nine: currentNine,
            dayInNine: dayInCurrentNine + 1,
            daysRemaining: daysRemainingInNine,
            totalDaysPassed: daysPassed
        };
    } else {
        // After Nine ends
        return {
            status: 'after'
        };
    }
}

// Create animations for each Nine period
function createAnimation(animationType) {
    const container = document.getElementById('nine-animation');
    container.innerHTML = '';

    switch(animationType) {
        case 'extreme-cold':
        case 'harsh-cold':
        case 'deep-freeze':
        case 'bitter-cold':
            // Falling snowflakes
            for (let i = 0; i < 15; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.textContent = '❄';
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
                snowflake.style.animationDelay = (Math.random() * 2) + 's';
                snowflake.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
                container.appendChild(snowflake);
            }
            break;

        case 'thawing':
            // Ice crystals
            for (let i = 0; i < 5; i++) {
                const crystal = document.createElement('div');
                crystal.className = 'ice-crystal';
                crystal.style.left = (i * 20 + 10) + '%';
                crystal.style.top = Math.random() * 80 + '%';
                crystal.style.animationDelay = (i * 0.3) + 's';
                container.appendChild(crystal);
            }
            break;

        case 'ice-melting':
            // Water drops
            const drops = '💧💦💧💦💧';
            for (let i = 0; i < drops.length; i++) {
                const drop = document.createElement('div');
                drop.className = 'snowflake';
                drop.textContent = drops[i];
                drop.style.left = (i * 20 + 10) + '%';
                drop.style.animationDuration = '2s';
                drop.style.animationDelay = (i * 0.2) + 's';
                container.appendChild(drop);
            }
            break;

        case 'new-growth':
            // Growing plants
            const plants = '🌱🌿🌱🌿🌱';
            for (let i = 0; i < plants.length; i++) {
                const plant = document.createElement('div');
                plant.textContent = plants[i];
                plant.style.position = 'absolute';
                plant.style.left = (i * 20 + 10) + '%';
                plant.style.bottom = '0';
                plant.style.fontSize = '2rem';
                plant.style.animation = 'fadeInUp 1s ease-out forwards';
                plant.style.animationDelay = (i * 0.3) + 's';
                plant.style.opacity = '0';
                container.appendChild(plant);
            }
            break;

        case 'muddy-season':
            // Earth symbols
            const earth = '🌍🌎🌏';
            const earthSymbol = document.createElement('div');
            earthSymbol.textContent = earth[0];
            earthSymbol.style.fontSize = '4rem';
            earthSymbol.style.animation = 'rotate 10s linear infinite';
            container.appendChild(earthSymbol);
            break;

        case 'spring-warmth':
            // Sun rays and warmth
            const sun = document.createElement('div');
            sun.textContent = '☀️';
            sun.style.fontSize = '4rem';
            sun.style.position = 'absolute';
            sun.style.animation = 'nineNumberPulse 2s ease-in-out infinite';
            container.appendChild(sun);

            for (let i = 0; i < 8; i++) {
                const ray = document.createElement('div');
                ray.className = 'sun-ray';
                ray.style.transform = `rotate(${i * 45}deg)`;
                ray.style.transformOrigin = 'center';
                container.appendChild(ray);
            }

            // Warmth waves
            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'warmth-wave';
                wave.style.animationDelay = (i * 0.7) + 's';
                container.appendChild(wave);
            }
            break;
    }
}

// Update background slideshow
function updateBackground() {
    const backgroundDiv = document.getElementById('background-slideshow');
    const allImages = [...landscapeImages, ...alternativeImages];

    backgroundDiv.style.backgroundImage = `url('${allImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
}

// Start background slideshow
function startBackgroundSlideshow() {
    updateBackground();
    if (backgroundInterval) {
        clearInterval(backgroundInterval);
    }
    backgroundInterval = setInterval(updateBackground, 8000); // Change every 8 seconds
}

// Display the current state
function displayCalendar() {
    const result = calculateNinePeriod();

    // Hide loading
    document.querySelector('.loading').style.display = 'none';

    // Hide all content sections
    document.getElementById('nine-info').classList.add('hidden');
    document.getElementById('before-nine').classList.add('hidden');
    document.getElementById('after-nine').classList.add('hidden');

    if (result.status === 'during') {
        // During Nine period - show Nine info
        const nineInfo = document.getElementById('nine-info');
        const data = nineCalendar[result.nine];

        document.getElementById('nine-number').textContent = `${result.nine} ес`;
        document.getElementById('nine-description').textContent = data.description;
        document.getElementById('days-remaining').textContent =
            `${result.dayInNine} дахь өдөр / ${result.daysRemaining} өдөр үлдсэн`;

        createAnimation(data.animation);
        nineInfo.classList.remove('hidden');

        // Stop background slideshow during Nine
        if (backgroundInterval) {
            clearInterval(backgroundInterval);
            backgroundInterval = null;
        }

        // Set a themed background for Nine period
        const backgroundDiv = document.getElementById('background-slideshow');
        backgroundDiv.style.backgroundImage = "url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80')";

    } else if (result.status === 'before') {
        // Before Nine - show countdown and landscapes
        const beforeNine = document.getElementById('before-nine');
        const countdownDiv = document.getElementById('countdown');

        countdownDiv.textContent = `${result.daysUntilStart} өдрийн дараа эхэлнэ`;
        beforeNine.classList.remove('hidden');

        // Start landscape slideshow
        startBackgroundSlideshow();

    } else {
        // After Nine - show completion message and landscapes
        document.getElementById('after-nine').classList.remove('hidden');

        // Start landscape slideshow
        startBackgroundSlideshow();
    }
}

// Initialize the calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCalendar();

    // Update every hour
    setInterval(displayCalendar, 3600000);
});
