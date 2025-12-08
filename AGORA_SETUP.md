# Agora Video Call Sample App - Setup Guide

This is a React Native sample app that demonstrates video calling using the Agora SDK.

## Prerequisites

- Node.js (v20.18.0 or higher recommended)
- React Native development environment set up
- iOS: Xcode 12+ and CocoaPods
- Android: Android Studio with SDK 21+
- An Agora account (free at https://console.agora.io/)

## Quick Start

### 1. Get Your Agora Credentials

1. Sign up at https://console.agora.io/
2. Create a new project in the Agora Console
3. Get your **App ID** from the project settings
4. For testing, you can use "Testing Mode" which doesn't require a token
5. For production, enable "Secured Mode" and generate tokens

### 2. Configure the App

Open `App.tsx` and replace the following:

```typescript
const APP_ID = 'YOUR_AGORA_APP_ID';  // Replace with your actual App ID
const CHANNEL_NAME = 'test';          // You can change this to any channel name
const TOKEN = null;                   // Use null for testing, or add your token for production
```

### 3. Install Dependencies

The dependencies are already installed, but if needed:

```bash
npm install
```

For iOS, CocoaPods are already installed. If you need to reinstall:

```bash
cd ios
pod install
cd ..
```

### 4. Run the App

**For iOS:**
```bash
npx react-native run-ios
```

Or open `ios/AgoraSampleApp.xcworkspace` in Xcode and run from there.

**For Android:**
```bash
npx react-native run-android
```

Make sure you have an Android emulator running or a device connected.

## Testing the Video Call

To test the video call feature:

1. Run the app on two devices (or one device and one simulator/emulator)
2. Enter the same channel name on both devices
3. Press "Join Channel" on both devices
4. You should see your local video and the remote user's video

## Features Implemented

- Join/Leave video channel
- Display local video feed
- Display remote user's video feed
- Handle user join/leave events
- Permission handling for camera and microphone
- Channel name configuration
- Error handling and status messages

## Project Structure

```
AgoraSampleApp/
├── App.tsx                    # Main app component with Agora integration
├── android/
│   └── app/src/main/
│       └── AndroidManifest.xml  # Android permissions configured
├── ios/
│   └── AgoraSampleApp/
│       └── Info.plist           # iOS permissions configured
└── package.json               # Dependencies including react-native-agora
```

## Configured Permissions

### Android (AndroidManifest.xml)
- INTERNET
- CAMERA
- RECORD_AUDIO
- MODIFY_AUDIO_SETTINGS
- ACCESS_NETWORK_STATE
- BLUETOOTH
- BLUETOOTH_CONNECT

### iOS (Info.plist)
- NSCameraUsageDescription
- NSMicrophoneUsageDescription

## Troubleshooting

### Issue: "App ID is invalid"
- Make sure you've replaced `YOUR_AGORA_APP_ID` with your actual App ID from the Agora Console

### Issue: No video showing
- Check that camera permissions are granted
- For iOS: Settings > Privacy > Camera
- For Android: Settings > Apps > Permissions

### Issue: Can't see remote user
- Make sure both devices are using the same channel name
- Check your network connection
- Verify both devices have granted permissions

### Issue: Build errors on iOS
- Try running `cd ios && pod install && cd ..`
- Clean build folder in Xcode: Product > Clean Build Folder

### Issue: Build errors on Android
- Clean the build: `cd android && ./gradlew clean && cd ..`
- Make sure Android SDK is properly installed

## Resources

- [Agora Documentation](https://docs.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-native)
- [Agora Console](https://console.agora.io/)
- [React Native Agora SDK](https://www.npmjs.com/package/react-native-agora)
- [Agora API Reference](https://api-ref.agora.io/en/video-sdk/react-native/4.x/index.html)

## Next Steps

To enhance this app, you can:

1. Add audio mute/unmute functionality
2. Add video enable/disable functionality
3. Implement screen sharing
4. Add multiple remote users support
5. Implement token generation for secure mode
6. Add call quality statistics
7. Implement recording functionality

## License

This is a sample app for testing purposes.
