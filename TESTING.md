# News Reader App - Manual Testing Guide

This guide provides comprehensive instructions for manually testing the News Reader mobile application using Expo Go.

## Prerequisites

### 1. Install Expo Go on Your Device
- **iOS**: Download "Expo Go" from the App Store
- **Android**: Download "Expo Go" from Google Play Store

### 2. Setup Development Environment
- Ensure Node.js is installed (version 16 or higher)
- Navigate to the project directory in terminal
- Run `npm install` to install dependencies

### 3. Start the Development Server
```bash
npm start
```
This will start the Expo development server and display a QR code in the terminal.

### 4. Connect Your Device
- **iOS**: Open Camera app and scan the QR code, tap the notification to open in Expo Go
- **Android**: Open Expo Go app and scan the QR code using the built-in scanner
- Ensure your device and computer are on the same network

## Test Scenarios

### 1. Home Screen - Article List

#### 1.1 Initial Load
**Steps:**
1. Launch the app
2. Observe the home screen loading

**Expected Results:**
- Loading indicator appears while fetching articles
- Article list displays with US top headlines
- Each article card shows:
  - Thumbnail image (or placeholder if no image)
  - Article title (max 2 lines)
  - Description (max 2 lines)
  - Source name
  - Relative time (e.g., "2 hours ago")
  - Bookmark icon (outline)

#### 1.2 Error Handling
**Steps:**
1. Turn off internet connection
2. Launch the app or pull to refresh

**Expected Results:**
- Error state displays with error message
- "Try Again" button is visible
- Tapping "Try Again" attempts to reload

#### 1.3 Pull to Refresh
**Steps:**
1. On the home screen, pull down from the top
2. Release to trigger refresh

**Expected Results:**
- Refresh indicator appears
- Article list updates with latest news
- Bookmark states are preserved

### 2. Article Detail Screen

#### 2.1 Navigation to Detail
**Steps:**
1. Tap on any article card from the home screen

**Expected Results:**
- Navigate to article detail screen
- Back button appears in header
- Article details display:
  - Full-width image (if available)
  - Full article title
  - Author name (if available)
  - Published date
  - Source name with icon
  - Article description
  - Article content (if available)
  - "Read Full Article" button

#### 2.2 Bookmark from Detail
**Steps:**
1. Navigate to article detail
2. Tap bookmark icon in header

**Expected Results:**
- Bookmark icon fills when saved
- Icon returns to outline when removed
- State persists when navigating back

#### 2.3 Open External Article
**Steps:**
1. Navigate to article detail
2. Tap "Read Full Article" button

**Expected Results:**
- In-app browser opens
- Full article loads from source website
- User can close browser to return to app

### 3. Bookmarking Functionality

#### 3.1 Save Article from List
**Steps:**
1. On home screen, tap bookmark icon on any article

**Expected Results:**
- Bookmark icon changes from outline to filled
- Color changes to blue (#007AFF)
- No navigation occurs

#### 3.2 Remove Bookmark from List
**Steps:**
1. Find a bookmarked article (filled icon)
2. Tap the bookmark icon

**Expected Results:**
- Icon changes back to outline
- Color changes to gray

### 4. Saved Articles Screen

#### 4.1 View Saved Articles
**Steps:**
1. Bookmark several articles from home screen
2. Tap "Saved" tab in bottom navigation

**Expected Results:**
- All bookmarked articles appear
- Same card layout as home screen
- All bookmark icons show as filled

#### 4.2 Empty State
**Steps:**
1. Remove all bookmarks
2. Navigate to "Saved" tab

**Expected Results:**
- Empty state displays
- Shows bookmark icon
- "No Saved Articles" title
- "Articles you bookmark will appear here" message

#### 4.3 Remove from Saved
**Steps:**
1. On Saved screen, tap bookmark icon on any article

**Expected Results:**
- Article immediately disappears from list
- If last article, empty state appears

### 5. Navigation

#### 5.1 Tab Navigation
**Steps:**
1. Tap "News" tab
2. Tap "Saved" tab
3. Repeat switching

**Expected Results:**
- Smooth transition between screens
- Active tab highlighted in blue
- Inactive tab in gray
- Screen content updates appropriately

#### 5.2 Deep Navigation
**Steps:**
1. Go to Saved tab
2. Open an article detail
3. Tap back button

**Expected Results:**
- Returns to Saved screen (not Home)
- Saved list maintains scroll position

### 6. Data Persistence

#### 6.1 App Restart
**Steps:**
1. Bookmark several articles
2. Close the app completely
3. Reopen the app

**Expected Results:**
- Bookmarked articles remain saved
- Bookmark states show correctly on home screen
- Saved tab shows all bookmarked articles

### 7. Performance Testing

#### 7.1 Scroll Performance
**Steps:**
1. On home screen with many articles
2. Scroll quickly up and down

**Expected Results:**
- Smooth scrolling without lag
- Images load progressively
- No stuttering or freezing

#### 7.2 Image Loading
**Steps:**
1. Scroll through article list
2. Observe image loading

**Expected Results:**
- Placeholder appears first
- Images load and replace placeholders
- No layout shift when images load

### 8. Device-Specific Testing

#### 8.1 Different Screen Sizes
**Test on:**
- Small phones (iPhone SE, older Android)
- Standard phones
- Large phones/tablets

**Expected Results:**
- UI scales appropriately
- Text remains readable
- Touch targets are adequate size

#### 8.2 Orientation
**Steps:**
1. Rotate device to landscape
2. Navigate through all screens
3. Rotate back to portrait

**Expected Results:**
- App remains in portrait orientation
- No UI breaks or crashes

### 9. Edge Cases

#### 9.1 Long Content
**Articles with:**
- Very long titles
- Lengthy descriptions
- Missing images
- Missing author/source

**Expected Results:**
- Text truncates appropriately
- Placeholders show for missing images
- Layout remains consistent

#### 9.2 Network Issues
**Test scenarios:**
- Slow network (3G)
- Intermittent connection
- Timeout scenarios

**Expected Results:**
- Appropriate loading states
- Error messages for failures
- App remains responsive

## Common Issues & Troubleshooting

### Issue: App won't load in Expo Go
**Solutions:**
- Ensure device and computer are on same network
- Restart Expo server
- Clear Expo Go app cache
- Check firewall settings

### Issue: Articles don't load
**Solutions:**
- Check internet connection
- Verify API key is valid
- Check if API rate limit exceeded

### Issue: Bookmarks don't persist
**Solutions:**
- Check AsyncStorage permissions
- Clear app data and try again
- Ensure sufficient device storage

## Performance Benchmarks

- **Initial load time**: < 3 seconds
- **Navigation transitions**: < 300ms
- **Bookmark toggle**: Immediate visual feedback
- **Pull to refresh**: < 2 seconds
- **Scroll performance**: 60 FPS

## Accessibility Testing

### VoiceOver (iOS) / TalkBack (Android)
1. Enable screen reader
2. Navigate through all screens
3. Verify all interactive elements are accessible
4. Check content descriptions are meaningful

## Final Checklist

- [ ] App launches without crashes
- [ ] All screens load correctly
- [ ] Navigation works as expected
- [ ] Articles display properly
- [ ] Bookmarking works reliably
- [ ] Saved articles persist
- [ ] Pull to refresh functions
- [ ] External links open correctly
- [ ] Error states display appropriately
- [ ] Performance is acceptable
- [ ] No memory leaks during extended use

## Reporting Issues

When reporting issues, please include:
1. Device model and OS version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. Any error messages