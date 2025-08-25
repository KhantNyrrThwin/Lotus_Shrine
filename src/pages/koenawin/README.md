# Koe Na Win Dashboard

## Overview
The Koe Na Win Dashboard is a React TypeScript application designed for logged-in users to track their Koe Na Win meditation practice. It provides a comprehensive interface with sidebar navigation, progress tracking, and daily reminders.

## Features

### Authentication
- Protected routes for logged-in users only
- Automatic redirect to login page for unauthenticated users
- User session management with localStorage

### Layout
- **Navbar**: Original project navbar with user authentication status
- **Sidebar**: Collapsible sidebar with navigation menu (Burmese language)
- **Responsive Design**: Mobile-friendly with collapsible sidebar on smaller screens

### Navigation Menu (Burmese)
- ပင်မစာမျက်နှာ (Home Dashboard)
- ကိုးနဝင်း အချက်အလက် (Information Dashboard)
- ပရိုဖိုင် (Profile)
- ထွက်ရန် (Logout)

### Home Dashboard
- Welcome message with username
- Interactive calendar component
- Rotating motivational quotes
- Koe Na Win process information:
  - Start date
  - End date
  - Days remaining
  - Meat-free day warnings (Mondays)
  - Daily practice reminders

### Information Dashboard
- Progress tracking with visual progress bar
- Current mantra instructions and reading count
- Today's status indicators
- Stage-by-stage progress overview
- Quick action buttons for starting practice

## Technical Implementation

### Components
- `KoeNaWinDashboard`: Main dashboard component with sidebar and routing
- `HomeDashboard`: Home view with calendar and process info
- `InformationDashboard`: Information view with progress tracking

### UI Components Used
- **shadcn/ui**: Sidebar, Calendar, Progress, Card, Button
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Icons for navigation and status indicators

### Styling
- Consistent color palette matching the existing project
- Burmese language support
- Responsive design with Tailwind CSS
- Custom color scheme: `#4f3016`, `#735240`, `#FDE9DA`

### State Management
- Local state for UI interactions
- Authentication state management
- Progress tracking and user preferences

## File Structure
```
src/pages/koenawin/
├── dashboard.tsx          # Main dashboard component
├── HomeDashboard.tsx      # Home view component
├── InformationDashboard.tsx # Information view component
└── README.md             # This documentation
```

## Usage
1. Navigate to `/koenawin/dashboard` (requires authentication)
2. Use sidebar navigation to switch between views
3. Track daily progress and view motivational content
4. Access profile and logout through sidebar menu

## Dependencies
- React 19.1.0
- TypeScript
- Framer Motion
- Lucide React
- shadcn/ui components
- react-day-picker
- @radix-ui/react-progress
