import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const placeholderImage = require('./assets/images/background-image.png');
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const pickImageAsync = async () => {
    let result  = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      console.log(result)
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    }else {
      alert('You did not select any image')
    }
  }
  const onReset = () => {
    setShowAppOptions(false)
  }
  const onAddSticker = () => {
    setIsModalVisible(true)
  }
  const onSaveImageAsync = () => {
    
  }
  const onModalClose= () => {
    setIsModalVisible(false)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer 
            placeholderImageSource={placeholderImage} 
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
        {
          showAppOptions 
          ? 
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
              </View>
            </View> 
          : 
            <View style={styles.footerContainer}>
              <Button onPress={pickImageAsync} theme="primary" label="Choose a photo" />
              <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
            </View>
        }
        
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style='auto' />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom:80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
