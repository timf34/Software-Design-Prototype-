import React, { useState } from 'react'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import Toast from '../components/Toast'
import { signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

import {auth} from "../../firebase"

const user = auth.currentUser;
if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

const Separator = () => (
    <View style={styles.separator} />
  );
  
export default function UserSettings({ navigation }) {
  return(
    
    <SafeAreaView style={styles.container}>
    <View>
      <Button
        title="Back to Settings"
        onPress={() => navigation.navigate('UserSettings')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        Account Information.
      </Text>
      <Text style={styles.title}>
        Username:
      </Text>
      <Text style={styles.title}>
        Email:
      </Text>
      <Button
        title="Change User Information"
        onPress={() => navigation.navigate('UserSettings')}
      />
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        Forgot Password?
      </Text>
      <Button
        title="Reset Password"
        onPress={() => {sendPasswordResetEmail(auth, email); Alert.alert('Password reset email sent to', email);}}
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
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
