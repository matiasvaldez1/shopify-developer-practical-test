# Shopify Theme Development - Matias Valdez

## Overview

For this challenge, given the limited time, I was able to modify the general layout of the footer, update the styling in the header and homepage, and add two of the Figma sections to the homepage. I also created a set of different products and collections to fulfill the requirements of the sections.

If I had more time, I would continue working on completing the section functionalities (such as the card components) and ensuring that everything matches the Figma design precisely, as it is still far from that at the moment.

## Key Modifications

### 🎠 Carousel & Hero Section
- **Mobile enhancements**: Horizontal scrollable collections grid with custom black scrollbar

### 📱 Mobile Experience
- Implemented horizontal scrolling for collections on mobile devices
- Added custom scrollbar styling (thin black scrollbar with transparent background)
- Improved responsive breakpoints and card layouts

### ♿ Accessibility Features
- Full WCAG 2.1 AA compliance for carousel components
- Keyboard navigation support (arrow keys, home/end, spacebar)
- Proper focus management and screen reader announcements

## Modified Files
- `sections/splash-hero.liquid` - Collection picker integration and carousel accessibility
- `sections/splash-curated-cases.liquid` - Tabbed collections with accessibility features
- `sections/footerliquid`ctions with accessibility features
- `assets/splash-hero.css` - Mobile scroll styling and responsive improvements
- `assets/splash-curated-cases.css` - Carousel positioning and scrollbar styling
- `templates/index.json` - Template validation fixes and section updates

## Development Commands Used
```bash
shopify theme dev    # Start development server
shopify theme push   # Deploy to theme
shopify theme pull   # Pull theme changes
```