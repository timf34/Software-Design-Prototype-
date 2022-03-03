import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { Image, Text, SafeAreaView, View,StyleSheet} from 'react-native';
import { storage, db } from '../../firebase';
import { useRoute } from "@react-navigation/native";


class item {
    constructor (name, type, desc, imageUrl ) {
        this.name = name;
        this.type = type;
        this.desc = desc;
        this.imageUrl = imageUrl;
    }
    toString() {
        return this.name + ', ' + this.type + ', ' + this.desc + ',' + this.imageUrl;
    }
}

const itemConverter = {
    toFirestore: (item) => {
        return {
            name: item.name,
            type: item.type,
            desc: item.desc,
            imageUrl : item.imageUrl
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new item(data.name, data.type, data.desc, data.imageUrl);
    }
};

//used with "filename" variable to access it in the database

export default function Item(){
    //handle image url request from firestore
    const[image, setImage] = useState();
    const[item, setItem] = useState();
    const route = useRoute();

    const getData = async() => {
        console.log("trying to access " + route.params.fileName);
        const docRef = doc(db, "Items", route.params.fileName).withConverter(itemConverter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Convert to City object
            const item = docSnap.data();
            setItem(item);
          } else {
            console.log("No such document!");
          }
    }

    if(!item){
        getData();

        return(
            <SafeAreaView>
                <View style={styles.imageBox}>
                    <Text>Looking for it...</Text>
                </View>
            </SafeAreaView>
        );

    } else {

        console.log(item.imageUrl);
        console.log(item.name);
        console.log(item.type);
        console.log(item.desc);

        if(item.imageUrl){
            imageRef = ref(storage, `${item.imageUrl}.jpeg`)
            getDownloadURL(imageRef)
            .then((url)=>{setImage(url);});
        }

        return(
            <SafeAreaView>
                <View style={styles.imageBox}>
                    <Image source={{uri: image}} style={styles.image}/>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.type}</Text>
                    <Text style={styles.text}>{item.desc}</Text>
                </View>
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({

    imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 30,
    },

    image:{
        width: '100%',
        height: '80%',
    },

})