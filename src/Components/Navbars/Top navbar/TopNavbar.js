import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
          <TouchableOpacity onPress={()=>navigation.navigate('Chats')}>
            <Image source={inboxBtn}/>
          </TouchableOpacity>
        </View>
    </View>);
};

export default TopNavbar;

const styles = StyleSheet.create({
    navbar:{
        height:60,
        backgroundColor:"#1b1b1b",
        width:"100%",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        position:'absolute',
        top:0,
        left:0,
        zIndex:100000
    },
    navBtns:{
        width:"20%",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    }
})