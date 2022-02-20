import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import logo from '../../../Assets/images/logo-min.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const TopNavbar = ({navigation}) => {
    return (
    <View style={styles.navbar}>
        <Image source={logo} style={{height:37,width:25}}/>
        {/* <SearchBar navigation={navigation}/> */}
        <View style={styles.navBtns}>
            <TouchableOpacity onPress={()=>navigation.push('Search')}>
                <FontAwesomeIcon icon='search' color='white' size={20}/>          
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('Notifications')}>
                <FontAwesomeIcon icon='sort-down' color='white' size={20} style={{marginTop:-10}}/>          
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Chats')}>
                <FontAwesomeIcon icon='inbox' color='white' size={20}/>          
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
        justifyContent:'space-between',
        position:'absolute',
        top:0,
        left:0,
        zIndex:100000,
        paddingHorizontal:10
    },
    navBtns:{
        width:"40%",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    }
})