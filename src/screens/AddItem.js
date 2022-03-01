import {ref, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react'
import { Image, Text, SafeAreaView, View,StyleSheet} from 'react-native';
import { storage } from '../../firebase';




export default function AddItem(){
    //handle image url request from firestore
    const[image, setImage] = useState();
    imageRef = ref(storage, 'Screenshot_2022-01-26-08-50-53-28_1c337646f29875672b5a61192b9010f9.jpg');

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