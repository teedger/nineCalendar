// Nine Calendar Data - English names for professional design
const nineCalendar = {
    1: {
        titleMn: "Нэрмэл архи хөлдөнө",
        titleEn: "Nine of Ice",
        icon: "❄️",
        phase: "Extreme Cold"
    },
    2: {
        titleMn: "Хорз архи хөлдөнө",
        titleEn: "Nine of Frost",
        icon: "❄️",
        phase: "Deep Freeze"
    },
    3: {
        titleMn: "Гунан үхрийн эвэр хуга хөлдөнө",
        titleEn: "Nine of Cold",
        icon: "🔺",
        phase: "Bitter Cold"
    },
    4: {
        titleMn: "Дөнөн үхрийн эвэр хуга хөлдөнө",
        titleEn: "Nine of Deep Winter",
        icon: "❄️",
        phase: "Deep Winter"
    },
    5: {
        titleMn: "Тавьсан будаа хөлдөхгүй",
        titleEn: "Nine of Thaw",
        icon: "💧",
        phase: "Early Thaw"
    },
    6: {
        titleMn: "Зурайсан зам гарна",
        titleEn: "Nine of Melting",
        icon: "🌊",
        phase: "Ice Melting"
    },
    7: {
        titleMn: "Довын толгой борлоно",
        titleEn: "Nine of Growth",
        icon: "🌱",
        phase: "New Growth"
    },
    8: {
        titleMn: "Нал, шал болно",
        titleEn: "Nine of Mud",
        icon: "🌍",
        phase: "Muddy Season"
    },
    9: {
        titleMn: "Ерийн дулаан болно",
        titleEn: "Nine of Warmth",
        icon: "☀️",
        phase: "Spring Warmth"
    }
};

// Calculate current Nine period
function calculateNinePeriod() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    // Nine starts on December 22nd each year
    let nineStartDate = new Date(currentYear, 11, 22);

    // If today is before December 22nd, check if we're in the Nine from last year
    if (today < nineStartDate) {
        nineStartDate = new Date(currentYear - 1, 11, 22);
    }

    // Calculate days difference from Nine start
    const timeDiff = today - nineStartDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Check if we're in December before the 22nd
    if (month === 11 && date < 22) {
        const daysUntilStart = 22 - date;
        return {
            status: 'before',
            daysUntilStart: daysUntilStart
        };
    }

    // Check if we're during the Nine period (81 days starting Dec 22)
    if (daysPassed >= 0 && daysPassed < 81) {
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

    // After Nine ends
    if (month >= 2 && month <= 4) {
        return { status: 'spring' };
    } else if (month >= 5 && month <= 7) {
        return { status: 'summer' };
    } else if (month >= 8 && month <= 10) {
        return { status: 'autumn' };
    }

    return { status: 'before', daysUntilStart: 0 };
}

// Format date for display
function formatDate(date, nineNumber) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();

    // For the third nine, we might cross into next year
    if (nineNumber === 3 && date.getMonth() === 0) {
        return `${month} ${day} - ${date.getFullYear()}`;
    }

    return `${month} ${day}`;
}

// Calculate dates for each nine period
function calculateNineDates(nineStartDate) {
    const nineDates = {};

    for (let i = 1; i <= 9; i++) {
        const startDay = (i - 1) * 9;
        const endDay = i * 9 - 1;

        const startDate = new Date(nineStartDate);
        startDate.setDate(startDate.getDate() + startDay);

        const endDate = new Date(nineStartDate);
        endDate.setDate(endDate.getDate() + endDay);

        nineDates[i] = {
            start: formatDate(startDate, i),
            end: formatDate(endDate, i)
        };
    }

    return nineDates;
}

// Update the UI
function updateUI() {
    const result = calculateNinePeriod();
    const today = new Date();
    const currentYear = today.getFullYear();
    let nineStartDate = new Date(currentYear, 11, 22);

    if (today < nineStartDate) {
        nineStartDate = new Date(currentYear - 1, 11, 22);
    }

    const nineDates = calculateNineDates(nineStartDate);

    // Update the three visible nine cards (show current or first 3)
    let displayNines = [1, 2, 3]; // Default to first three

    if (result.status === 'during') {
        // Show current nine and surrounding ones
        const currentNine = result.nine;
        if (currentNine === 1) {
            displayNines = [1, 2, 3];
        } else if (currentNine === 9) {
            displayNines = [7, 8, 9];
        } else {
            displayNines = [currentNine - 1, currentNine, currentNine + 1];
        }
    }

    // Update nine cards
    displayNines.forEach((nineNum, index) => {
        const cardIndex = index + 1;
        const data = nineCalendar[nineNum];
        const dates = nineDates[nineNum];

        const nameEl = document.getElementById(`nine-${cardIndex}-name`);
        const datesEl = document.getElementById(`nine-${cardIndex}-dates`);
        const card = document.querySelector(`.nine-card[data-nine="${cardIndex}"]`);
        const iconEl = card.querySelector('.nine-icon');
        const labelEl = card.querySelector('.nine-label');

        if (nameEl) nameEl.textContent = data.titleEn;
        if (datesEl) datesEl.textContent = `${dates.start} - ${dates.end}`;
        if (iconEl) iconEl.textContent = data.icon;

        // Update label text
        const nineNames = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth'];
        if (labelEl) labelEl.textContent = `${nineNames[nineNum - 1]} Nine:`;

        // Highlight current nine
        if (result.status === 'during' && nineNum === result.nine) {
            card.style.background = 'rgba(255, 255, 255, 0.98)';
            card.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.15)';
            card.style.border = '2px solid rgba(212, 165, 116, 0.5)';
        } else {
            card.style.background = 'rgba(255, 255, 255, 0.95)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            card.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        }
    });

    // Update status card
    const currentNineEl = document.getElementById('current-nine');
    const currentPhaseEl = document.getElementById('current-phase');
    const phaseIconEl = document.getElementById('phase-icon');

    if (result.status === 'during') {
        const data = nineCalendar[result.nine];
        const nineNames = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth'];

        currentNineEl.innerHTML = `${nineNames[result.nine - 1]} Nine,<br />Day ${result.dayInNine}`;
        currentPhaseEl.textContent = data.phase;
        phaseIconEl.textContent = data.icon;
    } else if (result.status === 'before') {
        currentNineEl.innerHTML = `Starting Soon<br />${result.daysUntilStart} Days`;
        currentPhaseEl.textContent = 'Before Nine';
        phaseIconEl.textContent = '⏳';
    } else if (result.status === 'spring') {
        currentNineEl.innerHTML = 'Spring<br />Season';
        currentPhaseEl.textContent = 'After Nine';
        phaseIconEl.textContent = '🌸';
    } else if (result.status === 'summer') {
        currentNineEl.innerHTML = 'Summer<br />Season';
        currentPhaseEl.textContent = 'Hot Days';
        phaseIconEl.textContent = '☀️';
    } else if (result.status === 'autumn') {
        currentNineEl.innerHTML = 'Autumn<br />Season';
        currentPhaseEl.textContent = 'Golden Days';
        phaseIconEl.textContent = '🍂';
    }
}

// Update footer date
function updateFooterDate() {
    const footerDateElement = document.getElementById('footer-date');
    const today = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };

    const dateString = today.toLocaleDateString('en-US', options);
    footerDateElement.textContent = dateString;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    updateFooterDate();

    // Update every hour
    setInterval(updateUI, 3600000);

    // Update date at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight - now;

    setTimeout(() => {
        updateFooterDate();
        setInterval(updateFooterDate, 86400000);
    }, msUntilMidnight);
});
