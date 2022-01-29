import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import StoryHead from './components/StoryHead';

const StoriesContainer = ({stories}) => {


  return (
      <View style={{flex:0.1, width:"100%", height:120}}>
        <FlatList
          data={stories}
          renderItem={({item}) => <StoryHead 
                                    image={item.profile_picture} 
                                    key={item?.storyID} 
                                    username={item.username} 
                                    storyID={item.storyID}
                                  />}
          horizontal
          contentContainerStyle={styles.innerContainer}
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

// const [width, setWidth] = useState(0)
// const [margin, setMargin] = useState(0)
// let index = 0 

// useEffect(()=>{
//     if(stories){
//         // each story head is 60px wide
//         setWidth(stories?.length*60)
//     }
// }, [stories, seenStories])

// return (
//     <div className="container-stories flex-ac">
//         <div className='inner-container-stories' style={{marginLeft:-margin.toString()+'%'}}>
//             <div className='flex-col-ctr'>
//                 <AddStory refetch={refetch}/>
//                 <p style={{fontSize:'14px'}}>Add story</p>
//             </div>
//             {stories?.map(story => (
//                 <div className='flex-col-ctr story-head-box' key={story?.storyID}>
//                     <StoryHead story={story} seen={seenStories.includes(story?.stories[story?.stories?.length-1].storyID)} allData={stories} index={index++ /* setting index for each story group */}/>
//                     <p>{story?.username}</p>
//                 </div>
//             ))}
//         </div>
//         {/* listing story heads buttons */}
//         {margin > 0 && 
//             <div 
//                 className='flex-ctr list-stories-btn-left list-stories-btn' 
//                 onClick={()=>setMargin(margin > 0 ? margin-100 : 0)}
//                 >
//                 <i className='fas fa-chevron-left'/>
//             </div>}
//         <div 
//             className='flex-ctr list-stories-btn-right list-stories-btn' 
//             onClick={()=>setMargin(margin+100 > width ? margin :margin+100)}
//             >
//             <i className='fas fa-chevron-right'/>
//         </div>
//     </div>