# Documentation - Personal Portfolio Template

## Table of Contents
1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Customization Guide](#customization-guide)
4. [Component Overview](#component-overview)
5. [Styling](#styling)
6. [Deployment](#deployment)

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm, yarn, or pnpm package manager

### Installation Options

**Option 1: Development Setup (Recommended)**
1. **Extract the template files** to your desired folder
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

**Option 2: Quick Preview (Production Build)**
1. **Extract the template files** to your desired folder
2. **Install dependencies and build**:
   ```bash
   npm install
   npm run build
   
   # or
   yarn install
   yarn build
   
   # or
   pnpm install
   pnpm build
   ```

3. **Install serve globally** (if not already installed):
   ```bash
   npm install -g serve
   ```

4. **Serve the built files**:
   ```bash
   serve -s dist
   ```

5. **Open your browser** and visit the URL shown in terminal (usually `http://localhost:3000`)

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist/` folder ready for deployment.

## Project Structure

```
src/
├── components/          # React components
│   ├── projects/       # Project-related components
│   ├── Navigation.tsx  # Main navigation
│   ├── HeroContent.tsx # Homepage hero
│   └── ...
├── hooks/              # Custom React hooks
├── data/               # Data and configurations
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component
```

## Customization Guide

### 1. Personal Information

**Update Navigation Brand:**
Edit `src/components/Navigation.tsx`:
```tsx
<p className="text-sm tracking-widest text-neutral-500">YOUR NAME</p>
```

**Update Hero Content:**
Edit `src/components/HeroContent.tsx`:
- Change name, title, and description
- Update social media links

### 2. Projects Data

Edit `src/data/projectData.ts`:
```typescript
export const projects = [
  {
    id: '1',
    title: 'Your Project Title',
    description: 'Your project description',
    image: 'path/to/your/image.jpg',
    category: 'Your Category',
    tags: ['tag1', 'tag2'],
    link: 'https://your-project-link.com',
  },
  // Add more projects...
];
```

**Update Categories:**
```typescript
export const categories = [
  'All',
  'Your Category 1',
  'Your Category 2',
  // Add your categories...
];
```

### 3. Colors and Styling

The template uses Tailwind CSS. Main color scheme:
- Background: `bg-black`
- Text: `text-white`, `text-neutral-500`
- Accents: `text-white`, `bg-white/10`

**To change colors:**
Edit `tailwind.config.js` or use Tailwind's color utilities directly in components.

### 4. Images

**Replace placeholder images:**
1. Add your images to `src/data/` or `public/`
2. Update image paths in `projectData.ts`
3. Recommended image sizes:
   - Project images: 800x600px
   - Profile image: 400x400px

### 5. Social Media Links

Update social links in `src/components/Navigation.tsx`:
```typescript
const socialLinks = [
  { Icon: Github, href: 'https://github.com/yourusername' },
  { Icon: Twitter, href: 'https://twitter.com/yourusername' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
];
```

### 6. Contact Information

Edit `src/components/ContactSection.tsx`:
- Update email address
- Update contact form
- Update location/bio text

## Component Overview

### Core Components

- **App.tsx**: Main application with page routing
- **Navigation.tsx**: Header navigation with mobile menu
- **HeroContent.tsx**: Homepage hero section
- **ProjectsSection.tsx**: Projects page with filtering
- **AboutSection.tsx**: About page content
- **ContactSection.tsx**: Contact page and form

### Project Components

- **ProjectCard.tsx**: Individual project card
- **ProjectGrid.tsx**: Projects grid layout
- **ProjectFilters.tsx**: Category filter buttons

### Utility Components

- **BackgroundEffects.tsx**: Animated background
- **PageTransition.tsx**: Page transition animations
- **Loader.tsx**: Loading screen

## Styling

The template uses:
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For animations
- **Custom CSS**: Minimal additional styles

**Key styling patterns:**
- Dark theme with neutral colors
- Glassmorphism effects (`backdrop-blur`)
- Smooth transitions
- Responsive design (mobile-first)

## Deployment

### Netlify (Recommended)
1. Connect your Git repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Connect your Git repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual Deployment
1. Run `npm run build`
2. Upload `dist/` folder contents to your web server

## Support

For questions or issues:
1. Check this documentation
2. Review the code comments
3. Contact through Envato profile

## Version History

**v1.0.0**
- Initial release
- React 18 + TypeScript
- Mobile responsive design
- Project filtering system
- Dark theme with animations
