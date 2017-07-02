import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ placeholder, label, value, onChangeText, secureTextEntry }) => {
  const { textStyle, inputStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{label}</Text>
      <TextInput
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 18,
    paddingLeft: 5,
    flex: 1,
    color: '#000'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  viewStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default Input;
