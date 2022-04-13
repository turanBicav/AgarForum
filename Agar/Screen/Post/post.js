import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';

import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import MultiSelect from 'react-native-multiple-select';
import Color from 'react-native-material-color';
import auth,{ firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore'

const phizIcon = require('../../image/splash.png');
const htmlIcon = require('../../image/splash.png');

const items = [{
  id: 1,
  name: 'Ondo',
 
}, {
  id: 2,
  name: 'Ogun',
  
}, {
  id: 3,
 
  name: 'Calabar'
}, {
  id: 4,
  
  name: 'Lagos'
}, {
  id: 5,
 
  name: 'Maiduguri'
}, {
  id: 6,
 
  name: 'Anambra'
}, {
  id: 7,
 
  name: 'Benue'
}, {
  id: 8,
  
  name: 'Kaduna'
}, {
  id: 9,
  
  name: 'Abuja'
}
];




const user = firebase.auth().currentUser.uid;
const db = firebase.database();


 const refCategory = db.ref('Kategoriler');
    //  refCategory.set(
    //   items
      
    //   )
    //   .then(() => console.log('Data set.'));

const ref = db.ref('Post/');
const refKullanici = db.ref('kullaniciBilgiler/'+`${user}`);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class post extends Component {




  constructor(props) {

   

    super(props);

    this.editorFocus = false;
    this.onHome = this.onHome;
    this.save = this.save;
    this.onTheme = this.onTheme;
    //this.onPressAddImage = this.onPressAddImage;
    this.onInsertLink = this.onInsertLink;
    this.onLinkDone = this.onLinkDone;
    this.themeChange = this.themeChange;
    this.handleChange = this.handleChange;
    this.handleHeightChange = this.handleHeightChange;
    this.insertEmoji = this.insertEmoji;
    this.insertHTML = this.insertHTML;
    //this.insertVideo = this.insertVideo;
    this.handleEmoji = this.handleEmoji;
    this.onDisabled = this.onDisabled;
    const richText = React.createRef();


    this.state = {
      selectedItems: [],
      textInputTitle: '',
      editorText: '',
      editorTexti: '',
      Picktext:[],
      a:'',
      _pressPostButton:false,
      user:user,
      userNameSurData:''
    };
    this.onSubmit=this.onSubmit.bind(this);
  }


 componentDidMount(){

  refKullanici.once('value',(snapshot)=>{

  snapshot.forEach(child=>{

    let nameAndSurname=child.val().name + 
    ' ' +child.val().surname;
    this.setState({userNameSurData:nameAndSurname})
    console.log(this.state.userNameSurData)

  })  
    
  });
  
  
  console.log('za')
}

 

  onPressAddImage = () => {
    // you can easily add images from your gallery
    this.richText.current?.insertImage(
      "../../image/logo.png"
    );
  }

  fontSize = () => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    const size = [1, 2, 3, 4, 5, 6, 7];
    this.richText.current?.setFontSize([(size.length - 1)]);
  };


  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    //console.log(selectedItems)
    
    selectedItems.map((a)=>{
     
     
      let Picktext = [...this.state.Picktext]
      Picktext.push(items[a])
     // this.state.Picktext=items[a]
     console.log(Picktext)
      this.setState({Picktext})
      /*ref.set(
        this.state.Picktext
        )
        .then(() => console.log('a'))*/
      
      },
      
    )

    /*if(this.state._pressPostButton==true){

   
     ref.set({
      //category:this.state.Picktext,
      title:this.state.textInputTitle,
      text:this.state.editorTexti
    }

      )
      .then(() => console.log('aaaaaaaa'))
  }*/
      
      }

      onSubmit({navigation}){
        
        
        
     ref.child(this.state.textInputTitle).set({
      id:this.state.user,
      category:this.state.Picktext,
      title:this.state.textInputTitle,
      text:this.state.editorTexti,
      postTime: new Date(),
      nameSurname:this.state.userNameSurData
    }
      
  
      )
      .then(() => console.log('aaaaaaaa')
      )
        //this.setState({_pressPostButton:true});
      //console.log(this.state._pressPostButton.toString())
        alert('kacin')
      this.props.navigation.navigate('postDetails',{title:this.state.textInputTitle})
      this.textInputTitle.clear()
      this.multiSelect._removeAllItems();
    }
  

    
 
  


  render() {

    const richText = React.createRef();
    const { textInputTitle } = this.state;
    const { selectedItems } = this.state;
    const { editorTexti } = this.state;
    
    
    //console.log(textInputTitle)
    console.log(editorTexti)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.headerView}>
            <TouchableOpacity 
            style={{position: 'absolute', left:10}}
            onPress={()=>this.props.navigation.navigate('HomeNav')}
            >
            <Icon name='arrow-left'
             style={{ fontSize: 18, color: 'white' , }} 
             />
            </TouchableOpacity>
          <Text style={styles.headerText}>
            POST OLUŞTUR
          </Text>

          </View>
          <View style={styles.postView}>
          <Card>
            <View style={styles.answerTitleView}>
            
              <TextInput
                autoFocus={true}
                onChangeText={textInputTitle => this.setState({ textInputTitle })}
                placeholder='Post başlığını giriniz...'
                style={styles.answerTitleTextInput}
                ref={input => { this.textInputTitle = input }}
              />
            </View>
            </Card>
              <Card style={{marginVertical:10}}>
            <View style={styles.postEditView}>
              <View>
                <Card.Title
                 title='Açıklama'
                 
                  subtitle='Bu kısımda gönderi hakkında bilgiler bulunladır'>

                  </Card.Title>
              </View>
              <RichToolbar
                editor={richText}
                onPressAddImage={this.onPressAddImage}
                selectedIconTint={'#2095F2'}
                disabledIconTint={'#bfbfbf'}
                actions={[
                  //actions.insertVideo,
                  actions.insertImage,
                  actions.checkboxList,
                  actions.insertOrderedList,
                  actions.blockquote,
                  actions.alignLeft,
                  actions.alignCenter,
                  actions.alignRight,
                  actions.code,
                  actions.line,
                ]} // default defaultActions

                iconMap={{
                  insertEmoji: phizIcon,
                  [actions.heading1]: ({ tintColor }) => (
                    <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                  ),
                  [actions.heading4]: ({ tintColor }) => (
                    <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                  ),
                  insertHTML: htmlIcon,
                }}

                insertEmoji={this.handleEmoji}
                insertHTML={this.insertHTML}
                //insertVideo={this.insertVideo}
                fontSize={this.fontSize}

              />

              <RichEditor

                ref={richText}
                disabled={false}
                useContainer={true}
                initialHeight={400}
                initialContentHTML={this.state.editorTexti}
                // containerStyle={{borderRadius: 24}}
                placeholder={'please input content'}
                editorInitializedCallback={this.editorInitializedCallback}
                onChange={editorText => {
                  this.state.editorTexti = editorText
                  this.setState.editorTexti
                  console.log("editorText",editorText);
                
                }}
                onHeightChange={this.handleHeightChange}
                onPaste={this.handlePaste}
                onKeyUp={this.handleKeyUp}
                onKeyDown={this.handleKeyDown}
                onInput={this.onInput}
                onMessage={this.handleMessage}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onCursorPosition={this.handleCursorPosition}

              />

              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <RichToolbar


                  editor={richText}
                  disabled={false}
                  // iconTint={color}
                  selectedIconTint={'#2095F2'}
                  disabledIconTint={'#bfbfbf'}
                  onPressAddImage={this.onPressAddImage}
                  onInsertLink={this.onInsertLink}
                  // iconSize={24}
                  // iconGap={10}
                  actions={[
                    actions.undo,
                    actions.setStrikethrough,
                    actions.heading1,
                    actions.heading4,
                    'fontSize',
                    actions.redo,
                  ]} // default defaultActions
                  iconMap={{
                    insertEmoji: phizIcon,
                    [actions.foreColor]: ({ tintColor }) => <Text style={[styles.tib, { color: 'blue' }]}>FC</Text>,
                    [actions.hiliteColor]: ({ tintColor }) => (
                      <Text style={[styles.tib, { color: tintColor, backgroundColor: 'red' }]}>BC</Text>
                    ),
                    [actions.heading1]: ({ tintColor }) => (
                      <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                    ),
                    [actions.heading4]: ({ tintColor }) => (
                      <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                    ),
                    insertHTML: htmlIcon,
                  }}
                  insertEmoji={this.handleEmoji}
                  insertHTML={this.insertHTML}
                  //insertVideo={this.insertVideo}
                  fontSize={this.fontSize}
                  foreColor={this.foreColor}
                />

              </KeyboardAvoidingView>

            </View>
            </Card>
           
            <View style={styles.categoryMultiSelect}>
              <View style={styles.categoryTextView}>
               
              </View>
              <MultiSelect
                KeyboardAvoidingVie={false}
                hideTags
                items={items}
                uniqueKey="id"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Kategori seçiniz"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor={Color.PURPLE[800]}
                tagTextColor="#CCC"
                selectedItemTextColor={Color.PURPLE[200]}
                selectedItemIconColor={Color.PURPLE[400]}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor={Color.PURPLE[400]}
                submitButtonText="Submit"
                scrollEnabled="false"
                values={this.state.selectedItems}
                styleDropdownMenuSubsection={{
                  borderWidth: 1,
                  marginBottom: -10,
                  marginHorizontal: 3,
                  paddingLeft: 10,
                  borderRadius: 15,

                }}
              />

              <View>
                {this.multiSelect ? this.multiSelect.getSelectedItemsExt(selectedItems) : null }
              </View>
            </View>
            
            <TouchableOpacity
             style={{ marginTop: 20, alignItems: 'center', backgroundColor: 'green',
              padding: 10 }}
              onPress={this.onSubmit}
              >
              <Text>POSTU GÖNDER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,


  },

  headerView:{
   width:windowWidth,
   height:windowHeight/18,
   backgroundColor: '#0E1B32',
   justifyContent: 'center',
   alignItems: 'center',
  },

  headerText:{
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
    

  },

  postView:{

    margin: 15,

  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },

})