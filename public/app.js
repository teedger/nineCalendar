// Nine Calendar Data - will be loaded from JSON
let nineCalendar = {};

// Load nine calendar data from JSON file
async function loadNineData() {
    try {
        const response = await fetch('nine-translation.json');
        const data = await response.json();

        // Transform JSON array format to object format
        for (let key in data) {
            nineCalendar[key] = {
                label: data[key][0],        // "First Nine"
                titleEn: data[key][1],      // "Nine of Ice"
                context: data[key][2],      // Context description
                mongolianScript: data[key][3] // Mongolian script
            };
        }

        return true;
    } catch (error) {
        console.error('Error loading nine-translation.json:', error);
        // Fallback data if JSON fails to load
        nineCalendar = {
            1: { label: "First Nine", titleEn: "Nine of Ice", context: "Traditional milk vodka will freeze", mongolianScript: "ᠨᠢᢉᠡ ᠶᠢᠰᠦ" },
            2: { label: "Second Nine", titleEn: "Nine of Frost", context: "Even quadruple-distilled milk vodka will freeze", mongolianScript: "ᠬᠣᠶᠠᠷ ᠶᠢᠰᠦ" },
            3: { label: "Third Nine", titleEn: "Nine of Immense Cold", context: "A three-year-old cow's horns will freeze", mongolianScript: "ᠭᠤᠷᠪᠠᠨ ᠶᠢᠰᠦ" },
            4: { label: "Fourth Nine", titleEn: "Nine of Deep Winter", context: "A four-year-old cow's horns will freeze", mongolianScript: "ᠳᠥᠷᠪᠡᠨ ᠶᠢᠰᠦ" },
            5: { label: "Fifth Nine", titleEn: "Nine of Thaw", context: "Raw rice left on a plate will no longer freeze", mongolianScript: "ᠲᠠᠪᠤᠨ ᠶᠢᠰᠦ" },
            6: { label: "Sixth Nine", titleEn: "Nine of Defrost", context: "The roads will emerge from under the snow", mongolianScript: "ᠵᠢᠷᠭᠤᠭᠠᠨ ᠶᠢᠰᠦ" },
            7: { label: "Seventh Nine", titleEn: "Nine of Melting", context: "Hilltop snow will melt", mongolianScript: "ᠳᠣᠯᠤᠭᠠᠨ ᠶᠢᠰᠦ" },
            8: { label: "Eighth Nine", titleEn: "Nine of Mud", context: "Footsteps will make squelching sounds in the mud", mongolianScript: "ᠨᠠᠢᠮᠠᠨ ᠶᠢᠰᠦ" },
            9: { label: "Ninth Nine", titleEn: "Nine of Warmth", context: "Spring warmth arrives", mongolianScript: "ᠶᠢᠰᠦᠨ ᠶᠢᠰᠦ" }
        };
        return false;
    }
}

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

    // Update all 9 nine cards
    for (let nineNum = 1; nineNum <= 9; nineNum++) {
        const data = nineCalendar[nineNum];
        const dates = nineDates[nineNum];

        const labelEl = document.getElementById(`nine-${nineNum}-label`);
        const nameEl = document.getElementById(`nine-${nineNum}-name`);
        const contextEl = document.getElementById(`nine-${nineNum}-context`);
        const datesEl = document.getElementById(`nine-${nineNum}-dates`);
        const scriptEl = document.getElementById(`nine-${nineNum}-script`);
        const card = document.querySelector(`.nine-card[data-nine="${nineNum}"]`);

        if (labelEl) labelEl.textContent = data.label;
        if (nameEl) nameEl.textContent = data.titleEn;
        if (contextEl) contextEl.textContent = data.context;
        if (datesEl) datesEl.textContent = `${dates.start} - ${dates.end}`;
        if (scriptEl) scriptEl.textContent = data.mongolianScript;

        // Highlight current nine
        if (card) {
            if (result.status === 'during' && nineNum === result.nine) {
                card.style.background = 'rgba(255, 255, 255, 0.98)';
                card.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.15)';
                card.style.border = '2px solid rgba(212, 165, 116, 0.5)';
            } else {
                card.style.background = 'rgba(255, 255, 255, 0.62)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                card.style.border = '1px solid rgba(255, 255, 255, 0.35)';
            }
        }
    }

    // Update status card
    const currentNineEl = document.getElementById('current-nine');
    const currentPhaseEl = document.getElementById('current-phase');
    const phaseIconEl = document.getElementById('phase-icon');

    if (result.status === 'during') {
        const data = nineCalendar[result.nine];

        currentNineEl.innerHTML = `${data.label},<br />Day ${result.dayInNine}`;
        currentPhaseEl.textContent = data.titleEn;
        phaseIconEl.textContent = '❄️'; // Default icon
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
document.addEventListener('DOMContentLoaded', async () => {
    // Load nine data from JSON first
    await loadNineData();

    // Then initialize the UI
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
