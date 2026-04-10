
# Food Waste Management Platform — "Bug Busters"

## Overview
A platform connecting restaurants in Chennai with NGOs for surplus food donation. Two user types with demo logins, interactive map, and clean professional design.

## Pages & Features

### 1. Landing Page
- Hero section with mission statement and call-to-action
- Stats section (food saved, NGOs served, restaurants joined)
- How it works (3-step flow)
- Green/white professional color scheme

### 2. Login Page
- Toggle between "Restaurant Owner" and "NGO Admin" login
- Hardcoded demo credentials:
  - Restaurant: `restaurant@demo.com` / `demo123`
  - NGO: `ngo@demo.com` / `demo123`
- Clean card-based login form

### 3. Restaurant Dashboard (after restaurant login)
- Form to list surplus food (type, quantity, pickup time, expiry)
- View history of past donations
- Status tracking (listed → claimed → picked up)

### 4. NGO Dashboard (after NGO login)
- Browse available food listings from restaurants
- Claim food for pickup
- View claimed/completed pickups

### 5. Interactive Map Page
- Leaflet/OpenStreetMap showing Chennai
- Pins for restaurants (with available food) and NGOs
- Click pin to see details (name, address, available food)
- Sample data: ~5 restaurants and ~3 NGOs in Chennai

### 6. Contact Page
- Contact form for inquiries
- Platform info and support details

## Design
- White background, green (#22C55E) primary accent, professional typography
- Card-based layouts, clean spacing
- Responsive for mobile and desktop
- Navigation bar with logo "Bug Busters - Food Waste Platform"

## Tech Approach
- React with React Router for multi-page navigation
- Leaflet + react-leaflet for interactive map
- Context-based auth (demo credentials, no backend)
- Local state for food listings (mock data + ability to add new)
- Toast notifications when food is listed or claimed
