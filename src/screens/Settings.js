import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import {auth} from "../../firebase"
import { getAuth, signInWithPhoneNumber, signOut } from "firebase/auth";

const Separator = () => (
  <View style={styles.separator} />
);

export default function LoginScreen({ navigation }) {
return(
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Account Settings for User. Use these functions to change user name, passwords, and general account privacy settings. 
      </Text>
      <Button
        title="Change User Information"
        onPress={() => navigation.navigate('UserSettings')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        Display Settings. 
      </Text>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        This layout strategy lets the title define the width of the button.
      </Text>
      <View style={styles.fixToText}>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('LoginScreen')}
        />
         <Button
        title="Sign Out"
        color="#f194ff"
        onPress={() => {signOut(auth); Alert.alert('User Signed Out');}
        }
       />
      </View>
    </View>
  </SafeAreaView>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

