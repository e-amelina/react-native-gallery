import React, { Component, useCallback, useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, ActivityIndicator, FlatList } from 'react-native';
import { StateData } from './interfaces/stateData';
import { GalleryComponentData } from './interfaces/galleryComponentData';

import getPhotos from './api/dataApi';
import {Gallery} from './components/gallery'



const LIMIT = 20;




export const GalleryContext = React.createContext<GalleryComponentData>({})

export default class App extends Component{

    state: StateData = {
      isLoading: true,
      isSelectedImage: false,
      galleryData : [],
    }

    componentDidMount() {
      getPhotos(0, LIMIT).then(photos => {
        this.setState({ 
            galleryData: photos,
            isLoading: false
          });
      })
    }

    choosePicture(id: number) {
      this.setState({
        selectedImage: this.state.galleryData.filter(picture => picture.id === id)[0],
        isSelectedImage: true,
      });      
    }
    

    // const [galleryData, setGalleryData] = useState<PictureData[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [selectedImage, setImage] = useState<PictureData>();

    // const choosePicture = useCallback((id: number) => {
    //   setImage(galleryData.filter(photo => photo.id === id)[0]);
    //   console.log(selectedImage);
    //   console.log(galleryData);
      
    //   console.log(id);
      
      
    // }, [])
   

    // useEffect(() =>  {
    //   getPhotos(0, LIMIT).then(photos => {
    //     console.log(photos);
        
    //     setGalleryData(photos);
    //     console.log(galleryData);
        
    //     setIsLoading(false);
    //     console.log(isLoading);
        
    //   });
    // }, []);

    

    render() {
      return (
        <NavigationContainer>
          <GalleryContext.Provider value={{isLoading: this.state.isLoading, galleryData: this.state.galleryData, choosePicture: this.choosePicture}}>
            <Stack.Navigator>
              <Stack.Screen name="gallery" component={Gallery}/>
            </Stack.Navigator>  
          </GalleryContext.Provider>

        </NavigationContainer>
      )
  }
}

import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

const styles = StyleSheet.create({
  wrapImg: {
    height: Dimensions.get('window').height/4 - 12,
    width: Dimensions.get('window').width/2 - 4,
    margin: 2,
    padding: 2
  },
  image: {
    alignSelf: 'stretch',
    flex: 1
  },
  container: {
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  imageName: {
    color: '#fff'
  },
  close: {

  },
});
