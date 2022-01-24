import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import xicon from '../../../../Assets/images/icons/x-icon.png'

const SearchBar = ({navigation}) => {
    const [query, setQuery] = useState('')


    return (
        <View style={{display:"flex", flexDirection:"row", alignItems:'center', width:"60%"}}>
            <TextInput 
                multiline={false} 
                placeholder='Search...' 
                placeholderTextColor='#6f6f6f' 
                style={styles.searchBar}
                value={query}
                onChangeText={text=>setQuery(text)}
                />
            <View>

            <TouchableOpacity style={styles.exitBtn} onPress={()=>setQuery('')}>
                {query.length>0 ? <Image source={xicon}/> : <Text></Text>}
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    searchBar:{
        width:"90%",
        borderWidth:1,
        borderStyle: "solid",
        borderColor:"#3f3f3f",
        padding:5,
        height:40,
        paddingLeft:10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderRightWidth:0,
    },
    exitBtn:{
        borderWidth:1,
        borderStyle: "solid",
        borderColor:"#3f3f3f",
        height:40,
        width:30,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderLeftWidth:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})