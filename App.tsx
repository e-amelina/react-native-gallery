import React, { Component, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, ActivityIndicator, FlatList } from 'react-native';
import { PictureData } from './interfaces/pictureData';
import getPhotos from './api/dataApi';
import { Photo } from './components/photo';



interface StateType {
  isLoading: boolean,
  isSelectedImage: boolean,
  galleryData: PictureData[],
  selectedImage?: PictureData,
}

const LIMIT = 20;

const keyExtractor = (photo: PictureData) => photo.id.toString();

// function choosePicture(id: number) : PictureData {
//       return 
//       this.setState({
//         selectedImage: this.state.galleryData.filter(picture => picture.id === id)[0],
//         isSelectedImage: true,
//       })
//     }


export default class App extends Component{

    state:StateType = {
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
        <>
          {/* {isSelectedImage && 
            <Modal style={styles.modal} animationType={'fade'} transparent={true} 
                  onRequestClose={()=> {}} visible={isSelectedImage}>
                  <View style={styles.modal}>
                    <Text style={styles.imageName} onPress={() => {                    
                      // this.setState({isSelectedImage: false})}}>
                      Close
                    </Text>
                    <Text style={styles.imageName}>
                      {/* {this.state?.selectedImage?.title}
                    </Text>
                    <Image style={styles.image} source={{
                        // uri:this.state?.selectedImage?.url,
                      }}>
                    </Image>
                  </View>
                </Modal> */}
          
          <ScrollView >
          <SafeAreaView style={styles.container}>
          {this.state.isLoading ? (<ActivityIndicator size='large'></ActivityIndicator>) :
          (
            <FlatList 
              data={this.state.galleryData}
              keyExtractor={keyExtractor}
              renderItem = {({item})=> (
                <TouchableOpacity  
                  style={styles.wrapImg}
                  activeOpacity = { .5 } 
                  onPress={() => {
                      this.choosePicture(item.id);
                  }}>
                  <Image
                  style={styles.image}
                  source={{
                      uri: item.thumbnailUrl
                  }}
                  />
                </TouchableOpacity>
              )}
            />
          )
          }
          </SafeAreaView> 
        </ScrollView>    
        </>
      )
  }
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
