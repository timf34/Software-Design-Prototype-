import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { useNavigation} from '@react-navigation/native'

const numColumns = 2;

const data = [
    {key: 'A', url: "https://i.imgur.com/0Enbixq.jpeg"}, {key: 'B', url: "https://i.imgur.com/JJ7TXt1.jpeg"}, {key: 'C',url: "https://i.imgur.com/mR8Eebg.jpeg"}, {key: 'D',url: "https://i.imgur.com/sf1tCd8.jpeg"}, {key: 'E',url: "https://i.imgur.com/eibpB8Q.jpeg"}, {key: 'F',url: "https://i.imgur.com/9GqPsV9.jpeg"}, {key: 'G',url: "https://i.imgur.com/UekS2f4.jpeg"}, 
  ];

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
};

export default function Explore ({navigation}){

    const renderItem = ({item}) => {

        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }

        return (
            <Pressable 
                onPress={() => {navigation.navigate('Item', {fileName: "KrBNrD5vCSxZQdDLyo80"})}}
            >    
                <ImageBackground 
                source={{uri: item.url}} 
                style={styles.item} 
                imageStyle = {{borderRadius: 20}}
                />
            </Pressable>
            );
    
    };

    return (
        <FlatList
            data={formatData(data, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
        />
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: '#012E40'
    },
    item: {
      backgroundColor: '#038C8C',
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