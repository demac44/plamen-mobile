import React, { memo } from 'react';
import { Dimensions, Image, View } from 'react-native';

const win = Dimensions.get('window')

const PostMedia = ({image, width, height}) => {

    let h = (height/width)*win.width

    return (
        <View>
            <Image source={{uri: image}} style={{width:win.width, height:h || win.height/1.5}} resizeMode='contain'/>
        </View>
    );
};

export default memo(PostMedia);