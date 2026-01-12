/**
 * Agora Video Calling Sample App
 * https://docs.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-native
 *
 * @format
 */

import React from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  // const DEPLOYED_REACT_SDK_APP_URL = 'https://datadog-sample-app.vercel.app/';
  // const DEPLOYED_WEB_SDK_APP_URL = 'https://agora-sample-web-sdk-app.vercel.app/';

  const DEPLOYED_APP_URL = 'https://agora-sample-web-sdk-app.vercel.app/';
  console.log('DEPLOYED_APP_URL: ', DEPLOYED_APP_URL);
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          // keep these for RTC
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          // helps avoid weird blank loads
          originWhitelist={['*']}
          source={{ uri: DEPLOYED_APP_URL }}
          webviewDebuggingEnabled={true} // 👈 ADD THIS
        />
        ;
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    padding: 16,
  },
  configSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  videoContainer: {
    marginBottom: 16,
  },
  videoBox: {
    marginBottom: 16,
  },
  videoLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  videoView: {
    height: 200,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  placeholderView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  leaveButton: {
    backgroundColor: '#dc3545',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  messageBox: {
    backgroundColor: '#e7f3ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  messageText: {
    color: '#004085',
    fontSize: 14,
  },
  instructionsBox: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#856404',
  },
  instructionsText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
  },
});

export default App;
