# Sunyani Fashion Designers Directory

A modern web application to track and discover fashion designers in Sunyani, Ghana. Built with React and featuring a beautiful, responsive UI.

## 🎨 Features

- **Designer Directory**: Browse all fashion designers in Sunyani
- **Search & Filter**: Find designers by name, specialty, or location
- **Detailed Profiles**: View comprehensive information about each designer
- **Add New Designers**: Submit new designer information to the directory
- **Contact Integration**: Direct phone calls and email links
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Local Storage**: Data persists between sessions
- **Modern UI**: Beautiful interface with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sunyani-fashion-designers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 📱 Usage

### Browsing Designers
- View all designers on the home page
- Use the search bar to find specific designers
- Filter by specialty using the dropdown menu
- Click on any designer card to view detailed information

### Adding New Designers
1. Click "Add New Designer" from the navigation or home page
2. Fill out the comprehensive form with designer information
3. Include contact details, services offered, and experience
4. Submit to add the designer to the directory

### Designer Details
- View full profile information
- See contact details with direct call/email links
- Browse services offered
- View experience and ratings

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: Local Storage

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── DesignerList.js    # Main listing page
│   ├── DesignerCard.js    # Individual designer cards
│   ├── DesignerDetail.js  # Detailed designer view
│   └── AddDesigner.js     # Add new designer form
├── context/
│   └── DesignerContext.js # State management
├── App.js                 # Main app component
└── index.js              # App entry point
```

## 🎯 Key Features

### Search & Filter
- Real-time search across designer names, specialties, and locations
- Filter by specialty categories
- Dynamic result counting

### Designer Profiles
- Professional photos and descriptions
- Contact information with direct action buttons
- Service listings and experience details
- Star ratings and reviews

### Form Validation
- Comprehensive form validation for adding new designers
- Real-time error feedback
- Required field validation
- Email and phone number format validation

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 Design System

### Colors
- Primary: Orange theme (#f2750a)
- Secondary: Gray scale
- Accent: Blue for actions

### Typography
- Clean, modern font stack
- Responsive text sizing
- Clear hierarchy

### Components
- Consistent card design
- Hover effects and transitions
- Loading states and animations

## 📊 Sample Data

The app comes with sample designer data including:
- Traditional African Wear specialists
- Contemporary fashion designers
- Bridal and formal wear experts
- Men's fashion designers
- Children's clothing specialists

## 🔧 Customization

### Adding New Specialties
Edit the specialties array in `AddDesigner.js` to include new categories.

### Styling Changes
Modify `tailwind.config.js` to customize the color scheme and design tokens.

### Data Structure
The designer object structure:
```javascript
{
  id: number,
  name: string,
  specialty: string,
  location: string,
  phone: string,
  email: string,
  experience: string,
  rating: number,
  description: string,
  services: string[],
  image: string
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built for the Sunyani fashion community
- Inspired by local artisans and designers
- Powered by modern web technologies

---

**Sunyani Fashion Designers Directory** - Connecting local talent with the community! 🧵✨ 