import React from 'react';
import { Image, View } from 'react-native';
import logo from '../../../Assets/images/logo-min.jpg'

const MainLoader = () => {
  return (
      <View style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:"#1b1b1b"}}>
          <Image source={logo}/>
      </View>
  );
};

export default MainLoader;
