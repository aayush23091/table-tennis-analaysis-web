# TableSync Analytics - Professional Table Tennis Dashboard

A cutting-edge table tennis analytics dashboard built with React, Tailwind CSS, and Recharts. Features interactive charts, AI-powered insights, and real-time performance metrics with a stunning glassmorphism design.

## 🏆 Technical Highlights

- **React + Tailwind CSS** - Modern, maintainable code with utility-first styling
- **Recharts Library** - Professional interactive charts (Line, Bar, Radar)
- **Fully Responsive** - Perfect on mobile, tablet, and desktop
- **Animated Components** - Staggered fade-in effects for tables and insights
- **Custom Tooltips** - Styled chart tooltips matching the theme
- **Hover States** - Every element has delightful micro-interactions
- **Performance Optimized** - React hooks for efficient rendering

## ✨ Key Features

### 📊 Interactive Charts
- **Age Performance Line Chart** - Track performance across different age brackets
- **Playing Style Bar Chart** - Compare win rates by playing style (Offensive, All-Round, Defensive, Counter, Blocker)
- **Tournament Radar Chart** - Multi-dimensional analysis across tournament levels (Elite, International, National, Regional, Club)

### 🏆 Animated Rankings Table
- Gold/Silver/Bronze badges for top 3 players
- Animated progress bars showing win rates
- Staggered row animations on load
- Player avatars with gradient backgrounds

### 💡 AI Insights Panel
- Data-driven recommendations with smooth animations
- Service training priority analysis
- Peak performance age identification
- Playing style effectiveness metrics

### 📈 Real-time Stats
- Performance metrics with trend indicators
- Service win rate tracking
- Average rally length analysis
- Smash success rate monitoring

### 🎯 Custom Tooltips
- Beautiful hover tooltips on all charts
- Gradient-styled information panels
- Real-time data display

### ⚡ Glassmorphism Cards
- Modern frosted glass effect throughout
- Gradient borders and backgrounds
- Hover animations and transitions

## 🎨 Design Choices

- **Bold Emerald/Cyan Gradient Scheme** - Instead of typical purple themes
- **Professional Monospace Fonts** - JetBrains Mono for data display
- **Asymmetric Layouts** - Overlap effects and dynamic positioning
- **Animated Background Orbs** - For depth and visual interest
- **High Contrast** - Accessibility-focused design
- **No Generic Fonts** - Avoided Inter and system fonts

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
table-tennis-analytics/
├── index.html              # Main HTML template
├── index.js               # Main React component
├── src/
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind CSS and custom styles
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite build configuration
└── README.md            # This file
```

## 📊 Data Structure

The dashboard uses realistic sample data including:

- **Player Statistics**: 8 elite players with comprehensive metrics
- **Age Performance Data**: Performance ratings across ages 12-22
- **Playing Style Data**: Win rates for 5 different playing styles
- **Tournament Analysis**: Multi-level tournament performance data
- **AI Insights**: Data-driven recommendations and analysis

## 🎯 Performance Features

- **Code Splitting**: Optimized bundle sizes with manual chunks
- **Lazy Loading**: Components load as needed
- **Memoization**: Efficient re-rendering with React hooks
- **Optimized Charts**: Smooth animations and responsive design
- **Fast Loading**: Optimized assets and minimal dependencies

## 🌟 Customization

### Colors
Edit `tailwind.config.js` to modify the emerald/cyan gradient theme:

```javascript
colors: {
  'emerald': {
    400: '#34d399', // Primary accent
    500: '#10b981', // Main color
    // ... more shades
  },
  'cyan': {
    400: '#22d3ee', // Secondary accent
    500: '#06b6d4', // Secondary main
    // ... more shades
  }
}
```

### Data
Update the `DASHBOARD_DATA` object in `index.js` with your own:
- Player statistics and rankings
- Performance metrics
- Chart data points
- AI insights and recommendations

### Fonts
Modify the font imports in `index.html` and update `tailwind.config.js`:

```javascript
fontFamily: {
  'mono': ['Your-Font-Name', 'monospace'],
  'sans': ['Your-Sans-Font', 'sans-serif'],
}
```

## 🔧 Development

### Adding New Charts
1. Import additional chart types from Recharts
2. Add data to the `DASHBOARD_DATA` object
3. Create new chart components following the existing pattern
4. Add responsive containers and custom tooltips

### Styling Guidelines
- Use Tailwind utility classes for consistency
- Follow the glassmorphism pattern with backdrop blur
- Maintain the emerald/cyan gradient theme
- Ensure responsive design with mobile-first approach
- Add hover states and micro-interactions

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🎨 UI/UX Features

- **Loading States**: Smooth loading animations
- **Hover Effects**: Interactive elements with scale and shadow transitions
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: High contrast ratios and keyboard navigation
- **Performance**: Optimized for fast loading and smooth interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for the excellent charting library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast development server
- [React](https://reactjs.org/) for the powerful UI library

---

**TableSync Analytics** - Professional table tennis performance intelligence platform. Built with ❤️ for data visualization enthusiasts and sports analysts.