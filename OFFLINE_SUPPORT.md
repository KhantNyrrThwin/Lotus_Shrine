# Offline Support for Posture Detection

This document explains how the posture detection feature works offline in the Lotus Shrine meditation app.

## How Offline Support Works

The app implements several strategies to ensure posture detection works offline:

### 1. Service Worker Caching
- A service worker (`sw.js`) caches all model files for offline use
- Model files are cached during the first visit when online
- Cached files are served automatically when offline

### 2. TensorFlow.js Backend Management
- Explicitly imports and initializes TensorFlow backends (WebGL and CPU)
- Automatically falls back to CPU backend if WebGL is unavailable
- Ensures proper initialization even without internet connectivity

### 3. Model Loading Improvements
- Enhanced error handling for offline scenarios
- Multiple fallback strategies for model loading
- Clear user feedback about offline status

### 4. Progressive Web App (PWA) Features
- Manifest file for app installation
- Proper caching headers
- Offline detection and user notifications

## Model Files

The following files are cached for offline use:
- `/pose_model/model.json` - Model architecture
- `/pose_model/metadata.json` - Model metadata and labels
- `/pose_model/weights.bin` - Model weights (largest file)

## Usage Instructions

### First-time Setup (Required for Offline Use)
1. Visit the meditation page while online
2. Allow the app to load and cache all model files
3. Wait for the "Model loaded successfully" message
4. Once cached, the app will work offline

### Offline Usage
1. Ensure you've completed the first-time setup
2. Disconnect from the internet or enable airplane mode
3. Open the meditation page
4. The app will automatically use cached model files
5. Posture detection will work exactly as it does online

## Technical Implementation Details

### Service Worker
The service worker handles caching and serving of model files:
- Installs and caches model files on first visit
- Serves cached files when offline
- Updates cache when new versions are available

### TensorFlow.js Initialization
The app explicitly imports and initializes TensorFlow backends:
- `@tensorflow/tfjs-backend-webgl` for GPU acceleration
- `@tensorflow/tfjs-backend-cpu` as fallback
- Automatic backend selection based on device capabilities

### Error Handling
Enhanced error handling provides clear feedback:
- Online/offline status detection
- User-friendly messages for different scenarios
- Graceful degradation when offline

## Troubleshooting

### Model Not Loading Offline
1. Ensure first-time setup was completed while online
2. Check browser developer tools for caching errors
3. Clear cache and retry first-time setup

### Performance Issues
1. CPU backend is slower than WebGL
2. Complex poses may take longer to process
3. Lower-end devices may experience reduced frame rates

## Browser Support

Offline support works in all modern browsers that support:
- Service workers
- Cache API
- TensorFlow.js
- Camera access

Tested browsers:
- Chrome 80+
- Firefox 70+
- Safari 14+
- Edge 80+

## Limitations

1. Initial setup requires internet connection
2. Model updates require online access
3. Some browsers may have storage limitations
4. Very old devices may not support required features