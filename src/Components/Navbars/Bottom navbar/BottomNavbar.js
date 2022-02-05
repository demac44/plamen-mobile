import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import Avatar from '../../General components/Avatar';
import feedIcon from '../../../Assets/images/icons/feed-icon.png'
import compassIcon from '../../../Assets/images/icons/compass-icon.png'
import saveIcon from '../../../Assets/images/icons/save-icon.png'
import cmntyIcon from '../../../Assets/images/icons/cmnty-icon.png'
import { UserContext } from '../../../../App';


const BottomNavbar = ({navigation}) => {
  const user = useContext(UserContext)


  return (
  <View style={styles.navbar}>
      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.replace('Feed')}>
        <Image source={feedIcon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.replace('Explore')}>
          <Image source={compassIcon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.replace('Saved')}>
         <Image source={saveIcon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.replace('Communities')}>
        <Image source={cmntyIcon}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.replace('Profile', {username: user.username})}>
        <Avatar size={35} image={user?.profile_picture}/>
      </TouchableOpacity>
  </View>);
};

export default BottomNavbar;

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
    iconBox:{
        width:"20%",
        height:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})