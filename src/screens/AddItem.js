import {ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import React, { useState, useEffect } from 'react'
import { Button, Image, Text, SafeAreaView, View,TextInput,StyleSheet} from 'react-native';
import { storage, db } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import 'react-native-get-random-values';
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
  
    const fileName = fname || nanoid();
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

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    
    }

    // const pickImage = async() => {
    //     const result = getImage();
    //     filename = await uploadImage(result.uri);
    //     setImage(filename)
    // }

    const updateDatabase = async() => {

        const filename = await uploadImage(image);

        console.log(filename);

        const docRef = await addDoc(collection(db, "Items"), {
            name: name,
            type: itemType,
            desc: desc,
            imageUrl: filename
        });
        
        console.log(docRef.id);
        navigation.navigate('Item');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageBox}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            
            <Button
                titleStyle={{fontSize: 30,}}
                onPress={getImage}
                title = "choose image"
            />
            <TextInput
                style={styles.textBox}
                onChangeText={setName}
                value={name}
                placeholder ='Name'
            />
            <TextInput
                style={styles.textBox}
                onChangeText={setItemType}
                value={itemType}
                placeholder ='Type'
            />
            <TextInput
                style={styles.textBox}
                onChangeText={setDesc}
                value={desc}
                placeholder ='Description'
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