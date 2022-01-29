import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const AddStory = () => {
    return (
        <TouchableOpacity style={{display:'flex', alignItems:'center', marginLeft:5}}>
            <View style={styles.btn}>
                <Text style={{fontSize:40}}>+</Text>
            </View>
            <Text style={{marginTop:5}}>Add story</Text>
        </TouchableOpacity>
    );
};

export default AddStory;

const styles = {
    btn:{
        width:65,
        height:65,
        borderWidth:3,
        borderColor:"#ffbb00",
        borderRadius:10,
        display:"flex", 
        justifyContent:"center", 
        alignItems:'center',
    }
}