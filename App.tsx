import React, { Component, useCallback, useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { StyleSheet, Dimensions } from 'react-native';
import { StateData } from './interfaces/stateData';
import { GalleryComponentData } from './interfaces/galleryComponentData';

import getPhotos from './api/dataApi';
import {Gallery} from './components/gallery';
import {Modal} from './components/modal'

const LIMIT = 50;

export const GalleryContext = React.createContext<GalleryComponentData>({});
const RootStack = createStackNavigator();


export default class App extends Component {
  
    state: StateData = {
      isLoading: true,
      isSelectedImage: false,
      galleryData : [],
      page: 0,
    }

    componentDidMount() {
      getPhotos(this.state.page, LIMIT).then(photos => {
        this.setState((state: StateData) =>   
           ({
            galleryData: state.galleryData.concat(photos),
            isLoading: false
           }));
        })
    }

    loadPictures = () : void => {
      this.setState((state: StateData) => ( {page: state.page + 1} ));
      getPhotos(this.state.page, LIMIT).then(photos => {
        this.setState((state: StateData) =>   
           ({
            galleryData: state.galleryData.concat(photos),
            isLoading: false
           })           
        );
      })
    }

    render() {
      return (
        <NavigationContainer>
          <GalleryContext.Provider 
            value={{
                isLoading: this.state.isLoading, 
                galleryData: this.state.galleryData,
                loadPictures: this.loadPictures,
                page: this.state.page
              }}>
            <RootStack.Navigator mode="modal">
              <RootStack.Screen name="gallery" component={Gallery} options={{ headerShown: false }}/>
              <RootStack.Screen name="modal" component={Modal} />
            </RootStack.Navigator>  
          </GalleryContext.Provider>

        </NavigationContainer>
      )
  }
}

import { createStackNavigator } from '@react-navigation/stack';
import { PictureData } from './interfaces/pictureData';



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
