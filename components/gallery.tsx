import { StyleSheet, Dimensions, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { GalleryContext } from "../App";
import React from 'react';

export function Gallery({navigation}: any) {
    return (
      <GalleryContext.Consumer> 
        { ({galleryData, loadPictures}) => 
            <FlatList style={styles.container}
                numColumns={2}
                data={galleryData}
                onEndReached={()=> {
                    if(loadPictures) {
                        loadPictures();
                    }
                }}
                onEndReachedThreshold={0.2}
                renderItem = {({item, index})=> (
                <TouchableOpacity  
                  style={styles.wrapImg}
                  activeOpacity = { .5 } 
                  key={item.id.toString() + 'wrap'}
                  onPress={() => {                      
                    navigation.navigate("modal", {
                        pictureTitle: item.title,
                        pictureUrl:item.url
                    })
                  }}>

                  <Image
                  style={styles.image}
                  key={item.id.toString() + 'image'}

                  source={{
                      uri: item.thumbnailUrl
                  }}
                  />
                </TouchableOpacity>
              )}
            />
        }
      </GalleryContext.Consumer>
      
    );
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
    }
});