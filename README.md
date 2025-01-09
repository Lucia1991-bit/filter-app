# [ Product Filter App](https://filter-app-opal.vercel.app/)

**A responsive React application for filtering and displaying products with virtual scrolling functionality.**

## Table of Contents

- [ Product Filter App](#-product-filter-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Product Display](#product-display)
    - [Filter \& Sort Functionality](#filter--sort-functionality)
    - [User Interface](#user-interface)
  - [Project Structure](#project-structure)
  - [Technical Implementation](#technical-implementation)
    - [Custom Hooks](#custom-hooks)
    - [Performance Optimizations](#performance-optimizations)
    - [Responsive Design](#responsive-design)

## Features

### Product Display

- Responsive layout with list view (desktop) and card view (mobile)
- Virtual scrolling for efficient rendering of large product lists
- Loading indicators for smooth user experience

### Filter & Sort Functionality

- Product name search
- Category filtering
- Stock availability filter
- Price range filter
- Price-based sorting (ascending/descending)

### User Interface

- Clean and intuitive design
- Sticky header with toolbars
- Collapsible filter drawer
- Loading states and animations

## Project Structure

```
src/
├── components/
│   ├── product/        # Product listing components
│   │   ├── ProductList.jsx
│   │   ├── ProductHeader.jsx
│   │   ├── ListItem.jsx
│   │   └── CardItem.jsx
│   ├── toolbar/        # Filter and search components
│   │   ├── ToolbarSection.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortSelect.jsx
│   │   ├── FilterButtons.jsx
│   │   └── PriceRange.jsx
│   └── ui/            # Common UI components
│       ├── LoadMore.jsx
│       └── FilteringSpinner.jsx
├── hooks/             # Custom hooks
│   ├── useProductFilter.js
│   └── useVirtualScroll.js
└── styles/
    └── global.css
```

## Technical Implementation

### Custom Hooks

- `useProductFilter`: Manages filtering and sorting logic
- `useVirtualScroll`: Handles efficient list rendering

### Performance Optimizations

- Virtual scrolling for handling large data sets
- Debounced search and filtering
- Optimized re-rendering with proper state management

### Responsive Design

- Desktop: List view with detailed product information
- Mobile: Card view for better mobile experience
- Adaptive layout and controls
