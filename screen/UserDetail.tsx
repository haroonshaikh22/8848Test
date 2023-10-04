/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputBox from './components/TextinputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetail = (props: any) => {
  const [apiCalled, setAPiCalled] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [desig, setDesig] = useState('');
  const [comp, setComp] = useState('');
  const [address, setAddress] = useState('');

  console.log(props.route.params.data);
  const userName = props.route.params.data;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_key');
      if (value !== null) {
        console.log(value, 'tok');
        GetUserData(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const GetUserData = async value => {
    console.log(value, '--====');
    var formdata = new FormData();
    formdata.append('name1', userName);

    const options = {
      method: 'POST',
      headers: {
        Authorization: value,
      },
      body: formdata,
    };
    try {
      let response = await fetch(
        `https://assignment.8848digitalerp.com/api/method/assignment.API.specific_user.get_specific`,
        options,
      );
      let json = await response.json();

      let Data = json?.message?.data?.specific_user[0];

      setName(Data?.name1);
      setAge(Data?.age);
      setGender(Data?.gender);
      setComp(Data?.company_name);
      setDesig(Data?.designation);
      setAddress(Data?.address);
      setAPiCalled(true);
    } catch (error1) {
      console.log(error1);
      setAPiCalled(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const SaveData = async () => {
    var formdata = new FormData();
    formdata.append('designation', desig);

    const options = {
      method: 'PUT',
      headers: {
        Authorization: 'token eb33bed41ebc137:348f33df4a5e962',
      },
      body: formdata,
    };
    try {
      let response = await fetch(
        `https://assignment.8848digitalerp.com/api/resource/Assignment/${name}`,
        options,
      );
      let json = await response.json();

      console.log(json, '----');
      ToastAndroid.show('Change updated successfully', ToastAndroid.SHORT);
    } catch (error1) {
      console.log(error1);
      setAPiCalled(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      style={{
        backgroundColor: '#FFFFFF',
      }}>
      <Text>UserDetail</Text>
      <View
        style={{
          borderWidth: 1,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInputBox
          placeholder={'name'}
          value={name}
          onChangeText={dat => setName(dat)}
        />
        <TextInputBox
          keyboardType={'numeric'}
          placeholder={'Age'}
          value={age}
          onChangeText={dat => setAge(dat)}
        />
        <TextInputBox
          placeholder={'Gender'}
          value={gender}
          onChangeText={dat => setGender(dat)}
        />
        <TextInputBox
          placeholder={'Company'}
          value={comp}
          onChangeText={dat => setComp(dat)}
        />

        <TextInputBox
          placeholder={'Designation'}
          value={desig}
          onChangeText={dat => setDesig(dat)}
        />
        <TextInputBox
          placeholder={'Address'}
          value={address}
          onChangeText={dat => setAddress(dat)}
        />
      </View>

      <TouchableOpacity
        onPress={() => SaveData()}
        style={{
          marginTop: '5%',
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
    </ScrollView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});
