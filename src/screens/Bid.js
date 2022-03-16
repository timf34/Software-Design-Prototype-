import React, {useState} from 'react';
import{db} from '../../firebase';
import {collection, setDoc} from "firebase/firestore";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, View } from 'react-native';
import Button from '../components/Button';

export default function Bid({navigation} ) {

    const route = useRoute()

    const item = route.params.item
    const itemID = route.params.itemID
    const user = route.params.user

    const addBid = async() => {

        if(user.uid == item.owner_ID){
            //handle bid on your item
        }

        if(bid < item.price) {
            //handle price lower than current
        }

        await setDoc(collection(db, 'Items', itemID, 'bids'), {
            bidder_ID: user.uid,
            bidder_name: user.displayName,
            bid: bid
        });

        await setDoc(collection(db,'Items', itemID),{
            price: bid
        });
        navigation.navigate('Item',{fileName: itemID});
        
    }

    const [bid, setBid] = useState()
    return(
        <SafeAreaView>
            <View>
            <TextInput
                        onChangeText={setBid}
                        value={bid}
                        placeholder ='Your bid'
                    />
            </View>
            <Button mode="contained" onPress={addBid}>
                Bid!
            </Button>
        </SafeAreaView>
    )



}