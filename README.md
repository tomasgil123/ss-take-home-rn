# News Reader App

A React Native mobile application that displays news articles from the News API and allows users to save their favorite articles locally.

## Features

- **News Feed**: Browse the latest US top headlines
- **Article Details**: View full article information with images
- **Bookmarking**: Save articles for offline reading
- **Persistent Storage**: Saved articles persist between app sessions
- **Pull to Refresh**: Update news feed with latest articles
- **External Links**: Open full articles in device browser

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** for routing
- **AsyncStorage** for local persistence
- **News API** for article data

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your iOS/Android device

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd news-reader
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Optional) Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your News API key to the `.env` file:
     ```
     EXPO_PUBLIC_NEWS_API_KEY=your_api_key_here
     ```
   - The app includes a default API key, but you can get your own from [https://newsapi.org/](https://newsapi.org/)

### Running the App

1. Start the Expo development server:
   ```bash
   npm start
   ```

2. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Testing

For detailed testing instructions, see [TESTING.md](./TESTING.md)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleCard.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   └── LoadingIndicator.tsx
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── ArticleDetailScreen.tsx
│   └── SavedArticlesScreen.tsx
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx
│   └── TabNavigator.tsx
├── services/          # API and storage services
│   ├── newsApi.ts
│   └── storage.ts
├── types/             # TypeScript type definitions
│   ├── article.ts
│   └── navigation.ts
├── utils/             # Utility functions
│   └── dateFormatter.ts
└── constants/         # App constants
    └── api.ts
```

## API Configuration

The app uses the News API with the following endpoint:
```
https://newsapi.org/v2/top-headlines?country=us
```

API key is configured in `src/constants/api.ts`.

## Key Components

### Screens
- **HomeScreen**: Displays article list with pull-to-refresh
- **ArticleDetailScreen**: Shows full article with bookmark option
- **SavedArticlesScreen**: Lists all bookmarked articles

### Services
- **newsApi**: Handles API requests with error handling
- **storage**: Manages AsyncStorage for saved articles

### Components
- **ArticleCard**: Reusable article display component
- **LoadingIndicator**: Consistent loading state
- **ErrorState**: Error display with retry option
- **EmptyState**: Empty list placeholder

## Performance Optimizations

- Optimistic UI updates for bookmarking
- Efficient list rendering with FlatList
- Image lazy loading with placeholders
- Memoized callbacks to prevent unnecessary re-renders

## Error Handling

- Network error states with retry functionality
- API error handling with user-friendly messages
- Graceful fallbacks for missing data