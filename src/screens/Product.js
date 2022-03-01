import React, { useState } from 'react'
import { ImageBackground,Dimensions, StyleSheet,View, Text } from 'react-native';
import {ref, getDownloadURL } from 'firebase/storage';
import {storage} from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Product({navigation, route}){

    const[image, setImage] = useState();
    imageRef = ref(storage, 'Screenshot_2022-01-26-08-50-53-28_1c337646f29875672b5a61192b9010f9.jpg');

    if(!image){
        getDownloadURL(imageRef)
        .then((url)=>{setImage(url);});
    }

    return (

        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.picture}>
                    <ImageBackground source={{uri: image}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}></ImageBackground>
                        <View style={styles.infoBox}>
                            <View style={styles.title}>
                                <Text style={styles.textTitle}> Title</Text>
                            </View>
                            <View style={styles.description}>
                            <Text style={styles.textDescription}>Description Description Description Description Description Description Description Description Description Description Description Description </Text>
                            </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#012E40'
    },
    picture: {
        backgroundColor: '#fff',
    },
    infoBox: {
        backgroundColor: '#012E40',
        alignSelf: 'flex-end',
        height: Dimensions.get('window').height - Dimensions.get('window').width,
        width: '100%',
    },
    title:{
        flex: 1,
        backgroundColor: '#025159',
    },
    textTitle:{
        color: '#F28705',
        alignSelf: 'auto',
        margin: 5,
        fontSize: 40,
    },
    description:{
        flex: 3,
        backgroundColor: '#012E40',
    },
    textDescription:{
        color: '#03A696',
        alignSelf: 'auto',
        margin: 5,
        fontSize: 20,
    },
  
  });
