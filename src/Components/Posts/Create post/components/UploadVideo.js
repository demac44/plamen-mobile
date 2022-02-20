import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const UploadVideo = ({videoCB, imageCB, previewCB, sizeErrorCB}) => {

    const selectFile = async () => {
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.video],
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          })
          .catch(err => console.log(err));

          if(res[0].size>31457280){
            sizeErrorCB(true)
          } else{
              imageCB(false)
              videoCB(res[0])
              previewCB(res[0].uri)
          }


        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          } else {
            throw err;
          }
        }
      };

    return (
        <View>
            <TouchableHighlight onPress={selectFile} style={{marginLeft:20}}>
                <FontAwesomeIcon icon='video' color='white' size={22}/>
            </TouchableHighlight>    
        </View>
    )
}

export default UploadVideo
