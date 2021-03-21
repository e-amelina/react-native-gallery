import React, { Component, useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { StyleSheet, Dimensions } from 'react-native';
import { StateData } from './interfaces/stateData';
import { GalleryComponentData } from './interfaces/galleryComponentData';

import getPhotos from './api/dataApi';
import {Gallery} from './components/gallery';
import {Modal} from './components/modal'
import { PictureData } from './interfaces/pictureData';


export const GalleryContext = React.createContext<GalleryComponentData>({});
const RootStack = createStackNavigator();
const LIMIT = 20;

// loadPictures = () : void => {
//   this.setState((state: StateData) => ( {page: state.page + 1} ));
//   getPhotos(this.state.page, LIMIT).then(photos => {
//     this.setState((state: StateData) =>   
//        ({
//         galleryData: state.galleryData.concat(photos),
//         isLoading: false
//        })           
//     );
//   })
// }


export default function App() {

  const [galleryData, setData] = useState<PictureData[]>([]);
  const [page, setPage] = useState(1);

    useEffect(() => {
      getPhotos(page, LIMIT)
      .then(photos => {
        setData(galleryData.concat(photos));
      })      
    }, [page]);

    const loadPicture = () => {
      setPage(page + 1);   
    };

      return (
        <NavigationContainer>

          {(galleryData && <GalleryContext.Provider 
            value={{
                galleryData: galleryData,
                loadPictures: loadPicture,
              }}
              >
            <RootStack.Navigator mode="modal">
              {console.log(galleryData)}
              <RootStack.Screen name="gallery" component={Gallery} options={{ headerShown: false }}/>
              <RootStack.Screen name="modal" component={Modal} />
            </RootStack.Navigator>  
          </GalleryContext.Provider>)}

        </NavigationContainer>
      )
  }


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
