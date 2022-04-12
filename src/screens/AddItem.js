import {ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import {Image, Text, KeyboardAvoidingView, SafeAreaView, View,TextInput,StyleSheet,Dimensions,StatusBar, Platform} from 'react-native'
import Button from '../components/Button'
import { storage, db } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import {addDoc, collection, doc, setDoc} from 'firebase/firestore'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import {onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase'
import * as Location from 'expo-location'; // TODO: add this for automatic location!!!


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
    
    const[image, setImage] = useState('default.jpeg')
    const[name, setName] = useState()
    const[desc, setDesc] = useState()
    const[itemType, setItemType] = useState()
    const[user, setUser] = useState()
    // TODO: add this block of code for location!
    const[location, setLocation] = useState()
    const[postalCode, setPostalCode] = useState()
    const [errorMsg, setErrorMsg] = useState(null);
    // TODO: to here!

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
    
        }
      });

    // TODO: add this for location!
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const place = await Location.reverseGeocodeAsync({
                        latitude : location.coords.latitude,
                        longitude : location.coords.longitude
            });

            // Get the postal code. Could also get the region ("county dublin") or other stuff.
            let postalCode;
            place.find( p => {
              postalCode = p.postalCode
              setPostalCode(p.postalCode)
            });

            //console.log("Debugging location - print to see the available options);
            // console.log(place); LocationGeocodedAddress: https://docs.expo.dev/versions/latest/sdk/location/#locationgeocodedaddress
            //console.log(postalCode);
            //console.log("end of city");
        })();
    }, []);

    let text_location = 'Waiting..';
    if (errorMsg) {
        text_location = errorMsg;
    } else if (location) {
        text_location = JSON.stringify(location);
    }
    // TODO: to here!


    //Get image path from library
    //TODO add multiple images functionality
    const getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
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
            owner_ID: user.uid,
            owner_name: user.displayName,
            name: name,
            type: itemType,
            desc: desc,
            location: postalCode, // TODO: add this for location!
            imageUrl: fileName.fileName,
            price: 0
        });
        
        //console.log(docRef.id);

        //move user to item page once its all done
        navigation.navigate('Item',{fileName: docRef.id});
    }

    if(!user){
        return(
            <SafeAreaView>
                <View>
                    <Text style={{fontSize: 30, textAlignVertical: 'center', textAlign: 'center'}}>Please sign in to add items!</Text>
                </View>
            </SafeAreaView>
        )
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        flex: 1,
        justifyContent: 'center',

    },   

})