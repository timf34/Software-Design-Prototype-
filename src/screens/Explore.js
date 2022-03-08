import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import{db, storage} from '../../firebase';
import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDocs,collection, getDoc } from "firebase/firestore";

const numColumns = 2;

class ItemFull {
  constructor (id, name, type, imageUrl ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.imageUrl = imageUrl;
  }
  toString() {
      return this.id + ',' + this.name + ', ' + this.type + ', ' + this.desc + ',' + this.imageUrl;
  }
}

export default function Explore({navigation}){
  const [items, setItems] = useState();

  var snapData = [];
  var data = [];

  const getItems = async() => {
    const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach((doc) => {
      const snapshot = doc.data();
      snapData.push(new ItemFull(doc.id, snapshot.name, snapshot.type, snapshot.imageUrl));
    });

    console.log('Items => ' + snapData);

    await Promise.all(snapData.map(async(item) => {
      if(item.imageUrl){
        imageRef = ref(storage, `${item.imageUrl}.jpeg`)
        await getDownloadURL(imageRef)
        .then((url)=>{const imageUrl = url; data.push(new ItemFull(item.id, item.name, item.type, imageUrl));});
      }

    }));

    console.log("data =>" + data);

    setItems(data);
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
            source={{uri: item.imageUrl}} 
            style={styles.item} 
            imageStyle = {{borderRadius: 20}}
            >
              
            </ImageBackground>
            <View>
            <Text style={{
              fontSize: 15,
              color: 'black',
              margin: Dimensions.get('window').width * 0.025,
              }}>{item.name}
            </Text>
            <Text style={{
              fontSize: 12,
              color: 'grey',
              margin: Dimensions.get('window').width * 0.025,
              }}>{item.type}
              </Text>
            </View>
            
        </Pressable>
        );

  };

  if(!items){
    getItems();
  } else {
    console.log(items);
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
  itemText: {
    

  },

  itemInvisible: {
        backgroundColor: '#012E40',
  },
  itemText: {
    color: '#fff',
    alignSelf: 'center',
  },

});