import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ButtonsBox = () => {
    const navigation = useNavigation()

    // const selectFile = async () => {
    //     const result = await launchImageLibrary({includeBase64:true});
  
    //     if(result.assets[0].fileSize>31457280){
    //       sizeErrorCB(true)
    //     } else{

    //     }
    //   }  

    return (
        <View style={{flexDirection:'row', marginBottom:20, width:"100%", justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>navigation.push('AddStory')}>
                <FontAwesomeIcon icon='layer-group' size={26} color='#ddd'/>
            </TouchableOpacity>

            <TouchableOpacity>
                <FontAwesomeIcon icon='camera-alt' size={28} color='#ddd'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.push('Settings')}>
                <FontAwesomeIcon icon='cog' size={28} color='#ddd'/>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonsBox;