import React from 'react'
import { TouchableHighlight, View } from 'react-native';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const UploadImage = ({imageCB, videoCB, previewCB, sizeErrorCB}) => {

    // const selectFile = async () => {
    //     try {
    //       const res = await DocumentPicker.pick({
    //         type: [DocumentPicker.types.images],
    //         // There can me more options as well
    //         // DocumentPicker.types.allFiles
    //         // DocumentPicker.types.images
    //         // DocumentPicker.types.plainText
    //         // DocumentPicker.types.audio
    //         // DocumentPicker.types.pdf
    //       })
    //       .catch(err => console.log(err));
        
    //       if(res[0].size>31457280){
    //         sizeErrorCB(true)
    //       } else{
    //         videoCB(null)
    //         imageCB(JSON.stringify(res[0]))
    //         previewCB(res[0].uri)
    //       }

    //     } catch (err) {
    //       if (DocumentPicker.isCancel(err)) {
    //       } else {
    //         throw err;
    //       }
    //     }
    //   };
    
    const selectFile = async () => {
      const result = await launchImageLibrary({includeBase64:true});

      if(result.assets[0].fileSize>31457280){
        sizeErrorCB(true)
      } else{
        videoCB(null)
        imageCB(result.assets[0])
        previewCB(result.assets[0].uri)
      }
    }


    return (
        <View>
            <TouchableHighlight onPress={selectFile} style={{marginLeft:5}}>
                <FontAwesomeIcon icon='images' color='white' size={22}/>
            </TouchableHighlight>    
        </View>
    )   
}

export default UploadImage