import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PostTextBar = ({text}) => {
    const [readMore, setReadMore] = useState(false)

    return (
        <View style={styles.bar}>
            {text?.length>200 
            ?
            (
                <>
                    {readMore ? <Text>{text} <Text style={{color:"teal"}} onPress={()=>setReadMore(false)}>Read less</Text></Text> :
                    <Text>{text?.slice(0,200)}<Text style={{color:"teal"}} onPress={()=>setReadMore(true)}>. . .Read more</Text></Text>}
                </>
            )
            : <Text>{text}</Text>}
        </View>
    );
};

export default PostTextBar;

const styles = StyleSheet.create({
    bar:{
        width:"100%",
        paddingHorizontal:5,
        paddingVertical:10
    },
    text:{
        color:"white"
    }
})