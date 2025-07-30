# Blench Website Project Context

## Project Overview
- NFT project website
- One-page website with many animations
- Navbar links navigate to specific sections/divs within the same page (not separate pages)
- Focus on smooth scrolling and animations between sections

## Design System

### Color Palette
**STRICT**: Only use BLACK-WHITE-RED colors throughout the project
- **Black**: #000000 (primary text, borders, backgrounds)
- **White**: #ffffff (backgrounds, text on dark areas)
- **Red**: #ff0000 (accent color, hover states, emphasis)
- **Gray**: #666666 (secondary text only)

### Component Structure
- Each component has its own folder with CSS file
- Styles are separated: component-specific CSS in component folders, global styles in index.css
- Component folder structure: `components/component-name/ComponentName.jsx` and `component-name.css`

### Layout Sections
1. **Intro Animation**: 5-second video with background music that loops
2. **Carousel Section**: 3D image carousel with navigation
3. **About Section**: Image left, text right layout
4. **Team Section**: Grid of team member cards
5. **Contact Section**: Text left, image right layout (opposite of about)

## Key Technical Notes
- Single page application structure
- Navigation should use anchor links or smooth scroll to sections
- Heavy emphasis on animations and visual effects
- Target sections will be identified by IDs or refs for navigation
- Responsive design with breakpoints: 1024px, 768px, 480px, 320px
- Main content container: 60% width with frozen video background

## File Locations
- Team photos: `/team/[name].png` or `/team/[name].webp`
- Slider photos: `/slider-photos/[number].jpg`
- About image: `/about-us.png`
- Contact image: `/contact-image.jpg`
- Intro video: `/intro-video.mp4`
- Background music: `/background-song.mp3`