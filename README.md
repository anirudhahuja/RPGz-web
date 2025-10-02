# FitnessRPG Landing Page

A modern, responsive landing page for the FitnessRPG mobile application. This website directs users to download the FitnessRPG app from the Google Play Store.

## About FitnessRPG

FitnessRPG is a gamified fitness and nutrition tracking mobile application that transforms your workout journey into an epic RPG adventure. Complete quests, level up your character, and track your nutrition - all while building real-world strength and endurance.

### Key Features

- **RPG Quest System**: Complete fitness quests to gain experience points and level up your character's stats
- **Nutrition Tracking**: Comprehensive food database integration for tracking daily nutrition
- **Character Progression**: Watch your character grow stronger as you achieve fitness milestones
- **Gamified Experience**: Make fitness fun with RPG elements and achievements

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rpgz-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/client` directory.

## Technology Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Bootstrap 5** - UI components and responsive design
- **SCSS** - Advanced styling
- **FontAwesome** - Icons
- **Nx** - Build system and monorepo management

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── app.tsx          # Main landing page component
│   │   └── landing.scss     # Landing page styles
│   ├── assets/              # Images and static assets
│   ├── main.tsx             # Application entry point
│   └── styles.scss          # Global styles
├── project.json             # Nx project configuration
└── webpack.config.js        # Webpack configuration
```

## Deployment

This landing page can be deployed to any static hosting service such as:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Mobile App

The FitnessRPG mobile app is available on:

- **Google Play Store**: [Download FitnessRPG](https://play.google.com/store/apps/details?id=com.fitnessrpg.app)
- **iOS App Store**: Coming Soon

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact us at support@fitnessrpg.com
