import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native';
import Navigation from '../components/Navigation';

const { width, height } = Dimensions.get('window')

const images = [
  'https://i.imgur.com/RgvLbrH.jpg', // teku1
  'https://i.imgur.com/j1yBHIy.jpg', // eli2
  'https://i.postimg.cc/VLbjds27/tek2.jpg', // teku2
  'https://i.imgur.com/2dUZ1t1.jpg', // Feli
  'https://i.imgur.com/SojKZa1.jpg', // mati2
  'https://i.imgur.com/WSvV6xK.jpg', // eli
  'https://i.imgur.com/Xn4NvVe.jpg' // mati
]

export default class App extends React.Component {

  static navigationOptions = {
    header: null,
  };

  renderPage (image, index) {
    return (
      <View key={index} style={{flex: 1, alignContent:"center", alignItems: "center", alignSelf:"center"}}>
        <Image style={{ width: width*0.99, height: height*0.8 , marginTop:5}} source={{ uri: image } } />
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Navigation/>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={width}
        >
          {images.map((image, index) => this.renderPage(image, index))}
        </Carousel>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    //justifyContent: 'center'
  }
})
