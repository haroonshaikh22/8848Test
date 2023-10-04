import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const TextInputBox = (props: any) => {
  return (
    <View style={[styles.inputBox]}>
      <TextInput
        placeholderTextColor={'#000000'}
        onChange={props.onChange}
        onFocus={props.onFocus}
        maxLength={props.maxLength}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        placeholder={props?.placeholder}
        value={props?.value}
        onChangeText={props?.onChangeText}
        style={{
          width: '95%',
          color: '#000000',
        }}
      />
    </View>
  );
};

export default TextInputBox;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    height: 40,
    width: '90%',
    marginVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
