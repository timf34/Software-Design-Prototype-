import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import{db, storage} from '../../firebase';
import {ref, getDownloadURL } from 'firebase/storage';
import { doc, getDocs,collection, getDoc } from "firebase/firestore";

const numColumns = 2;

class ItemFull {
  constructor (id, name, type, imageUrl, price ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.imageUrl = imageUrl;
      this.price = price;
  }
  toString() {
      return this.id + ',' + this.name + ', ' + this.type + ', ' + this.desc + ',' + this.imageUrl + ',' + this.price;
  }
}

export default function Explore({navigation}){
  const [items, setItems] = useState();

  var snapData = [];  //container for the data fetched from db
  var data = [];      //container for the data fetched from db with working url

  //function to fetch the items from the database and store them in an array
  const getItems = async() => {

    //first part fetches the item data from firebase. Each item has following entries
    
    //  id  - you use it when fetching the item from the database
    //  name
    //  type
    //  description
    //  price
    //  ImageUrl - the one stored in the database is only the filename of the image

    //  The actual URl is fetched in the promise function below

    const querySnapshot = await getDocs(collection(db, "Items"));
    querySnapshot.forEach((doc) => {
      const snapshot = doc.data();
      snapData.push(new ItemFull(doc.id, snapshot.name, snapshot.type, snapshot.imageUrl, snapshot.price));
    });


    //console.log('Items => ' + snapData);

    //This part is for fetching the actual urls.
    //The url has to have a valid authentication token to work, thats why you cant store it the database
    await Promise.all(snapData.map(async(item) => {
      if(item.imageUrl){
        imageRef = ref(storage, `${item.imageUrl}.jpeg`)
        await getDownloadURL(imageRef)
        .then((url)=>{const imageUrl = url; data.push(new ItemFull(item.id, item.name, item.type, imageUrl, item.price));});
      }

    }));

    //console.log("data =>" + data);
    //call the Items hook to update the items
    setItems(data);
  }

  //function called in the flatlist, a blueprint for a single tile basically. Requires an Item entry
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
              color: 'grey',
              margin: Dimensions.get('window').width * 0.025,
              }}>{item.name}
            </Text>

            
            <Text style={{
              fontSize: 15,
              color: 'black',
              margin: Dimensions.get('window').width * 0.025,
              }}>{item.price + ' €'}
            </Text>
            </View>
            
        </Pressable>
        );

  };

  //part which renders the actual item list
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
          onRefresh = {getItems} //get items data again for refresh
      />
  );
  }
  
  //console.log(items);
  //TODO replace this with loadng screen
  return(<View><Text>bread</Text></View>);
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  item: {
    backgroundColor: 'lightgrey',
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