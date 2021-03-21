import React, { StyleSheet, Dimensions, Image, TouchableOpacity, View } from "react-native"
import { PictureData } from "../interfaces/pictureData"
// import { createElement } from "react"

export function Photo (element: PictureData) {
    
     return (
     <View>
        <TouchableOpacity  
            style={styles.wrapImg}
            activeOpacity = { .5 } 
            onPress={() => {
                // this.choosePicture(element.id);
            }}>
        <Image
            style={styles.image}
            source={{
                uri: element.thumbnailUrl
            }}
        />
        </TouchableOpacity>
    </View>)
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
    }
})