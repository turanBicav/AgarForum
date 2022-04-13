import React, {useState,useEffect,useContext} from 'react';
import
 {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MultiSelect from 'react-native-multiple-select';
import { Divider } from 'react-native-elements';
import  firestore,{firebase} from '@react-native-firebase/firestore';
import { AuthContext } from '../../Navigation/AuthProvider';

//const [selectedItems, setselectedItems] = useState();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const items = [{
  id: 0,
  name: 'Ondo'
}, {
  id: 1,
  name: 'Ogun'
}, {
  id: 2,
  name: 'Calabar'
}, {
  id: 3,
  name: 'Lagos'
}, {
  id: 4,
  name: 'Maiduguri'
}, {
  id: 5,
  name: 'Anambra'
}, {
  id: 6,
  name: 'Benue'
}, {
  id: 7,
  name: 'Kaduna'
}, {
  id: 8,
  name: 'Abuja'
}
];





export default post1 = ({navigation}) => {


const {user} = useContext(AuthContext);
const postColl = firestore().collection('Post');
const [selectedItems, setSelectedItems] = useState([]);
const [selectedItemsVal, setSelectedItemsVal] = useState([]);
const [title, setTitle] = useState('');
const [postText, setPostText] = useState('');
console.log(user.displayName)

const onSelectedItemsChange = (selectedItems) => {

  setSelectedItems(selectedItems);

  console.log(selectedItems)

  var sel = [];
  selectedItems.map((a)=>{
    sel.push(items[a])
    setSelectedItemsVal(sel)
    console.log(sel)
  })
  
};

const createPost = ()=>{
  postColl.doc(user.uid).collection('userPost').add({
    categories:selectedItemsVal,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    postText:postText,
    title:title,
    name:user.displayName //bunun için yeni bir profil oluşturulacak
    
  }
  )
}

return(
  <SafeAreaView style={styles.container}>
    <View style={styles.headerBarView}>
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity style={{marginRight:10,marginTop:2}}
      onPress={()=>navigation.navigate('HomeNav')}
      >
            <Icon name='arrow-left'
             style={styles.Icons} 
             />
            </TouchableOpacity>
            <Text
            style={{color:"white", fontSize:18}}>Bir soru sorun</Text>
            </View>
            <TouchableOpacity style={{}} onPress={()=>createPost()}>
            <Text style={{color:"white", fontSize:18, textAlign:'right'}}>Gönder</Text>
            </TouchableOpacity>
            
      </View>
  
      <View style={{ }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          //ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          styleDropdownMenuSubsection={{
            borderWidth: 1,
            marginBottom: -10,
            paddingLeft: 10,

          }}
        />
        <View>
        {/*this.multiSelect ? this.multiSelect.getSelectedItemsExt(selectedItems) : null*/ }
        </View>
      </View>

      <View style={{marginTop:10,padding:5,flex:15,backgroundColor:'white'}}>
        <View>
        <TextInput
        style={styles.commentTextInput}
        placeholder='Sorunuzunu bir ? işareti ileyazın '
        onChangeText={(text)=>setTitle(text)}
        />
        </View>
        <Divider/>
        <View >
        <TextInput
        multiline
        numberOfLines={35}
         style={styles.commentTextInput}
         placeholder='Sorunuzunu bir ? işareti ileyazın '
         onChangeText={(text)=>setPostText(text)}
        
        />
        </View>
      </View>
      <View style={{backgroundColor:'#EEEEEE',
      flex:1,flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      paddingHorizontal:20
      }}>
      <TouchableOpacity>
      <Icon
      name='image'
      size={25}
      />
      </TouchableOpacity>
      <TouchableOpacity style={{marginHorizontal:20}}>
      <Icon
      name='film'
      size={25}
      />
      </TouchableOpacity>
      <TouchableOpacity>
      <Icon
      name='camera'
      size={25}
      />
      </TouchableOpacity>
      </View>
  </SafeAreaView>
)
};


const styles = StyleSheet.create({


  container:{
    flex:1,
    backgroundColor:'#EEEEEE'

  }
  ,
  headerBarView:{
    alignItems:'center',
    height:windowHeight/15,
    backgroundColor:'#0E1B32',
    flexDirection:'row',
    paddingHorizontal:10,
    justifyContent:'space-between'

  
},

Icons:
{
    fontSize:20,
    color:'white'
},

commentTextInput:{
  backgroundColor:'white',
  padding:10,
  margin:5
  

}
   
})
