import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Camera,
  Frame,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {useResizePlugin} from 'vision-camera-resize-plugin';
import {useTensorflowModel} from 'react-native-fast-tflite';

export default function App(): React.ReactNode {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {resize} = useResizePlugin();
  const {model} = useTensorflowModel(
    require('./assets/object_detector.tflite'),
  );
  const device = useCameraDevice('back');

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const frameProcessor = useFrameProcessor(
    (frame: Frame) => {
      'worklet';
      if (model == null) {
        return;
      }
      const data = resize(frame, {
        size: {
          width: 640,
          height: 640,
        },
        pixelFormat: 'rgb-uint8',
      });
      const array = new Uint8Array(data);
      const output = model.runSync([array]);
      console.log('Result: ' + output.length);
    },
    [model],
  );

  if (hasPermission && device != null) {
    return (
      <Camera
        device={device}
        style={StyleSheet.absoluteFill}
        isActive={true}
        pixelFormat={'yuv'}
        frameProcessor={frameProcessor}
      />
    );
  } else {
    return null;
  }
}
