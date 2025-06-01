
// import React from 'react';
// import { Stack } from 'expo-router';
// import { enableScreens } from 'react-native-screens';


// export default function _layout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       {/* <Stack.Screen
//         name="exercises"
//         options={{
//           presentation: 'fullScreenModal',
//         }}
//       />
//       <Stack.Screen
//         name="ExerciseDetails"
//         options={{
//           presentation: 'modal',
//         }}
//       /> */}
//     </Stack>
//   );
// }
import { Stack } from 'expo-router';
import { SettingsProvider } from '../components/app-settings';

export default function Layout() {
  return (
    <SettingsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="home" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="exercises" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="ExerciseDetails" options={{ presentation: 'modal' }} />
        <Stack.Screen name="CameraScreen" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </SettingsProvider>
  );
}
