/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TextInputBox from './components/TextinputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const LoginUserFunc = async () => {
    console.log('press');

    try {
      let response = await fetch(
        `https://assignment.8848digitalerp.com/api/method/assignment.API.access_token.get_access_token?usr=${email}&pwd=${password}`,
      );
      let json = await response.json();

      storeData(json?.message?.data?.access_token);
      console.log(json?.message?.data?.access_token, '----');
    } catch (error1) {
      console.log(error1);
    }
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('user_key', value);
      props.navigation.navigate('Home');
    } catch (e) {
      // saving error
      console.log(e, 'storage error');
    }
  };

  console.log(token, 'token');

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '25%',
      }}>
      <TextInputBox
        keyboardType={'email-address'}
        placeholder={'Email'}
        value={email}
        onChangeText={dat => setEmail(dat)}
      />
      <TextInputBox
        secureTextEntry={true}
        keyboardType={'visible-password'}
        placeholder={'Password'}
        value={password}
        onChangeText={dat => setPassword(dat)}
      />

      <TouchableOpacity
        onPress={() => LoginUserFunc()}
        style={{
          marginTop: '10%',
          width: '50%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#454665',
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 22, fontWeight: '600'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
