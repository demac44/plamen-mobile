import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
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
      <TouchableWithoutFeedback style={styles.iconBox} onPress={()=>navigation.push('Feed')}>
        <Image source={feedIcon}/>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={styles.iconBox} onPress={()=>navigation.push('Explore')}>
          <Image source={compassIcon}/>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={styles.iconBox} onPress={()=>navigation.push('Saved')}>
         <Image source={saveIcon}/>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={styles.iconBox} onPress={()=>navigation.push('Communities')}>
        <Image source={cmntyIcon}/>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={styles.iconBox} onPress={()=>navigation.push('Profile')}>
        <Avatar size={35} image={user?.profile_picture}/>
      </TouchableWithoutFeedback>
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
        justifyContent:'space-around'
    },
    iconBox:{
        width:"20%",
        height:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})