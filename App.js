import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Instal·lar les llibreries : npx expo install expo-camera expo-media-library
 * https://docs.expo.dev/versions/latest/sdk/camera/
 * https://docs.expo.dev/versions/latest/sdk/media-library/
 */
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


// S'han de configurar els permisos per iOS

export default function App() {
  // variables d'estat per la camera
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

 
  // variable estat video : graba o no graba (boolea)
  const [isRecording, setIsRecording] = useState(false);

  // Fer la captura fotogràfica
  async function takePicture() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      alert('La foto ha set desada a la biblioteca');
    }
  }

  // Iniciar grabació video
  async function startRecording() {
    if (cameraRef) {
      setIsRecording(true);
      const video = await cameraRef.recordAsync();
      await cameraRef.stopRecording();
      await MediaLibrary.createAssetAsync(video.uri);
      setIsRecording(false);
      alert('El video ha set desat a la biblioteca');
    }
  }

  // Parar grabació video
  async function stopRecording() {
    if (cameraRef && isRecording) {
      setIsRecording(false);
      await cameraRef.stopRecording();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      
      <Camera ref={ref => setCameraRef(ref)} style={{ flex: 1 }} type={type}>
        
        {/** El contenidor dels 3 botons */}
        <View style={styles.buttonContainer}>

          {/** gira la camera */}
          <TouchableOpacity style={styles.button} onPress={() => setType(type === Camera.Constants.Type.back? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
            <Text style={styles.buttonText}> Girar </Text>
          </TouchableOpacity>
          
          {/** fa la foto */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}> Foto </Text>
          </TouchableOpacity>

          {/* entre claudators --> executa el codi javascript
              Si està grabant --> si apretem para de grabar, si no inicia la grabació. */}
          {isRecording? (
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Text style={styles.buttonText}> Parar Video </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startRecording}>
              <Text style={styles.buttonText}> Fer Video </Text>
            </TouchableOpacity>
          )}

        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});