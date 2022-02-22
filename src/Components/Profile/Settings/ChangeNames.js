import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'

const ChangeNames = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')


    return (
        <View style={styles.box}>
            <Text style={{fontSize:16, color:"white", margin:5}}>Change name and username</Text>
            <TextInput 
                style={styles.input}
                placeholder='First name'
                placeholderTextColor={'#aaa'}
                onChangeText={text => setFname(text)}
                defaultValue='adads'
            />
            <TextInput 
                style={styles.input}
                placeholder='Last name'
                placeholderTextColor={'#aaa'}
                onChangeText={text => setLname(text)}
            />            
            <TextInput 
                style={styles.input}
                placeholder='Username'
                placeholderTextColor={'#aaa'}
                onChangeText={text => setUsername(text)}
            />
            <TouchableOpacity style={styles.btn}>
                <Text style={{color:"white"}}>SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChangeNames

const styles = {
    box:{
        width:"100%", 
        padding:5, 
        borderWidth:1, 
        borderColor:"#2f2f2f", 
        marginTop:10
    },
    input:{
        width:"100%", 
        height:35, 
        backgroundColor:"white", 
        borderRadius:5, 
        color:"#1b1b1b", 
        marginTop:10
    },
    btn:{
        paddingHorizontal:10, 
        paddingVertical:5, 
        backgroundColor:"#1D7EBC", 
        marginTop:10, 
        alignSelf:'flex-end', 
        borderRadius:5, 
        marginBottom:5
    }
}