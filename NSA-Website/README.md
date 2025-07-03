# NSA Network - Standalone Website

A comprehensive platform for discovering and connecting with Nepali Student Associations (NSA) across American universities.

## Features

### 🏠 **Home Page**
- Hero section with animated statistics
- Floating visual elements
- Quick access to search and map features
- Call-to-action buttons

### 🔍 **Advanced Search & Filtering**
- Real-time search by university name, NSA name, or location
- State-based filtering
- Multiple sorting options (Name A-Z, Name Z-A, State, Social Media Count)
- Dropdown autocomplete for universities

### 📊 **Multiple View Modes**
- **Grid View**: Card-based layout with social media links
- **List View**: Compact list format for easy scanning
- **Map View**: Interactive map showing NSA locations across the US

### 🗺️ **Interactive Map**
- Geographic visualization of all NSA chapters
- Click markers for detailed information
- Responsive map controls
- State-based clustering

### 📱 **Social Media Integration**
- Direct links to all social platforms:
  - Instagram
  - Facebook
  - YouTube
  - TikTok
  - LinkedIn
  - Twitter/X
  - Discord
  - GroupMe
  - LinkTree
  - Website

### 📈 **Statistics Dashboard**
- Total number of universities
- Number of states covered
- Total NSA chapters
- Real-time updates based on data

### 🏆 **Popular Universities Section**
- Highlights most active NSA chapters
- Based on social media presence
- Quick access to top communities

### 📝 **NSA Submission Form**
- Modal-based submission interface
- Form validation
- Contact information collection
- Social media link submission

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Smooth animations and transitions
- Modern color scheme and typography
- Accessibility features

## Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Leaflet.js**: Interactive mapping
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter)

## File Structure

```
NSA-Website/
├── index.html          # Main website page
├── styles.css          # Comprehensive styling
├── script.js           # JavaScript functionality
├── nsa_data.json       # NSA data source
└── README.md           # This documentation
```

## Data Structure

The website loads NSA data from `nsa_data.json` with the following structure:

```json
{
  "name": "NSA Chapter Name",
  "university": "University Name",
  "location": "City, State",
  "email": "contact@email.com",
  "phone": "+1-234-567-8900",
  "president": "President Name",
  "instagram": "https://instagram.com/...",
  "facebook": "https://facebook.com/...",
  "youtube": "https://youtube.com/...",
  "tiktok": "https://tiktok.com/...",
  "linkedin": "https://linkedin.com/...",
  "twitter": "https://twitter.com/...",
  "discord": "https://discord.com/...",
  "groupme": "https://groupme.com/...",
  "linktree": "https://linktr.ee/...",
  "website": "https://website.com/..."
}
```

## Key Features

### Search Functionality
- Real-time filtering as you type
- Multiple search criteria (university, NSA name, location)
- State-based filtering
- Smart sorting options

### Map Integration
- Interactive map using Leaflet.js
- Automatic geocoding of locations
- Popup information for each NSA
- Responsive map controls

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Adaptive layouts

### Performance
- Lazy loading of map markers
- Efficient data filtering
- Optimized animations
- Minimal dependencies

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Usage

1. **Open the website**: Navigate to `NSA-Website/index.html`
2. **Search for NSAs**: Use the search bar to find specific universities
3. **Filter by state**: Use the state dropdown to narrow results
4. **Switch views**: Toggle between grid, list, and map views
5. **Explore map**: Click on map markers for detailed information
6. **Submit new NSA**: Use the "Add NSA" button to submit new chapters

## Customization

### Adding New Features
- Extend the `NSAWebsite` class in `script.js`
- Add new CSS classes in `styles.css`
- Update the HTML structure in `index.html`

### Styling
- Modify CSS custom properties in `:root`
- Update color schemes and typography
- Adjust animations and transitions

### Data Management
- Update `nsa_data.json` with new entries
- Modify data structure as needed
- Add new social media platforms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the FUSN (Foreign University Student Network) platform.

## Support

For questions or support, contact:
- Email: contact@nsanetwork.org
- GitHub Issues: [Repository Issues]

---

Built with ❤️ for the Nepali student community in America. 