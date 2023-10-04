import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props: any) => {
  const [allData, setAllData] = useState([]);
  const [apiCalled, setAPiCalled] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_key');
      if (value !== null) {
        console.log(value, 'tok');
        GetDataApi(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const GetDataApi = async value => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: value,
      },
    };
    try {
      let response = await fetch(
        'https://assignment.8848digitalerp.com/api/method/assignment.API.all_users_api.get_user',
        options,
      );
      let json = await response.json();

      console.log(json?.message?.data, '----');
      setAllData(json?.message?.data);
      setAPiCalled(true);
    } catch (error1) {
      console.log(error1);
      setAPiCalled(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(allData, '--');

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%',
      }}>
      <Text>HomeScreen</Text>
      {apiCalled &&
        allData.map(data => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('UserDetail', {data: data?.name1})
              }
              key={data.name1}
              style={{
                backgroundColor: 'grey',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                padding: '5%',
                marginVertical: '3%',
              }}>
              <Text>{data.name1}</Text>
              <Text>{data.designation}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
