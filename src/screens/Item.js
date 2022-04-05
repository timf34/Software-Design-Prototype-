import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { Image, Text, SafeAreaView, Dimensions, View, StyleSheet, StatusBar } from 'react-native';
import Button from '../components/Button';
import { storage, db } from '../../firebase';
import { useRoute } from "@react-navigation/native";
//Class template for the item fetching from firestore
class item {
    constructor (owner_name ,name, type, desc, imageUrl, price, owner_ID) {
        this.owner_name = owner_name;
        this.name = name;
        this.type = type;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.price = price;
        this.owner_ID = owner_ID;
    }
    toString() {
        return this.owner_name + ', ' + this.name + ', '+ this.type + ', ' + this.desc + ',' + this.imageUrl + ',' + this.price + ',' + this.owner_ID;
    }
}

 

//function to fetch the data from the database and convert it to the item object
const itemConverter = {
    toFirestore: (item) => {
        return {
            owner_name: item.owner_name,
            name: item.name,
            type: item.type,
            desc: item.desc,
            imageUrl : item.imageUrl,
            price : item.price,
            owner_ID : item.owner_ID
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new item(data.owner_name, data.name, data.type, data.desc, data.imageUrl, data.price, data.owner_ID);
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
                    <Text style={{fontSize: 30, textAlignVertical: 'center'}}>Fetching...</Text>
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

        
            //should be if(item.owner_ID == user.uid) but using my own id for now
         if (item.owner_ID == "09mMnm236LUYOAFgK9xknmD57Ge2" ){
            

            return(
                <SafeAreaView style={styles.container}>
                    <View style={{flex: 1}}>
                        <Image source={{uri: image}} style={styles.image}/>
                    </View>
    
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                        <Button mode="contained">
                            Save
                        </Button>
                        <Button mode="contained">
                            Edit
                        </Button>
                        <Text style={styles.itemName}>{item.name + '   ' + item.price + ' €'}</Text>
                        <Text style={styles.itemType}>{"Posted by " + item.owner_name}</Text>
                        <Text style={styles.itemType}>{item.type}</Text>
                        <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>  
                </SafeAreaView>
            );
         } else {
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
                    <Text style={styles.itemType}>{"Posted by " + item.owner_name}</Text>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>  
            </SafeAreaView>
        );
     }
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        flex: 1,
        justifyContent: 'flex-start',

    },   

})