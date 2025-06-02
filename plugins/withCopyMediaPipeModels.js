// plugins/withCopyMediaPipeModels.js
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('node:fs'); // Using 'node:fs' for clarity with modern Node.js
const path = require('node:path'); // Using 'node:path'

// --- IMPORTANT: Customize this list! ---
// Add the exact filenames of all .task models you want to copy.
const MODELS_TO_COPY = [
    'pose_landmarker_full.task',
    // 'pose_landmarker_lite.task', // Uncomment or add if you have this file too
    // Add other .task files if needed
];
// --- ---

module.exports = function withCopyMediaPipeModels(config) {
  return withDangerousMod(config, [
    'android', // Specifies that this modification is for the Android platform
    async (modConfig) => {
      // Get project root and the path to the native Android project (android/ folder)
      const projectRoot = modConfig.modRequest.projectRoot;
      const androidProjectRoot = modConfig.modRequest.platformProjectRoot;

      // Define the source directory (where your .task files are in your project)
      const sourceModelsDir = path.join(projectRoot, 'assets', 'mediapipe_models'); // Still assuming source is assets/mediapipe_models/

      // Define the destination directory (directly inside the native Android project's assets)
      // This will be YourProjectRoot/android/app/src/main/assets/
      const destinationAssetsDir = path.join(androidProjectRoot, 'app', 'src', 'main', 'assets');

      // Create the destination assets directory if it doesn't exist
      // This prevents errors if the 'assets' folder isn't there yet
      if (!fs.existsSync(destinationAssetsDir)) {
        fs.mkdirSync(destinationAssetsDir, { recursive: true });
      }

      // Loop through each model filename you listed in MODELS_TO_COPY
      for (const modelName of MODELS_TO_COPY) {
        const sourceModelPath = path.join(sourceModelsDir, modelName);
        // Destination path is now directly in destinationAssetsDir
        const destinationModelPath = path.join(destinationAssetsDir, modelName); 

        // Check if the source model file actually exists in your project's source folder
        if (fs.existsSync(sourceModelPath)) {
          try {
            // Copy the file
            fs.copyFileSync(sourceModelPath, destinationModelPath);
            // This message will appear in EAS Build logs if successful
            console.log(`[withCopyMediaPipeModels] Copied '${modelName}' directly to Android assets: ${destinationModelPath}`);
          } catch (e) {
            console.error(`[withCopyMediaPipeModels] Error copying '${modelName}':`, e);
          }
        } else {
          // This message will appear if a model listed in MODELS_TO_COPY isn't found
          console.warn(`[withCopyMediaPipeModels] Model '${modelName}' not found at ${sourceModelPath}. Skipping.`);
        }
      }
      // It's crucial to return the modified config object
      return modConfig;
    },
  ]);
};