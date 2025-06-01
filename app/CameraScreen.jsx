// code before socket io connection and working correctly with the camera

// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import "../global.css";

// export default function CameraScreen() {
//   const [cameraPosition, setCameraPosition] = useState('back');
//   const device = useCameraDevice(cameraPosition);
//   const camera = useRef(null);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [feedback, setFeedback] = useState('N/A');

//   useEffect(() => {
//     (async () => {
//       try {
//         let permission = await Camera.getCameraPermissionStatus();
//         console.log('Current camera permission:', permission);
//         if (permission !== 'granted') {
//           permission = await Camera.requestCameraPermission();
//           console.log('Requested camera permission:', permission);
//         }
//         setHasPermission(permission === 'granted');
//       } catch (error) {
//         console.error('Permission error:', error);
//       }
//     })();
//   }, []);

//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//     setFeedback(isRecording ? 'Stopped' : 'Recording started');
//   };

//   const toggleCamera = () => {
//     setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
//     setFeedback(`Switched to ${cameraPosition === 'back' ? 'front' : 'back'} camera`);
//   };

//   if (!hasPermission) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center">
//         <Text className="text-white text-lg text-center p-5 bg-red-500/70 rounded-lg">
//           Camera permission not granted.
//         </Text>
//       </View>
//     );
//   }

//   if (!device) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center">
//         <Text className="text-white text-lg text-center p-5 bg-red-500/70 rounded-lg">
//           No {cameraPosition} camera available.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-black">
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         ref={camera}
//       />
//       <View className="flex-1 justify-between p-5">
//         <View className="bg-black/50 rounded-lg p-3">
//           <Text className="text-white text-base font-bold">Feedback: {feedback}</Text>
//         </View>
//         {isRecording && (
//           <View className="flex-row items-center bg-black/50 rounded-lg p-3 self-center">
//             <View className="w-3 h-3 bg-red-500 rounded-full mr-2" />
//             <Text className="text-white text-base font-bold">Recording</Text>
//           </View>
//         )}
//         <View className="flex-row justify-center bg-black/50 p-3 rounded-lg">
//           <TouchableOpacity
//             className={`flex-row items-center ${isRecording ? 'bg-red-500' : 'bg-green-500'} py-3 px-8 rounded-full mx-2`}
//             onPress={toggleRecording}
//           >
//             <Icon name={isRecording ? 'stop' : 'play-arrow'} size={24} color="#FFF" className="mr-2" />
//             <Text className="text-white text-lg font-bold">{isRecording ? 'Stop' : 'Start'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="flex-row items-center bg-blue-500 py-3 px-8 rounded-full mx-2"
//             onPress={toggleCamera}
//           >
//             <Icon name="flip-camera-android" size={24} color="#FFF" className="mr-2" />
//             <Text className="text-white text-lg font-bold">Flip</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// code for testing the camera and socket.io connection

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import io from 'socket.io-client';

// const BACKEND_URL = 'https://da8e-35-197-11-138.ngrok-free.app'; // Replace with your ngrok URL

// export default function CameraScreen() {
//   const [socketStatus, setSocketStatus] = useState('Disconnected');
//   const [serverMessage, setServerMessage] = useState('Connecting...');
//   const [hasPermission, setHasPermission] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState('back');
//   const [isRecording, setIsRecording] = useState(false);
//   const [feedback, setFeedback] = useState('N/A');
//   const device = useCameraDevice(cameraPosition);
//   const camera = useRef(null);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // Request camera permission
//     const checkPermissions = async () => {
//       try {
//         let permission = await Camera.getCameraPermissionStatus();
//         console.log('Current camera permission:', permission);
//         if (permission !== 'granted') {
//           permission = await Camera.requestCameraPermission();
//           console.log('Requested camera permission:', permission);
//         }
//         setHasPermission(permission === 'granted');
//         if (permission !== 'granted') {
//           Alert.alert('Camera Permission', 'Please enable camera access in settings.');
//         }
//       } catch (error) {
//         console.error('Permission error:', error);
//         setFeedback(`Permission error: ${error.message}`);
//       }
//     };
//     checkPermissions();

//     // Initialize Socket.IO
//     socketRef.current = io(BACKEND_URL, {
//       path: '/socket.io',
//       transports: ['websocket'],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       timeout: 10000,
//       extraHeaders: { 'ngrok-skip-browser-warning': 'true' },
//     });

//     socketRef.current.on('connect', () => {
//       console.log('Socket.IO connected:', socketRef.current.id);
//       setSocketStatus('Connected');
//       setServerMessage('Connected to server');
//       setFeedback('Socket connected');
//     });

//     socketRef.current.on('connect_error', (error) => {
//       console.error('Socket.IO connect_error:', error.message);
//       setSocketStatus('Error');
//       setServerMessage(`Connection error: ${error.message}`);
//       setFeedback(`Socket error: ${error.message}`);
//     });

//     socketRef.current.on('message', (data) => {
//       console.log('Message received:', data);
//       setServerMessage(data.message || 'Message received');
//       setFeedback(`Server: ${data.message}`);
//     });

//     socketRef.current.on('error', (data) => {
//       console.error('Backend error:', data);
//       setServerMessage(`Error: ${data.message}`);
//       setFeedback(`Server error: ${data.message}`);
//     });

//     socketRef.current.on('disconnect', (reason) => {
//       console.log('Socket.IO disconnected:', reason);
//       setSocketStatus('Disconnected');
//       setServerMessage(`Disconnected: ${reason}`);
//       setFeedback(`Socket disconnected: ${reason}`);
//     });

//     // Cleanup on component unmount
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         console.log('Socket.IO disconnected on cleanup');
//       }
//     };
//   }, []);

//   const toggleRecording = async () => {
//     if (!camera.current) return;
//     try {
//       if (isRecording) {
//         await camera.current.stopRecording();
//         setIsRecording(false);
//         setFeedback('Recording stopped');
//       } else {
//         await camera.current.startRecording({
//           onRecordingFinished: (video) => {
//             console.log('Video recorded:', video);
//             setFeedback(`Recording saved: ${video.path}`);
//           },
//           onRecordingError: (error) => {
//             console.error('Recording error:', error);
//             setFeedback(`Recording error: ${error.message}`);
//           },
//         });
//         setIsRecording(true);
//         setFeedback('Recording started');
//       }
//     } catch (error) {
//       console.error('Toggle recording error:', error);
//       setFeedback(`Error: ${error.message}`);
//     }
//   };

//   const toggleCamera = () => {
//     setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
//     setFeedback(`Switched to ${cameraPosition === 'back' ? 'front' : 'back'} camera`);
//   };

//   if (!hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Camera permission not granted.</Text>
//       </View>
//     );
//   }

//   if (!device) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>No {cameraPosition} camera available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         ref={camera}
//         video={true}
//         audio={true}
//       />
//       <View style={styles.overlay}>
//         <View style={styles.feedbackContainer}>
//           <Text style={styles.text}>Feedback: {feedback}</Text>
//           <Text style={styles.text}>Socket Status: {socketStatus}</Text>
//           <Text style={styles.text}>Server Message: {serverMessage}</Text>
//         </View>
//         {isRecording && (
//           <View style={styles.recordingIndicator}>
//             <View style={styles.recordingDot} />
//             <Text style={styles.text}>Recording</Text>
//           </View>
//         )}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, isRecording ? styles.stopButton : styles.startButton]}
//             onPress={toggleRecording}
//           >
//             <Icon name={isRecording ? 'stop' : 'play-arrow'} size={24} color="#FFF" style={styles.icon} />
//             <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Start'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.button, styles.flipButton]} onPress={toggleCamera}>
//             <Icon name="flip-camera-android" size={24} color="#FFF" style={styles.icon} />
//             <Text style={styles.buttonText}>Flip</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   overlay: { flex: 1, justifyContent: 'space-between', padding: 20 },
//   feedbackContainer: { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, padding: 12 },
//   text: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
//   errorText: { color: '#FFF', fontSize: 18, textAlign: 'center', padding: 20, backgroundColor: 'rgba(239, 68, 68, 0.7)', borderRadius: 8 },
//   recordingIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, padding: 12, alignSelf: 'center' },
//   recordingDot: { width: 12, height: 12, backgroundColor: '#EF4444', borderRadius: 6, marginRight: 8 },
//   buttonContainer: { flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, padding: 12 },
//   button: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, marginHorizontal: 8 },
//   startButton: { backgroundColor: '#22C55E' },
//   stopButton: { backgroundColor: '#EF4444' },
//   flipButton: { backgroundColor: '#3B82F6' },
//   buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
//   icon: { marginRight: 8 },
// });


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// import { usePoseDetection } from 'react-native-mediapipe';
// import Svg, { Circle } from 'react-native-svg';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [landmarks, setLandmarks] = useState(null);
//   const [fps, setFps] = useState(0);
//   const device = useCameraDevice('back');
//   const frameTimes = useRef([]);
//   const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();

//   const callbacks = {
//     onResults: (results) => {
//       console.log('Pose detection results:', JSON.stringify(results, null, 2));
//       frameTimes.current.push(Date.now());
//       if (results?.landmarks) {
//         setLandmarks(results.landmarks[0]);
//       } else {
//         console.log('No landmarks detected');
//       }
//     },
//     onError: (error) => {
//       console.error('Pose detection error:', error);
//       Alert.alert('Error', `Pose detection failed: ${error.message}`);
//     },
//   };

//   const poseDetection = usePoseDetection(callbacks, 2, 'pose_landmarker_full.task', {
//     numPoses: 1,
//     minPoseDetectionConfidence: 0.5,
//     minPosePresenceConfidence: 0.5,
//     minTrackingConfidence: 0.5,
//     delegate: 1, // GPU
//     mirrorMode: 'no-mirror',
//     fpsMode: 30,
//   });

//   useEffect(() => {
//     const checkPermissions = async () => {
//       if (!cameraPermission) {
//         const permission = await requestPermission();
//         setHasPermission(permission);
//         if (!permission) Alert.alert('Camera Permission', 'Please enable camera access.');
//       } else {
//         setHasPermission(cameraPermission);
//       }
//     };
//     checkPermissions();

//     const fpsInterval = setInterval(() => {
//       const recentFrames = frameTimes.current.filter((time) => Date.now() - time < 1000);
//       setFps(recentFrames.length);
//       frameTimes.current = recentFrames;
//     }, 1000);

//     return () => clearInterval(fpsInterval);
//   }, [cameraPermission]);

//   useEffect(() => {
//     if (device) poseDetection.cameraDeviceChangeHandler(device);
//   }, [device, poseDetection.cameraDeviceChangeHandler]);

//   if (hasPermission === null) return <View style={styles.container}><Text style={styles.errorText}>Checking permissions...</Text></View>;
//   if (!hasPermission) return <View style={styles.container}><Text style={styles.errorText}>Camera permission not granted.</Text></View>;
//   if (!device) return <View style={styles.container}><Text style={styles.errorText}>No Camera available.</Text></View>;

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         onLayout={poseDetection.cameraViewLayoutChangeHandler}
//         frameProcessor={poseDetection.frameProcessor}
//         frameProcessorFps={poseDetection.fpsMode}
//         pixelFormat="rgb" // Output RGBA_8888 frames
//       />
//       {landmarks && (
//         <Svg style={StyleSheet.absoluteFill}>
//           {landmarks.map((lm, i) => (
//             <Circle key={i} cx={lm.x * wp(100)} cy={lm.y * hp(100)} r={5} fill="red" />
//           ))}
//         </Svg>
//       )}
//       <View style={styles.overlay}>
//         <View style={styles.feedbackContainer}>
//           <Text style={styles.text}>FPS: {fps}</Text>
//           <Text style={styles.text}>Pose Detected: {landmarks ? 'Yes' : 'No'}</Text>
//           <Text style={styles.text}>Landmarks: {landmarks?.length || 0}</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   overlay: { flex: 1, justifyContent: 'flex-start', padding: wp(5) },
//   feedbackContainer: { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, padding: wp(3), marginTop: hp(10) },
//   text: { color: '#FFF', fontSize: hp(2), fontWeight: 'bold', marginBottom: hp(1) },
//   errorText: { color: '#FFF', fontSize: hp(2.5), textAlign: 'center', padding: wp(5), backgroundColor: 'rgba(239, 68, 68, 0.7)', borderRadius: 8 },
// });


// giving incorrect red dots
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// import { usePoseDetection } from 'react-native-mediapipe';
// import Svg, { Circle } from 'react-native-svg';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [landmarks, setLandmarks] = useState(null);
//   const [fps, setFps] = useState(0);
//   const device = useCameraDevice('back');
//   const frameTimes = useRef([]);
//   const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();

//   const callbacks = {
//     onResults: (results) => {
//       console.log('Pose detection results:', JSON.stringify(results, null, 2));
//       frameTimes.current.push(Date.now());
//       const detectedLandmarks = results?.results?.[0]?.landmarks?.[0];
//       if (detectedLandmarks) {
//         setLandmarks(detectedLandmarks);
//         console.log('Landmarks detected:', detectedLandmarks.length);
//       } else {
//         setLandmarks(null);
//         console.log('No landmarks detected');
//       }
//     },
//     onError: (error) => {
//       console.error('Pose detection error:', error);
//       Alert.alert('Error', `Pose detection failed: ${error.message}`);
//     },
//   };

//   const poseDetection = usePoseDetection(callbacks, 2, 'pose_landmarker_full.task', {
//     numPoses: 1,
//     minPoseDetectionConfidence: 0.5,
//     minPosePresenceConfidence: 0.5,
//     minTrackingConfidence: 0.5,
//     delegate: 1, // GPU
//     mirrorMode: 'no-mirror',
//     fpsMode: 30,
//   });

//   useEffect(() => {
//     const checkPermissions = async () => {
//       if (!cameraPermission) {
//         const permission = await requestPermission();
//         setHasPermission(permission);
//         if (!permission) Alert.alert('Camera Permission', 'Please enable camera access.');
//       } else {
//         setHasPermission(cameraPermission);
//       }
//     };
//     checkPermissions();

//     const fpsInterval = setInterval(() => {
//       const recentFrames = frameTimes.current.filter((time) => Date.now() - time < 1000);
//       setFps(recentFrames.length);
//       frameTimes.current = recentFrames;
//     }, 1000);

//     return () => clearInterval(fpsInterval);
//   }, [cameraPermission]);

//   useEffect(() => {
//     if (device) poseDetection.cameraDeviceChangeHandler(device);
//   }, [device, poseDetection.cameraDeviceChangeHandler]);

//   if (hasPermission === null) return <View style={styles.container}><Text style={styles.errorText}>Checking permissions...</Text></View>;
//   if (!hasPermission) return <View style={styles.container}><Text style={styles.errorText}>Camera permission not granted.</Text></View>;
//   if (!device) return <View style={styles.container}><Text style={styles.errorText}>No Camera available.</Text></View>;

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         onLayout={poseDetection.cameraViewLayoutChangeHandler}
//         frameProcessor={poseDetection.frameProcessor}
//         frameProcessorFps={poseDetection.fpsMode}
//         pixelFormat="rgb" // Output RGBA_8888 frames
//       />
//       {landmarks && (
//         <Svg style={StyleSheet.absoluteFill}>
//           {landmarks.map((lm, i) => (
//             <Circle key={i} cx={lm.x * wp(100)} cy={lm.y * hp(100)} r={5} fill="red" />
//           ))}
//         </Svg>
//       )}
//       <View style={styles.overlay}>
//         <View style={styles.feedbackContainer}>
//           <Text style={styles.text}>FPS: {fps}</Text>
//           <Text style={styles.text}>Pose Detected: {landmarks ? 'Yes' : 'No'}</Text>
//           <Text style={styles.text}>Landmarks: {landmarks?.length || 0}</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   overlay: { flex: 1, justifyContent: 'flex-start', padding: wp(5) },
//   feedbackContainer: { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, padding: wp(3), marginTop: hp(10) },
//   text: { color: '#FFF', fontSize: hp(2), fontWeight: 'bold', marginBottom: hp(1) },
//   errorText: { color: '#FFF', fontSize: hp(2.5), textAlign: 'center', padding: wp(5), backgroundColor: 'rgba(239, 68, 68, 0.7)', borderRadius: 8 },
// });


// from the front camera getting correct red dot but not place correclty on the image
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission, useCameraFormat, useFrameProcessor } from 'react-native-vision-camera';
// import { usePoseDetection } from 'react-native-mediapipe';
// import Svg, { Circle } from 'react-native-svg';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useWindowDimensions } from 'react-native';

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [landmarks, setLandmarks] = useState(null);
//   const [fps, setFps] = useState(0);
//   const [isFrontCamera, setIsFrontCamera] = useState(false);
//   const [imageSize, setImageSize] = useState({ width: 640, height: 480 });
//   const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
//   const frameTimes = useRef([]);
//   const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();
//   const { width: screenWidth, height: screenHeight } = useWindowDimensions();

//   // Set camera format to 640x480
//   const format = useCameraFormat(device, [
//     { videoResolution: { width: 640, height: 480 } },
//     { fps: 30 },
//   ]);

//   const callbacks = {
//     onResults: (results) => {
//       console.log('--- Pose detection results START ---');
//       console.log(JSON.stringify(results, null, 2));
//       console.log('--- Pose detection results END ---');

//       frameTimes.current.push(Date.now());

//       // Explore landmark properties
//       const potentialNormalizedLandmarks = results?.results?.[0]?.landmarks?.[0];
//       const anotherPotentialNormalizedLandmarks = results?.results?.[0]?.normalizedLandmarks?.[0];
//       const yetAnotherPotentialNormalizedLandmarks = results?.results?.[0]?.poseLandmarks?.[0];
//       const worldLandmarks = results?.results?.[0]?.worldLandmarks?.[0];

//       console.log('potentialNormalizedLandmarks:', JSON.stringify(potentialNormalizedLandmarks, null, 2));
//       console.log('anotherPotentialNormalizedLandmarks:', JSON.stringify(anotherPotentialNormalizedLandmarks, null, 2));
//       console.log('yetAnotherPotentialNormalizedLandmarks:', JSON.stringify(yetAnotherPotentialNormalizedLandmarks, null, 2));
//       console.log('worldLandmarks:', JSON.stringify(worldLandmarks, null, 2));

//       const width = results?.inputImageWidth || 640;
//       const height = results?.inputImageHeight || 480;

//       // Use normalized landmarks
//       const detectedLandmarks = potentialNormalizedLandmarks;

//       if (detectedLandmarks && width && height) {
//         setLandmarks(detectedLandmarks);
//         setImageSize({ width, height });
//         console.log('Landmarks detected:', detectedLandmarks.length, 'Image:', width, 'x', height);
//       } else {
//         setLandmarks(null);
//         console.log('No valid landmarks');
//       }
//     },
//     onError: (error) => {
//       console.error('Pose detection error:', error);
//       Alert.alert('Error', `Pose detection failed: ${error.message}`);
//     },
//   };

//   const poseDetection = usePoseDetection(callbacks, 2, 'pose_landmarker_full.task', {
//     numPoses: 1,
//     minPoseDetectionConfidence: 0.5,
//     minPosePresenceConfidence: 0.5,
//     minTrackingConfidence: 0.5,
//     delegate: 1, // GPU
//     mirrorMode: isFrontCamera ? 'mirror' : 'no-mirror',
//     fpsMode: 30,
//     forceOutputOrientation: 'landscape-left', // Match camera rotation
//   });

//   useEffect(() => {
//     const checkPermissions = async () => {
//       if (!cameraPermission) {
//         const permission = await requestPermission();
//         setHasPermission(permission);
//         if (!permission) Alert.alert('Camera Permission', 'Please enable camera access.');
//       } else {
//         setHasPermission(cameraPermission);
//       }
//     };
//     checkPermissions();

//     const fpsInterval = setInterval(() => {
//       const recentFrames = frameTimes.current.filter((time) => Date.now() - time < 1000);
//       setFps(recentFrames.length);
//       frameTimes.current = recentFrames;
//     }, 1000);

//     return () => clearInterval(fpsInterval);
//   }, [cameraPermission]);

//   useEffect(() => {
//     if (device) poseDetection.cameraDeviceChangeHandler(device);
//   }, [device, poseDetection.cameraDeviceChangeHandler, isFrontCamera]);

//   const handleFlipCamera = () => {
//     setIsFrontCamera(!isFrontCamera);
//     setLandmarks(null);
//   };

//   if (hasPermission === null) return <View style={styles.container}><Text style={styles.errorText}>Checking permissions...</Text></View>;
//   if (!hasPermission) return <View style={styles.container}><Text style={styles.errorText}>Camera permission not granted.</Text></View>;
//   if (!device) return <View style={styles.container}><Text style={styles.errorText}>No Camera available.</Text></View>;

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         format={format}
//         onLayout={poseDetection.cameraViewLayoutChangeHandler}
//         frameProcessor={poseDetection.frameProcessor}
//         frameProcessorFps={poseDetection.fpsMode}
//         pixelFormat="rgb"
//         outputOrientation="preview"
//       />
//       {landmarks && (
//         <Svg style={StyleSheet.absoluteFill} width={screenWidth} height={screenHeight}>
//           {landmarks.map((lm, i) => {
//             // Manually rotate landmarks 90 degrees to match horizontal pose
//             const rotatedX = lm.y * screenHeight; // Swap and scale
//             const rotatedY = (1 - lm.x) * screenWidth; // Invert x for 90-degree rotation
//             return (
//               <Circle
//                 key={i}
//                 cx={rotatedX}
//                 cy={rotatedY}
//                 r="5"
//                 fill="red"
//               />
//             );
//           })}
//         </Svg>
//       )}
//       <View style={styles.overlay}>
//         <View style={styles.feedbackContainer}>
//           <Text style={styles.text}>FPS: {fps}</Text>
//           <Text style={styles.text}>Pose Detected: {landmarks ? 'Yes' : 'No'}</Text>
//           <Text style={styles.text}>Landmarks: {landmarks?.length || 0}</Text>
//           <Text style={styles.text}>Camera: {isFrontCamera ? 'Front' : 'Back'}</Text>
//         </View>
//         <TouchableOpacity style={styles.flipButton} onPress={handleFlipCamera}>
//           <MaterialIcons name="flip-camera-android" size={40} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   overlay: { flex: 1, justifyContent: 'space-between', padding: 20 },
//   feedbackContainer: { backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 8, padding: 15, marginTop: 50 },
//   text: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
//   errorText: { color: 'white', fontSize: 20, textAlign: 'center', padding: 20, backgroundColor: 'rgba(239, 68, 68, 0.7)', borderRadius: 8 },
//   flipButton: { alignSelf: 'center', padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 50, marginBottom: 20 },
// });

// import * as React from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import {
//   MediapipeCamera,
//   RunningMode,
//   usePoseDetection,
//   KnownPoseLandmarkConnections,
// } from "react-native-mediapipe";
// import { useCameraPermission } from "react-native-vision-camera";
// import { useSharedValue } from "react-native-reanimated";
// import { vec } from "@shopify/react-native-skia";
// import { PoseDrawFrame } from "../src/Drawing"; // Updated path
// import { useSettings } from "../src/app-settings"; // Updated path

// export default function CameraScreen() {
//   const { settings } = useSettings();
//   const camPerm = useCameraPermission();
//   const [permsGranted, setPermsGranted] = React.useState({ cam: camPerm.hasPermission });
//   const [activeCamera, setActiveCamera] = React.useState("back");

//   // Shared value for rendering pose connections
//   const connections = useSharedValue([]);

//   // Request camera permissions
//   const askForPermissions = React.useCallback(() => {
//     if (camPerm.hasPermission) {
//       setPermsGranted((prev) => ({ ...prev, cam: true }));
//     } else {
//       camPerm.requestPermission().then((granted) => {
//         setPermsGranted((prev) => ({ ...prev, cam: granted }));
//       });
//     }
//   }, [camPerm]);

//   // Toggle between front and back cameras
//   const handleSwitchCamera = () => {
//     setActiveCamera((current) => (current === "front" ? "back" : "front"));
//   };

//   // Handle pose detection results
//   const onResults = React.useCallback(
//     (results, vc) => {
//       const frameDims = vc.getFrameDims(results);
//       const landmarks = results.results[0]?.landmarks[0] ?? [];

//       // Process landmarks into connection lines
//       const newLines = [];
//       if (landmarks.length > 0) {
//         for (const connection of KnownPoseLandmarkConnections) {
//           const [a, b] = connection;
//           const pt1 = vc.convertPoint(frameDims, landmarks[a]);
//           const pt2 = vc.convertPoint(frameDims, landmarks[b]);
//           newLines.push(vec(pt1.x, pt1.y));
//           newLines.push(vec(pt2.x, pt2.y));
//         }
//       }
//       connections.value = newLines;

//       // Optional: Log for debugging
//       console.log(
//         `[Pose Detection] Landmarks: ${landmarks.length}, Inference Time: ${results.inferenceTime}ms`
//       );
//     },
//     [connections]
//   );

//   // Handle pose detection errors
//   const onError = React.useCallback((error) => {
//     console.error("Pose detection error:", error);
//   }, []);

//   // Configure pose detection
//   const poseDetection = usePoseDetection(
//     { onResults, onError },
//     RunningMode.LIVE_STREAM,
//     `${settings.model}.task`,
//     {
//       numPoses: 1,
//       minPoseDetectionConfidence: 0.5,
//       minPosePresenceConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//       delegate: settings.processor || "GPU",
//       fpsMode: "none",
//     }
//   );

//   // Render camera and pose drawing if permissions are granted
//   if (permsGranted.cam) {
//     return (
//       <View style={styles.container}>
//         <MediapipeCamera
//           style={styles.box}
//           solution={poseDetection}
//           activeCamera={activeCamera}
//           resizeMode="cover"
//         />
//         <PoseDrawFrame connections={connections} style={styles.box} />
//         <Pressable style={styles.cameraSwitchButton} onPress={handleSwitchCamera}>
//           <Text style={styles.cameraSwitchButtonText}>Switch Camera</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // Render permissions prompt if not granted
//   return <NeedPermissions askForPermissions={askForPermissions} />;
// }

// // Permissions prompt component
// const NeedPermissions = ({ askForPermissions }) => (
//   <View style={styles.container}>
//     <View style={styles.permissionsBox}>
//       <Text style={styles.noPermsText}>
//         Allow App to use your Camera and Microphone
//       </Text>
//       <Text style={styles.permsInfoText}>
//         App needs access to your camera in order for Object Detection to work.
//       </Text>
//     </View>
//     <Pressable style={styles.permsButton} onPress={askForPermissions}>
//       <Text style={styles.permsButtonText}>Allow</Text>
//     </Pressable>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFF0F0",
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   box: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//   },
//   permsButton: {
//     padding: 15.5,
//     paddingRight: 25,
//     paddingLeft: 25,
//     backgroundColor: "#F95F48",
//     borderRadius: 5,
//     margin: 15,
//   },
//   permsButtonText: {
//     fontSize: 17,
//     color: "black",
//     fontWeight: "bold",
//   },
//   permissionsBox: {
//     backgroundColor: "#F3F3F3",
//     padding: 20,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#CCCACA",
//     marginBottom: 20,
//   },
//   noPermsText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "black",
//   },
//   permsInfoText: {
//     fontSize: 15,
//     color: "black",
//     marginTop: 12,
//   },
//   cameraSwitchButton: {
//     position: "absolute",
//     padding: 10,
//     backgroundColor: "#F95F48",
//     borderRadius: 20,
//     top: 20,
//     right: 20,
//   },
//   cameraSwitchButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });


// CameraScreen.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, AppState } from 'react-native';
import {
    MediapipeCamera,
    RunningMode,
    usePoseDetection,
    KnownPoseLandmarkConnections,
    // For types, if you need to reference them in comments:
    // type DetectionError,
    // type PoseDetectionResultBundle,
    // type ViewCoordinator,
    Delegate, // For specifying processor
} from 'react-native-mediapipe';
import {
    useCameraPermission,
    // CameraPosition, // We'll manage this with a local state
} from 'react-native-vision-camera';
import { useSharedValue } from 'react-native-reanimated';
import { vec } from '@shopify/react-native-skia'; // SkPoint is a type, vec is a function
import { Canvas, Points } from "@shopify/react-native-skia"; // For Drawing
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Default settings (can be made configurable later)
const mediaPipeSettings = {
    maxResults: 1, // Usually, you detect one person for exercise
    threshold: 0.5, // Detection confidence
    processor: Delegate.GPU, // Or Delegate.CPU
    model: 'pose_landmarker_full', // Ensure this .task file is bundled
};

// Re-implementing PoseDrawFrame from the example directly here for simplicity
const PoseDrawFrame = ({ connections, style }) => {
    return (
        <Canvas style={style}>
            {/* Draw lines for connections */}
            <Points
                points={connections}
                mode="lines"
                color={"lightblue"}
                style={"stroke"}
                strokeWidth={3}
            />
            {/* Draw points for landmarks */}
            <Points
                points={connections} // Or a separate shared value just for landmark points if preferred
                mode="points"
                color={"red"}
                style={"stroke"}
                strokeWidth={10}
                strokeCap={"round"}
            />
        </Canvas>
    );
};

const NeedPermissionsComponent = ({ askForPermissions }) => (
    <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required to analyze your exercise.</Text>
        <Pressable style={styles.permissionButton} onPress={askForPermissions}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
    </View>
);

export default function CameraScreen() {
    const router = useRouter();
    const exerciseItem = useLocalSearchParams(); // Get exercise details if passed
    // console.log("Exercise Item on Camera Screen:", exerciseItem);

    const { hasPermission, requestPermission } = useCameraPermission();
    const [cameraPosition, setCameraPosition] = useState('back'); // 'front' or 'back'

    // This shared value will hold the points to be drawn (landmarks and connections)
    const landmarkConnections = useSharedValue([]); // SkPoint[] equivalent

    // AppState to manage camera activity when app goes to background/foreground
    const [appIsActive, setAppIsActive] = useState(AppState.currentState === 'active');

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            setAppIsActive(nextAppState === 'active');
        });
        return () => {
            subscription.remove();
        };
    }, []);


    const onPoseResults = useCallback(
        (resultsBundle /*: PoseDetectionResultBundle*/, viewCoordinator /*: ViewCoordinator*/) => {
            // console.log(`Inference Time: ${resultsBundle.inferenceTime}ms`);
            // console.log(`Input Image: ${resultsBundle.inputImageWidth}x${resultsBundle.inputImageHeight}`);

            const landmarks = resultsBundle.results[0]?.landmarks[0] || []; // results.results[0].landmarks[0]

            if (landmarks.length > 0) {
                const newLines = [];
                // Transform normalized landmarks to view coordinates and prepare for Skia
                const frameDims = viewCoordinator.getFrameDims(resultsBundle);

                for (const connection of KnownPoseLandmarkConnections) {
                    const [startIndex, endIndex] = connection;
                    const point1 = landmarks[startIndex];
                    const point2 = landmarks[endIndex];

                    if (point1 && point2) { // Ensure both points exist
                         // Convert normalized coordinates (0.0-1.0) to screen coordinates
                        const skPoint1 = viewCoordinator.convertPoint(frameDims, point1);
                        const skPoint2 = viewCoordinator.convertPoint(frameDims, point2);

                        newLines.push(vec(skPoint1.x, skPoint1.y));
                        newLines.push(vec(skPoint2.x, skPoint2.y));
                    }
                }
                landmarkConnections.value = newLines;

                // ---- YOUR KEYPOINT PROCESSING LOGIC GOES HERE ----
                // Access landmarks (e.g., landmarks[0].x, landmarks[0].y)
                // Implement your rep counting and feedback logic.
                // For example, to get the nose keypoint (index 0 for BlazePose model):
                // const nose = landmarks[0];
                // if (nose) {
                // console.log(`Nose - x: ${nose.x}, y: ${nose.y}, visibility: ${nose.visibility}`);
                // }
                //
                // You'll need to understand the MediaPipe Pose landmark indices:
                // https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/index#keypoints
                // ----------------------------------------------------

            } else {
                landmarkConnections.value = []; // Clear drawings if no landmarks
            }
        },
        [landmarkConnections /* Add any other dependencies, e.g., exerciseItem if logic changes per exercise */]
    );

    const onPoseError = useCallback((error /*: DetectionError*/) => {
        console.error(`Pose Detection Error: ${error.message || error}`);
    }, []);

    const poseDetection = usePoseDetection(
        {
            onResults: onPoseResults,
            onError: onPoseError,
        },
        RunningMode.LIVE_STREAM,
        `${mediaPipeSettings.model}.task`, // Make sure this file is in your assets
        {
            // VisionCamera specific options can be passed here via poseDetection.cameraProps
            // For react-native-mediapipe specific options:
            delegate: mediaPipeSettings.processor,
            maxNumPoses: mediaPipeSettings.maxResults,
            minPoseDetectionConfidence: mediaPipeSettings.threshold,
            minTrackingConfidence: 0.5, // Default, adjust as needed
            // Forcing orientation might be useful depending on your UI
            // forceCameraOrientation: 'portrait',
            // forceOutputOrientation: 'portrait',
        }
    );

    const handleRequestPermission = async () => {
        const result = await requestPermission();
        // The `hasPermission` state will update automatically via the hook
    };

    const toggleCamera = () => {
        setCameraPosition(prev => (prev === 'front' ? 'back' : 'front'));
    };

    if (!hasPermission) {
        return <NeedPermissionsComponent askForPermissions={handleRequestPermission} />;
    }

    if (!appIsActive) {
        // Optionally render a placeholder or nothing if app is not active,
        // to prevent camera access issues in background
        return <View style={styles.container}><Text>App is in background</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.exerciseNameText}>Performing: {exerciseItem?.name || 'Exercise'}</Text>
            {poseDetection ? (
                <>
                    <MediapipeCamera
                        style={StyleSheet.absoluteFill}
                        solution={poseDetection}
                        activeCamera={cameraPosition}
                        resizeMode="cover" // Or "contain"
                        // You can pass camera specific props here if needed
                        // e.g., cameraProps={{ fps: 30, videoStabilizationMode: 'auto' }}
                    />
                    <PoseDrawFrame connections={landmarkConnections} style={StyleSheet.absoluteFill} />
                </>
            ) : (
                <Text>Loading MediaPipe Solution...</Text>
            )}

            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="close-circle" size={hp(5)} color="#f43f5e" />
            </Pressable>
            <Pressable onPress={toggleCamera} style={styles.switchCameraButton}>
                <Ionicons name="camera-reverse" size={hp(4)} color="white" />
            </Pressable>

            {/* Add your Start/Stop button, Rep Counter display, Feedback Text here */}
            <View style={styles.controlsContainer}>
                <Text style={styles.repCountText}>Reps: 0</Text>
                <Text style={styles.feedbackText}>Feedback: Keep your back straight!</Text>
                {/* <Pressable style={styles.startButton}><Text>Start</Text></Pressable> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionText: {
        fontSize: hp(2.2),
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#f43f5e',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(8),
        borderRadius: 8,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: hp(2),
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: hp(6),
        left: wp(4),
        zIndex: 10,
    },
    switchCameraButton: {
        position: 'absolute',
        top: hp(6),
        right: wp(4),
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: wp(2),
        borderRadius: wp(5),
        zIndex: 10,
    },
    exerciseNameText: {
        position: 'absolute',
        top: hp(13),
        alignSelf: 'center',
        color: 'white',
        fontSize: hp(2.5),
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        zIndex: 10,
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: wp(4),
        alignItems: 'center',
    },
    repCountText: {
        fontSize: hp(3),
        color: 'white',
        fontWeight: 'bold',
        marginBottom: hp(1),
    },
    feedbackText: {
        fontSize: hp(2),
        color: 'lightgreen',
        marginBottom: hp(2),
    },
    // Add styles for start button etc.
});