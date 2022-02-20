import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SearchBar = ({navigation, queryCB}) => {
    const [query, setQuery] = useState('')

    return (   
        <View style={styles.container}>
            <TouchableOpacity style={{width:"10%"}} onPress={()=>navigation.goBack()}>
                <FontAwesomeIcon icon='arrow-left' size={22} color='white'/>
            </TouchableOpacity>
            <View style={{display:"flex", flexDirection:"row", alignItems:'center', width:"90%"}}>
                <TextInput 
                    multiline={false} 
                    placeholder='Search...' 
                    placeholderTextColor='#6f6f6f' 
                    style={styles.searchBar}
                    value={query}
                    onChangeText={text=>{setQuery(text);queryCB(text)}}
                    />
                <View>
                    <TouchableOpacity style={styles.exitBtn} onPress={()=>{setQuery('');queryCB('')}}>
                        {query.length>0 ? <FontAwesomeIcon icon='times' size={22} color='white'/> : <Text></Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>  
    )
};

export default SearchBar;

const styles = StyleSheet.create({
    searchBar:{
        width:"85%",
        borderWidth:1,
        borderStyle: "solid",
        borderColor:"#3f3f3f",
        padding:5,
        height:45,
        paddingLeft:10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderRightWidth:0,
        backgroundColor:"#1f1f1f"
    },
    exitBtn:{
        borderWidth:1,
        borderStyle: "solid",
        borderColor:"#3f3f3f",
        height:45,
        width:40,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderLeftWidth:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#1f1f1f" 
    },
    container:{
        width:"100%", 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between',
        padding:5,
        position:'absolute',
        top:0
    }
})