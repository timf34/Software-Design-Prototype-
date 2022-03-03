import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import{db, storage} from '../../firebase';
import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDocs,collection, getDoc } from "firebase/firestore";

const numColumns = 2;

class ItemFull {
  constructor (id, name, imageUrl ) {
      this.id = id;
      this.name = name;

      this.imageUrl = imageUrl;
  }
  toString() {
      return this.id + ',' + this.name + ', ' + this.type + ', ' + this.desc + ',' + this.imageUrl;
  }
}

export default function Explore({navigation}){
  const [items, setItems] = useState();
  var data = [];

  const getItems = async() => {
    const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach((doc) => {
      const snapshot = doc.data();
      data.push(new ItemFull(doc.id, snapshot.name, snapshot.imageUrl));
    });
    setItems(data);
  }

  const getUrl = async({url}) => {
    if(url){
      imageRef = ref(storage, `${url}.jpeg`)
      getDownloadURL(imageRef)
      .then((url)=>{return url;});
    }
  }

  const renderItem = ({item}) => {

    if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
    }
    
    return (
        <Pressable 
            onPress={() => {navigation.navigate('Item', {fileName: item.id})}}
        >    
            <ImageBackground 
            source={{uri: 'https://i.imgur.com/Zm8VQYf.jpeg'}} 
            style={styles.item} 
            imageStyle = {{borderRadius: 20}}
            >
              <Text style={{fontSize: 30, color: 'red'}}>{item.name}</Text>
            </ImageBackground>
        </Pressable>
        );

  };

  if(!items){
    getItems();
  } else {
    return (
      <FlatList
          data={items}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
          refreshing = {false}
          onRefresh = {getItems}
      />
  );
  }
  
  console.log(items);

  return(<View><Text>bread</Text></View>);
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  item: {
    backgroundColor: '#651fff',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
    margin: Dimensions.get('window').width * 0.025,
    height: Dimensions.get('window').width  / numColumns, // approximate a square
    width: Dimensions.get('window').width * 0.45,
  },
  itemInvisible: {
        backgroundColor: '#012E40',
  },
  itemText: {
    color: '#fff',
    alignSelf: 'center',
  },

});