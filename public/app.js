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

// Calculate current Nine period and season
function calculateNinePeriod() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const month = today.getMonth(); // 0 = January, 11 = December
    const date = today.getDate();

    // Nine starts on December 22nd each year
    let nineStartDate = new Date(currentYear, 11, 22); // Month is 0-indexed, 11 = December

    // If today is before December 22nd, check if we're in the Nine from last year
    if (today < nineStartDate) {
        nineStartDate = new Date(currentYear - 1, 11, 22);
    }

    // Calculate days difference from Nine start
    const timeDiff = today - nineStartDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Check if we're in December before the 22nd
    if (month === 11 && date < 22) {
        // December but before the 22nd
        const daysUntilStart = 22 - date;
        return {
            status: 'before-december',
            daysUntilStart: daysUntilStart
        };
    }

    // Check if we're during the Nine period (81 days starting Dec 22)
    if (daysPassed >= 0 && daysPassed < 81) {
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
    }

    // After Nine ends (around March 13), check which season we're in
    // Spring: After Nine ends until May 31
    // Summer: June 1 - August 31
    // Autumn: September 1 - November 30
    // December 1-21: Before Nine

    if (month >= 2 && month <= 4) {
        // March (2), April (3), May (4) - Spring
        return { status: 'spring' };
    } else if (month >= 5 && month <= 7) {
        // June (5), July (6), August (7) - Summer
        return { status: 'summer' };
    } else if (month >= 8 && month <= 10) {
        // September (8), October (9), November (10) - Autumn
        return { status: 'autumn' };
    }

    // Should not reach here, but just in case
    return { status: 'before-december', daysUntilStart: 0 };
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
        case 'spring':
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

            // Spring flowers
            const flowers = '🌸🌼🌺🌻🌷';
            for (let i = 0; i < flowers.length; i++) {
                const flower = document.createElement('div');
                flower.textContent = flowers[i];
                flower.style.position = 'absolute';
                flower.style.left = (i * 18 + 10) + '%';
                flower.style.bottom = '20%';
                flower.style.fontSize = '2.5rem';
                flower.style.animation = 'fadeInUp 1.5s ease-out forwards';
                flower.style.animationDelay = (i * 0.2) + 's';
                flower.style.opacity = '0';
                container.appendChild(flower);
            }
            break;

        case 'summer':
            // Bright sun
            const summerSun = document.createElement('div');
            summerSun.textContent = '🌞';
            summerSun.style.fontSize = '5rem';
            summerSun.style.position = 'absolute';
            summerSun.style.animation = 'nineNumberPulse 2s ease-in-out infinite';
            container.appendChild(summerSun);

            // Heat waves
            for (let i = 0; i < 5; i++) {
                const heatWave = document.createElement('div');
                heatWave.className = 'warmth-wave';
                heatWave.style.borderColor = '#FFD700';
                heatWave.style.animationDelay = (i * 0.5) + 's';
                container.appendChild(heatWave);
            }

            // Summer elements
            const summerIcons = '🌻☀️🌻';
            for (let i = 0; i < summerIcons.length; i++) {
                const icon = document.createElement('div');
                icon.textContent = summerIcons[i];
                icon.style.position = 'absolute';
                icon.style.left = (i * 30 + 20) + '%';
                icon.style.fontSize = '3rem';
                icon.style.animation = 'rotate 8s linear infinite';
                icon.style.animationDelay = (i * 0.5) + 's';
                container.appendChild(icon);
            }
            break;

        case 'autumn':
            // Falling leaves
            const leaves = '🍂🍁🍂🍁🍂🍁🍂';
            for (let i = 0; i < leaves.length; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'snowflake';
                leaf.textContent = leaves[i];
                leaf.style.left = (i * 14 + 5) + '%';
                leaf.style.animationDuration = (Math.random() * 4 + 3) + 's';
                leaf.style.animationDelay = (Math.random() * 2) + 's';
                leaf.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
                container.appendChild(leaf);
            }

            // Autumn ground decorations
            const groundLeaves = '🍂🍁🌾🍂🍁';
            for (let i = 0; i < groundLeaves.length; i++) {
                const groundLeaf = document.createElement('div');
                groundLeaf.textContent = groundLeaves[i];
                groundLeaf.style.position = 'absolute';
                groundLeaf.style.left = (i * 20 + 5) + '%';
                groundLeaf.style.bottom = '10px';
                groundLeaf.style.fontSize = '2rem';
                groundLeaf.style.animation = 'fadeInUp 1s ease-out forwards';
                groundLeaf.style.animationDelay = (i * 0.3) + 's';
                groundLeaf.style.opacity = '0';
                container.appendChild(groundLeaf);
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
    document.getElementById('spring-season').classList.add('hidden');
    document.getElementById('summer-season').classList.add('hidden');
    document.getElementById('autumn-season').classList.add('hidden');

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

    } else if (result.status === 'before-december') {
        // December but before the 22nd - show countdown and landscapes
        const beforeNine = document.getElementById('before-nine');
        const countdownDiv = document.getElementById('countdown');

        countdownDiv.textContent = `${result.daysUntilStart} өдрийн дараа эхэлнэ`;
        beforeNine.classList.remove('hidden');

        // Start landscape slideshow
        startBackgroundSlideshow();

    } else if (result.status === 'spring') {
        // Spring season - show spring message and animation
        const springBox = document.getElementById('spring-season');
        const animationContainer = document.getElementById('spring-animation');

        // Clear and create spring animation
        animationContainer.innerHTML = '';
        const oldContainer = document.getElementById('nine-animation');
        if (oldContainer) {
            oldContainer.id = 'temp-animation';
        }
        animationContainer.id = 'nine-animation';
        createAnimation('spring');
        animationContainer.id = 'spring-animation';
        if (oldContainer) {
            oldContainer.id = 'nine-animation';
        }

        springBox.classList.remove('hidden');

        // Start landscape slideshow
        startBackgroundSlideshow();

    } else if (result.status === 'summer') {
        // Summer season - show summer message and animation
        const summerBox = document.getElementById('summer-season');
        const animationContainer = document.getElementById('summer-animation');

        // Clear and create summer animation
        animationContainer.innerHTML = '';
        const oldContainer = document.getElementById('nine-animation');
        if (oldContainer) {
            oldContainer.id = 'temp-animation';
        }
        animationContainer.id = 'nine-animation';
        createAnimation('summer');
        animationContainer.id = 'summer-animation';
        if (oldContainer) {
            oldContainer.id = 'nine-animation';
        }

        summerBox.classList.remove('hidden');

        // Start landscape slideshow
        startBackgroundSlideshow();

    } else if (result.status === 'autumn') {
        // Autumn season - show autumn message and animation
        const autumnBox = document.getElementById('autumn-season');
        const animationContainer = document.getElementById('autumn-animation');

        // Clear and create autumn animation
        animationContainer.innerHTML = '';
        const oldContainer = document.getElementById('nine-animation');
        if (oldContainer) {
            oldContainer.id = 'temp-animation';
        }
        animationContainer.id = 'nine-animation';
        createAnimation('autumn');
        animationContainer.id = 'autumn-animation';
        if (oldContainer) {
            oldContainer.id = 'nine-animation';
        }

        autumnBox.classList.remove('hidden');

        // Start landscape slideshow
        startBackgroundSlideshow();

    } else {
        // After Nine - show completion message and landscapes (this shouldn't happen much now)
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
