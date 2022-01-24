import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const win = Dimensions.get('window')

const AddComment = () => {
    const [cmtText, setCmtText] = useState('')

    const handleComment = () => {

    }

    return (
        <>
            <TextInput
                placeholder='Comment...'
                placeholderTextColor="#4f4f4f"
                style={styles.input}
                value={cmtText}
                onChangeText={text => setCmtText(text)}
            />
            <TouchableOpacity style={styles.postBtn} onPress={handleComment}>
                <Text>POST</Text>
            </TouchableOpacity>
        </>
    );
};

export default AddComment;

const styles = StyleSheet.create({
    input:{
        width: win.width - 40 - 60
    },
    postBtn:{
        backgroundColor:"#104b41",
        padding:5,
        width:40,
        borderRadius:5,
        marginHorizontal:10
    }
})