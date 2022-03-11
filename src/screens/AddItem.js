import {ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import {Image, Text, KeyboardAvoidingView, SafeAreaView, View,TextInput,StyleSheet,Dimensions} from 'react-native'
import Button from '../components/Button'
import { storage, db } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import {addDoc, collection, doc, setDoc} from 'firebase/firestore'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'


//copy paste from the upload image tutorial on firebase
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
  
    const fileName = fname || nanoid(); //each image has a randomly generated id as a filename
    const imageRef = ref(storage, `${fileName}.jpeg`);
  
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });
  
    blob.close();
  
    return {fileName};
  }


export default function AddItem({navigation}){
    
    const[image, setImage] = useState('default.jpeg');
    const[name, setName] = useState();
    const[desc, setDesc] = useState();
    const[itemType, setItemType] = useState();

    //Get image path from library
    //TODO add multiple images functionality
    const getImage = async () => {
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

    //Upload item to the database
    const updateDatabase = async() => {

        //upload image to db
        const fileName = await uploadImage(image);

        console.log(fileName);

        const docRef = await addDoc(collection(db, "Items"), {
            name: name,
            type: itemType,
            desc: desc,
            imageUrl: fileName.fileName
        });
        
        //console.log(docRef.id);

        //move user to item page once its all done
        navigation.navigate('Item',{fileName: docRef.id});
    }

    return(
        //Keyboard avoiding moves some fields around in a weird way, there is probably a fix for it tho
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View 
                    style={{flex:1}}
                >
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>

                <View   
                    style={{flex:1}}
                >
                    <Button mode="contained" onPress={getImage} styles={{width: '90%'}}>
                        Choose Image
                    </Button>
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
                        style={styles.longtextBox}
                        onChangeText={setDesc}
                        value={desc}
                        placeholder ='Description'
                    />
                    <Button mode="contained" onPress={updateDatabase}>
                        Add Item
                    </Button>
                </View>
                
            </SafeAreaView>
        </KeyboardAvoidingView>
    );


}


const styles = StyleSheet.create({

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    textBox:{
        flex: 1,
        fontSize: 30,
    },

    longtextBox:{
        textAlignVertical: 'top',
        flex: 2,
        fontSize: 30,
    },

    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },

    container: {
        flex: 1,
        justifyContent: 'center',

    },   

})