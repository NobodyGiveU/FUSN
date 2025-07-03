# NSA (Nepali Student Associations) Module

This folder contains all files related to the Nepali Student Associations feature of FUSN.

## Files

- **nsa.html** - Main NSA page with search functionality and university listings
- **nsa_data.json** - JSON data containing information about 50+ NSA organizations across US universities

## Features

- **Search & Filter**: Find NSA chapters by university name, location, or abbreviation
- **Grid & List Views**: Toggle between different display modes
- **Social Media Links**: Direct links to Facebook, Instagram, YouTube, TikTok, LinkedIn, Twitter, Discord, GroupMe, LinkTree, and Website
- **Contact Information**: Email, phone, and president information where available
- **Responsive Design**: Works on desktop and mobile devices

## Data Structure

Each NSA entry in `nsa_data.json` contains:
- `name`: NSA organization name
- `university`: Full university name
- `location`: City, State, Country
- `email`: Contact email (optional)
- `phone`: Contact phone (optional)
- `president`: President name (optional)
- Social media links (Facebook, Instagram, YouTube, TikTok, LinkedIn, Twitter, Discord, GroupMe, LinkTree, Website)

## Navigation

The NSA page is accessible from the main navigation menu on all pages. All navigation links have been updated to point to the correct paths within the NSA folder structure. 