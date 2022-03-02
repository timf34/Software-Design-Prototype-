import {ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import React, { useState, useEffect } from 'react'
import { Button, Image, Text, SafeAreaView, View,TextInput,StyleSheet} from 'react-native';
import { storage } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useNavigation } from '@react-navigation/native';

async function uploadImage(uri, fname) {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileName = fname;
    const imageRef = ref(storage, `${fileName}.jpeg`);
  
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });
  
    blob.close();
  
    return {fileName};
  }

export default function AddItem({navigation}){
    //handle image url request from firestore
    const[image, setImage] = useState('default.jpeg');
    const[url, setUrl] = useState();
    const[name, setName] = useState();
    const[desc, setDesc] = useState();
    const[itemType, setItemType] = useState();

    const getImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
            const filename = uploadImage(result.uri, name);
            console.log(filename);
            getDownloadURL(ref(storage, `${filename}.jpeg`))
            .then((url)=>{setUrl(url)});
        };
    
    }

    // const pickImage = async() => {
    //     const result = getImage();
    //     filename = await uploadImage(result.uri);
    //     setImage(filename)
    // }

    const updateDatabase = async() => {
        await setDoc((db, "Items", image), {
            name: name,
            type: itemType,
            desc: desc,
            imageUrl: image
        });

        navigation.navigate('Product');
    }

    getDownloadURL(ref(storage, image))
    .then((url)=>{setUrl(url)});

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageBox}>
                <Image source={{uri: url}} style={styles.image}/>
            
            <Button
                titleStyle={{fontSize: 30,}}
                onPress={getImage}
                title = "choose image"
            />
            <TextInput
                style={styles.textBox}
                onChangeText={setName}
                value={name}
                placeholder ='Item Name'
            />
            <TextInput
                style={styles.textBox}
                onChangeText={setItemType}
                value={itemType}
                placeholder ='Item Type'
            />
            <TextInput
                style={styles.textBox}
                onChangeText={setDesc}
                value={desc}
                placeholder ='Item Description'
            />
            <Button
                style={styles.button}
                onPress={updateDatabase}
                title = "Add item"
            />
            </View>
        </SafeAreaView>
    );


}


const styles = StyleSheet.create({

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    textBox:{
        fontSize: 30,
    },

    image:{
        width: '100%',
        height: '70%',
    },

    container: {
        flex: 1,
        justifyContent: 'center',

    },   

})