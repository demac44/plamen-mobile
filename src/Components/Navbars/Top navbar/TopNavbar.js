import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SearchBar from './Search bar/SearchBar';
import inboxBtn from '../../../Assets/images/icons/inbox-icon.png'
import notifBtn from '../../../Assets/images/icons/notif-icon.png'
import logo from '../../../Assets/images/logo-min.jpg'

const TopNavbar = ({navigation}) => {
  return (
  <View style={styles.navbar}>
      <Image source={logo} style={{height:37,width:25}}/>
      <SearchBar navigation={navigation}/>
      <View style={styles.navBtns}>
        <Image source={notifBtn}/>          
        <Image source={inboxBtn}/>
      </View>
  </View>);
};

export default TopNavbar;

const styles = StyleSheet.create({
    navbar:{
        flex:0.08,
        backgroundColor:"#1b1b1b",
        width:"100%",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    navBtns:{
        width:"20%",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    }
})