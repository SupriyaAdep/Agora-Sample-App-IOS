/**
 * Agora Video Calling Sample App
 * https://docs.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
} from 'react-native-agora';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// TODO: Replace with your Agora App ID
const APP_ID = '';
// TODO: Replace with your channel name
const CHANNEL_NAME = '';
// TODO: Replace with your token
const TOKEN = '';
// TODO: Replace with your local uid
const LOCAL_UID = 0;

function App() {
  const agoraEngineRef = useRef<IRtcEngine>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [channelName, setChannelName] = useState(CHANNEL_NAME);

  // Initialize Agora engine when the app starts
  useEffect(() => {
    setupVideoSDKEngine();
    return () => {
      console.log('unmounting');
      agoraEngineRef.current?.leaveChannel();
      agoraEngineRef.current?.release();
    };
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      if (!APP_ID) {
        console.log('set up app id');
        return;
      }
      // Request camera and microphone permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      // Create RTC engine instance
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      // Register event handlers
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel');
          setIsJoined(true);
        },
        onUserJoined: (_connection, uid) => {
          showMessage('Remote user ' + uid + ' joined');
          setRemoteUid(uid);
        },
        onUserOffline: (_connection, uid) => {
          showMessage('Remote user ' + uid + ' left the channel');
          setRemoteUid(0);
        },
        onError: (err, msg) => {
          console.log('on-err msg', err, msg);
          showMessage('Error: ' + msg + ' (' + err + ')');
        },
      });

      // Initialize the engine
      agoraEngine.initialize({
        appId: APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      // Enable video module
      agoraEngine.enableVideo();

      showMessage('Agora engine initialized');
    } catch (e) {
      console.log(e);
      showMessage('Engine initialization failed', e);
    }
  };

  const join = async () => {
    if (isJoined) {
      showMessage('Already joined the channel');
      return;
    }

    if (!channelName.trim() || !LOCAL_UID || !TOKEN) {
      showMessage('Please enter a channel name');
      return;
    }

    try {
      // Start preview
      agoraEngineRef.current?.startPreview();

      // Join channel
      console.log('join channel input', TOKEN, channelName, LOCAL_UID);
      const result = agoraEngineRef.current?.joinChannel(
        TOKEN,
        channelName,
        LOCAL_UID,
        {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        },
      );
      console.log('join channel result', result);
    } catch (e) {
      console.log(e);
      showMessage('Failed to join channel');
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('Left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    console.log(msg);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Agora Video Call Sample</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Configuration Section */}
          <View style={styles.configSection}>
            <Text style={styles.label}>Channel Name:</Text>
            <TextInput
              style={styles.input}
              value={channelName}
              onChangeText={setChannelName}
              placeholder="Enter channel name"
              editable={!isJoined}
            />
          </View>

          {/* Video Views */}
          <View style={styles.videoContainer}>
            {/* Local Video */}
            <View style={styles.videoBox}>
              <Text style={styles.videoLabel}>Local Video 3</Text>
              {isJoined ? (
                <RtcSurfaceView style={styles.videoView} canvas={{ uid: 0 }} />
              ) : (
                <View style={[styles.videoView, styles.placeholderView]}>
                  <Text style={styles.placeholderText}>
                    Join channel to see your video
                  </Text>
                </View>
              )}
            </View>

            {/* Remote Video */}
            <View style={styles.videoBox}>
              <Text style={styles.videoLabel}>Remote Video 2</Text>
              {remoteUid !== 0 ? (
                <RtcSurfaceView
                  style={styles.videoView}
                  canvas={{ uid: remoteUid }}
                />
              ) : (
                <View style={[styles.videoView, styles.placeholderView]}>
                  <Text style={styles.placeholderText}>
                    Waiting for remote user...
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isJoined && styles.buttonDisabled]}
              onPress={join}
              disabled={isJoined}
            >
              <Text style={styles.buttonText}>Join Channel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.leaveButton,
                !isJoined && styles.buttonDisabled,
              ]}
              onPress={leave}
              disabled={!isJoined}
            >
              <Text style={styles.buttonText}>Leave Channel</Text>
            </TouchableOpacity>
          </View>

          {/* Status Message */}
          {message !== '' && (
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )}

          {/* Setup Instructions */}
          <View style={styles.instructionsBox}>
            <Text style={styles.instructionsTitle}>Setup Instructions:</Text>
            <Text style={styles.instructionsText}>
              1. Get your App ID from the Agora Console{'\n'}
              2. Replace YOUR_AGORA_APP_ID in App.tsx{'\n'}
              3. Enter a channel name{'\n'}
              4. Press "Join Channel"{'\n'}
              5. Use another device with the same channel name to test
            </Text>
          </View>
        </ScrollView>
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
