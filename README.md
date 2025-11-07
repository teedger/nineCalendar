# Есийн Тоолол - Mongolian Nine Calendar

A beautiful web application that tracks the traditional Mongolian winter calendar system of the Nine periods (Есийн тоолол) and displays year-round seasonal changes.

## About the Nine Periods

In Mongolian tradition, the coldest part of winter is divided into nine periods called "Ес" (Nine), each lasting exactly 9 days, for a total of 81 days. This period begins on December 22nd each year and marks the journey from the depths of winter to the arrival of spring.

### The Nine Periods:

1. **Нэрмэл архи хөлдөнө** - Even diluted alcohol freezes
2. **Хорз архи хөлдөнө** - Strong alcohol freezes
3. **Гунан үхрийн эвэр хуга хөлдөнө** - Three-year-old ox's horns freeze
4. **Дөнөн үхрийн эвэр хуга хөлдөнө** - Four-year-old ox's horns freeze
5. **Тавьсан будаа хөлдөхгүй** - Placed porridge doesn't freeze
6. **Зурайсан зам гарна** - Trails on ice become visible
7. **Довын толгой борлоно** - Hill tops turn gray with new growth
8. **Нал, шал болно** - Ground becomes muddy
9. **Ерийн дулаан болно** - Normal warmth returns - Spring arrives!

## Year-Round Seasonal Tracking

The calendar now displays different seasonal messages throughout the year:

- **December 1-21**: "Ес эхлээгүй байна" (Nine hasn't started yet) - Countdown to winter's coldest period
- **December 22 - March 12 (81 days)**: The Nine Periods - Detailed tracking of each 9-day period
- **March 13 - May 31**: "Хавар ирлээ" (Spring has arrived) - Spring season with blooming flowers
- **June 1 - August 31**: "Аагим зуны цаг" (Hot summer days) - Summer season with bright sun
- **September 1 - November 30**: "Намрын налгар өдрүүд" (Autumn's colorful days) - Autumn with falling leaves

Each season features unique animations and beautiful background images that capture the essence of Mongolian landscapes.

## Features

- **Year-Round Tracking**: Displays the appropriate season and message for any day of the year
- **Real-time Period Tracking**: Automatically calculates and displays the current Nine period during winter
- **Seasonal Animations**: Each season has unique animations (snowflakes, flowers, sun rays, falling leaves)
- **Traditional Design**: Incorporates traditional Mongolian design elements and colors
- **Rotating Landscapes**: Beautiful Mongolian landscape images that change every 8 seconds
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Mongolian Language**: Authentic Mongolian text and descriptions

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nineCalendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
nineCalendar/
├── server.js           # Express server
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling with traditional Mongolian design
│   └── app.js          # Calendar logic and animations
├── package.json
└── README.md
```

## Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Fonts**: Noto Sans Mongolian, Noto Serif
- **Images**: Unsplash & Pexels (free high-quality landscape photos)

## Design Elements

The website incorporates traditional Mongolian cultural elements:

- **Colors**: Gold (#D4AF37), Deep Blue (#1E3A5F), Crimson (#DC143C), Sky Blue (#87CEEB)
- **Patterns**: Traditional Mongolian decorative borders
- **Animations**: Seasonal animations including snowflakes, ice crystals, and spring growth
- **Typography**: Mongolian-friendly fonts for authentic text display

## Customization

You can customize various aspects of the calendar:

- **Start Date**: Modify the start date in `public/app.js` (currently December 22nd)
- **Images**: Add your own landscape images to the `landscapeImages` array in `app.js`
- **Colors**: Adjust CSS variables in `public/styles.css` under `:root`
- **Animations**: Modify or add new animations in the `createAnimation()` function

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!

---

**Хаврын амьсгал хүртэл!** (Until the breath of spring!)
