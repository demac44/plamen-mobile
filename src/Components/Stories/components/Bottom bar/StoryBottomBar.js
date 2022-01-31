import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';

const win = Dimensions.get('window')

const StoryBottomBar = ({noOfStories, sid}) => {
    return (
        <View style={styles.container}>
            <View style={styles.countBars}>
                {noOfStories?.map(n => 
                    <View 
                        style={{...styles.countBar, 
                                width: win.width/noOfStories.length-10, 
                                backgroundColor: n.storyID===sid ? "white" : "#7f7f7f"
                            }} 
                        key={n.storyID}>
                    </View>)}
            </View>

            <View style={styles.bottom}>
                <TextInput style={styles.input} placeholder='Reply' placeholderTextColor="#4f4f4f"/>
                <TouchableOpacity style={styles.postBtn}>
                    <Text style={{fontSize:15}}>SEND</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StoryBottomBar;

const styles = {
    container:{
        width:"100%",
        flex:0.1, 
        paddingLeft:5,
        paddingRight:5,
        position:'absolute',
        bottom:5
    },
    bottom:{
        width:"100%",
        flex:0.1, 
        display:'flex', 
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
    },
    input:{
        width:"80%",
        borderColor:"#3f3f3f",
        borderWidth:1,
        borderRadius:5,
        fontSize:16,
        paddingLeft:10,
        height:45,
        backgroundColor:"#1f1f1f"
    },
    postBtn:{
        backgroundColor:"#104b41",
        padding:5,
        width:"18%",
        borderRadius:5,
        height:35,
        display:'flex', 
        alignItems:'center',
        justifyContent:"center"
    },
    countBars:{
        width:"100%",
        display:'flex', 
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-around",
        paddingBottom:10
    },
    countBar:{
        height:5,
        borderRadius:5
    }
}