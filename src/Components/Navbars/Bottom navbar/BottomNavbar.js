import React, { useContext } from 'react';
import { TouchableOpacity,View } from 'react-native';
import Avatar from '../../General components/Avatar';
import { UserContext } from '../../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const BottomNavbar = ({navigation}) => {
  const user = useContext(UserContext)


  return (
  <View style={styles.navbar}>
      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.navigate('Feed')}>
        <FontAwesomeIcon icon='newspaper' size={20} color='green'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.navigate('Explore')}>
        <FontAwesomeIcon icon='compass' size={20} color='darkred'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.navigate('Saved')}>
        <FontAwesomeIcon icon='bookmark' size={20} color='#ffbb00'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.navigate('Communities')}>
        <FontAwesomeIcon icon='users' size={20} color='teal'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBox} onPress={()=>navigation.navigate('Profile', {username: user.username})}>
        <Avatar size={35} image={user?.profile_picture}/>
      </TouchableOpacity>
  </View>);
};

export default BottomNavbar;

const styles = {
    navbar:{
        height:60,
        backgroundColor:"#1b1b1b",
        width:"100%",
        display:'flex',
        flexDirection:'row',    
        alignItems:'center',
        justifyContent:'space-around',
        position:'absolute',
        bottom:0,
        left:0,
        right:0
    },
    iconBox:{
        width:"20%",
        height:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}