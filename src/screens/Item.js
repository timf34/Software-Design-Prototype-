import {ref, getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react'
import { Image, Text, SafeAreaView, View,StyleSheet} from 'react-native';
import { storage, db } from '../../firebase';





export default function Product(props){
    //handle image url request from firestore
    const[image, setImage] = useState();
    imageRef = ref(storage, 'sketch.jpg');



        //if image is null, get url from the database
        if(!image){
        getDownloadURL(imageRef)
        .then((url)=>{setImage(url);});
        }
  
    
    
    return(
        <SafeAreaView>
            <View style={styles.imageBox}>
                <Image source={{uri: image}} style={styles.image}/>
            </View>
        </SafeAreaView>
    );


}


const styles = StyleSheet.create({

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    image:{
        width: '100%',
        height: '100%',
    },

})