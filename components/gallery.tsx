import React, { StyleSheet, Dimensions, Image, TouchableOpacity, View, SafeAreaView, ActivityIndicator } from "react-native"
import { FlatList } from "react-native-gesture-handler";
import { GalleryContext } from "../App";

const keyExtractor = (photo: PictureData) => photo.id.toString();


export function Gallery() {
    return (
      <GalleryContext.Consumer> 
        { ({isLoading, galleryData, choosePicture}) => 
          <SafeAreaView style={styles.container}>
          {isLoading ? (<ActivityIndicator size='large'></ActivityIndicator>) :
          (
            <FlatList 
              data={galleryData}
              keyExtractor={keyExtractor}
              renderItem = {({item})=> (
                <TouchableOpacity  
                  style={styles.wrapImg}
                  activeOpacity = { .5 } 
                  onPress={() => {
                      // choosePicture(item.id);
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
      
        }
  
      </GalleryContext.Consumer>
      
    );
  }