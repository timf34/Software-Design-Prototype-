import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { Image, Text, SafeAreaView, Dimensions, View,StyleSheet} from 'react-native';
import Button from '../components/Button';
import { storage, db } from '../../firebase';
import { useRoute } from "@react-navigation/native";

//Class template for the item fetching from firestore
class item {
    constructor (name, type, desc, imageUrl ) {
        this.name = name;
        this.type = type;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.price = 0;
    }
    toString() {
        return this.name + ', ' + this.type + ', ' + this.desc + ',' + this.imageUrl + ',' + this.price;
    }
}

//function to fetch the data from the database and convert it to the item object
const itemConverter = {
    toFirestore: (item) => {
        return {
            name: item.name,
            type: item.type,
            desc: item.desc,
            imageUrl : item.imageUrl,
            price : item.price
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new item(data.name, data.type, data.desc, data.imageUrl, data.price);
    }
};

//The screen designed to be invoked with objectID to fetch it from the database (route.params.filename)

export default function Item(){
    //handle image url request from firestore
    const[image, setImage] = useState();
    const[item, setItem] = useState();
    const route = useRoute();

    const getData = async() => {
        //console.log("trying to access " + route.params.fileName);
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
                    <Text>Fetching...</Text>
                </View>
            </SafeAreaView>
        );

    } else {

        // console.log(item.imageUrl);
        // console.log(item.name);
        // console.log(item.type);
        // console.log(item.desc);

        if(item.imageUrl){
            imageRef = ref(storage, `${item.imageUrl}.jpeg`)
            getDownloadURL(imageRef)
            .then((url)=>{setImage(url);});
        }


        //TODO - make it look good ;)
        return(
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}>
                    <Image source={{uri: image}} style={styles.image}/>
                </View>

                <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Button mode="contained">
                        Save
                    </Button>
                    <Text style={styles.itemName}>{item.name + '   ' + item.price + ' €'}</Text>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
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

    itemName:{

        fontSize: 35,
    },

    itemType:{

        fontSize: 30,
    },

    itemDesc:{

        fontSize: 30,
    },

    itemPrice:{

        fontSize: 40,
    },

    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },   

})