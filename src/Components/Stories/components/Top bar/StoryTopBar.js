import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../../../General components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const StoryTopBar = ({pfp, username, navigation}) => {

    return (
        <View style={styles.bar}>
            <TouchableOpacity style={{display:'flex', flexDirection:"row", alignItems:'center'}} onPress={()=>navigation.navigate('Profile', {username})}>
                <Avatar image={pfp} size={40}/>
                <Text style={{marginLeft:10, fontSize:16}}>{username}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Feed')}>
                <FontAwesomeIcon icon='times' size={26} color='white'/>
            </TouchableOpacity>
        </View>
    );
};

export default StoryTopBar;

const styles = {
    bar:{
        width:"100%",
        flex:0.1, 
        display:'flex', 
        flexDirection:"row",
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        justifyContent:"space-between",        
        position:'absolute',
        top:10
    }
}