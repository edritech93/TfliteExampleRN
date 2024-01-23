// import * as React from 'react';
// import {StyleSheet, View} from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {useTensorflowModel} from 'react-native-fast-tflite';
// import {useResizePlugin} from 'vision-camera-resize-plugin';

// export default function App() {
//   const permission = useCameraPermission();
//   const device = useCameraDevice('front');
//   const {resize} = useResizePlugin();
//   const objectDetection = useTensorflowModel(
//     require('assets/mobile_face_net.tflite'),
//   );
//   const model =
//     objectDetection.state === 'loaded' ? objectDetection.model : undefined;

//   React.useEffect(() => {
//     permission.requestPermission();
//   }, [permission]);

//   const frameProcessor = useFrameProcessor(
//     frame => {
//       'worklet';
//       if (model == null) return;

//       // 1. Resize 4k Frame to 192x192x3 using vision-camera-resize-plugin
//       const data = resize(frame, {
//         size: {
//           width: 192,
//           height: 192,
//         },
//         pixelFormat: 'rgb-uint8',
//       });

//       // 2. Run model with given input buffer synchronously
//       const outputs = model.runSync([data]);

//       // 3. Interpret outputs accordingly
//       const detection_boxes = outputs[0];
//       const detection_classes = outputs[1];
//       const detection_scores = outputs[2];
//       const num_detections = outputs[3];
//       console.log(`Detected ${num_detections[0]} objects!`);

//       for (let i = 0; i < detection_boxes.length; i += 4) {
//         const confidence = detection_scores[i / 4];
//         if (confidence > 0.7) {
//           // 4. Draw a red box around the detected object!
//           const left = detection_boxes[i];
//           const top = detection_boxes[i + 1];
//           const right = detection_boxes[i + 2];
//           const bottom = detection_boxes[i + 3];
//           const rect = SkRect.Make(left, top, right, bottom);
//           frame.drawRect(rect, SkColors.Red);
//         }
//       }
//     },
//     [model],
//   );

//   return (
//     <View style={styles.container}>
//       {permission.hasPermission && device != null && (
//         <Camera
//           device={device}
//           style={StyleSheet.absoluteFill}
//           isActive={true}
//           pixelFormat="yuv"
//           frameProcessor={frameProcessor}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
// });
