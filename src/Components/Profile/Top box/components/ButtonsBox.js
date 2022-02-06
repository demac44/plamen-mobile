import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import settIcon from '../../../../Assets/images/icons/settings-icon.png'
import cameraIcon from '../../../../Assets/images/icons/camera-alt-icon.png'
import storiesIcon from '../../../../Assets/images/icons/stories-icon.png'
import { useNavigation } from '@react-navigation/native';

const ButtonsBox = () => {
    const navigation = useNavigation()

    return (
        <View style={{flexDirection:'row', marginBottom:20, width:"100%", justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>navigation.push('Settings')}>
                <Image source={storiesIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('')}>
                <Image source={cameraIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('AddStory')}>
                <Image source={settIcon}/>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonsBox;