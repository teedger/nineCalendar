# Есийн Тоолол - Mongolian Nine Calendar

A beautiful web application that tracks the traditional Mongolian winter calendar system of the Nine periods (Есийн тоолол).

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

## Features

- **Real-time Period Tracking**: Automatically calculates and displays the current Nine period
- **Beautiful Animations**: Each period has its own unique animation representing the season
- **Traditional Design**: Incorporates traditional Mongolian design elements and colors
- **Rotating Landscapes**: When not in the Nine period, displays beautiful Mongolian landscape images
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
