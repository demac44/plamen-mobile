import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AddStory from './components/AddStory';
import StoryHead from './components/StoryHead';

const StoriesContainer = ({stories}) => {
  
    return (
        <View style={{flex:0.1, width:"100%", height:120}}>
          <FlatList
            data={JSON.parse(stories)}
            renderItem={({item}) => <StoryHead 
                                      image={item.profile_picture} 
                                    key={item?.storyID} 
                                      username={item.username} 
                                      storyID={item.storyID}
                                    />}
            horizontal
            contentContainerStyle={styles.innerContainer}
            ListHeaderComponent={AddStory}
          />
        </View>
    );
};

export default StoriesContainer;

const styles = StyleSheet.create({
    innerContainer:{
        backgroundColor:"#1b1b1b",
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        paddingTop:5
    }
})

