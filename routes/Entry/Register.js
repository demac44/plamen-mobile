import React from 'react';
import { Button, Text, View } from 'react-native';

const Register = ({navigation}) => {
  return (
    <View>
        <Text>Register</Text>
        <Button title='Register' onPress={()=>navigation.navigate('Login')}/>
    </View>
  );
};

export default Register;
