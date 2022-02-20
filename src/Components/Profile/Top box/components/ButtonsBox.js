import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import storiesIcon from '../../../../Assets/images/icons/stories-icon.png'
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const ButtonsBox = () => {
    const navigation = useNavigation()

    return (
        <View style={{flexDirection:'row', marginBottom:20, width:"100%", justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>navigation.push('AddStory')}>
                <FontAwesomeIcon icon='layer-group' size={26} color='#ddd'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('')}>
                <FontAwesomeIcon icon='camera-alt' size={28} color='#ddd'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('Settings')}>
                <FontAwesomeIcon icon='cog' size={28} color='#ddd'/>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonsBox;