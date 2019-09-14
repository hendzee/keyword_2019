import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import { HeaderButton, CommonPage, InputBox, ColumnBox, PrimaryButton, SecondaryButton, Separator} from '../components'
import Realm from 'realm';

class AddItems extends Component{
    constructor(props){
        super(props);
        this.state = { 
            id_main: 0,
            title: '',
            category: '',
            tempAbbr: '',
            abbrAndMeaning: [],
            tempMeaning: '',   
            numberKey: 0,
            status: '',
        };
    }    

    static navigationOptions = ({ navigation }) => {                
        const { stySaveWrap, stySave } = styles;

        return({
            headerLeft: (
                <HeaderButton onPress={() => navigation.navigate('home')}>
                    <Image 
                        source={require('../img/back.png')} 
                        style={{ width: 33, height: 33, tintColor: '#f8fcf6' }}                                             
                    />
                </HeaderButton>
            ),
            headerRight: (
                <View style={ stySaveWrap }>
                    <TouchableOpacity onPress={ navigation.getParam('saveHandler') }>
                        <Text style={ stySave }>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            ),   
        })        
    }       

    componentDidMount(){
        this.props.navigation.setParams({ saveHandler: this.saveData });
        this.setState({ status: 'OPEN' });
    }

    createIdMain = () => {
        let temp = Math.floor((Math.random() * 100) + 1);

        Realm.open(databaseOptions).then(realm => {                            
            while(true){
                temp = Math.floor((Math.random() * 100) + 1);

                let searchId = realm.objects('main_table').filtered('id_main = $0', temp);                    
                
                if(searchId.length == 0){                
                    break;
                }
            }                            

            this.setState({ id_main: temp });            
        });        
    }

    createIdList = () => {
        let temp = Math.floor((Math.random() * 100) + 1);
        
        Realm.open(databaseOptions).then(realm => {
            while(true){
                temp = Math.floor((Math.random() * 100) + 1);

                let searchId = realm.objects('list_table').filtered('id_list = $0', temp);                    
                
                if(searchId.length == 0){                
                    break;
                }
            }            
        });

        return temp;
    }

    insertState = () => {
        let tempOne = this.state.tempAbbr;
        let tempTwo = this.state.tempMeaning;

        if(tempOne !== null && tempOne !== '' && tempTwo !== null && tempTwo !== ''){
            this.setState({
                abbrAndMeaning: [...this.state.abbrAndMeaning, { abbrData: tempOne, meaningData: tempTwo }]                    
            }, () => {
                this.setState({ tempAbbr: '' });
                this.setState({ tempMeaning: '' });
                this.setState({ numberKey: this.state.numberKey + 1 });

                ToastAndroid.showWithGravity(
                    "Key " + (this.state.numberKey+1) + " added",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            });                        
        }
    }   

    deleteState = () => {
        this.setState({
            id_main: 0,
            title: '',
            category: '',
            tempAbbr: '',
            abbrAndMeaning: [],
            tempMeaning: '',   
            numberKey: 0,
            status: '', });
    }

    saveData = () => {
        if (this.state.title == null || this.state.category == null || 
            this.state.title == '' || this.state.category == ''){
            
            ToastAndroid.showWithGravity(
                'input title and category',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }else {
            if (this.state.numberKey <= 0){
                ToastAndroid.showWithGravity(
                    'create abbrevation',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }else {
                this.createIdMain();
        
                Realm.open(databaseOptions).then(realm => {
                    
                    realm.write(() => {
                        realm.create('main_table', {
                            id_main: this.state.id_main,
                            title: this.state.title,
                            category: this.state.category,
                            status: this.state.status
                        })
                    });

                    this.state.abbrAndMeaning.map(data => {
                        let tempIdList = this.createIdList();
                        let abbrVal = data.abbrData;
                        let meaningVal = data.meaningData;
                        
                        realm.write(() => {                                                    
                            realm.create('list_table', {
                                id_main: this.state.id_main,
                                id_list: tempIdList,
                                abbrevation: abbrVal,
                                meaning: meaningVal
                            });
                        });                        
                    });
                    
                    this.cleanState();
                    ToastAndroid.showWithGravity(
                        'data saved',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                });
            }
        }
    }

    cleanState = () => {
        this.setState({
            id_main: 0,
            title: '',
            category: '',
            tempAbbr: '',
            abbrAndMeaning: [],
            tempMeaning: '',   
            numberKey: 0,
        })
    }

    render(){
        const { styContent, styInput, styIcon, stySubtitle, styButtonText, 
        styButtonText2 } = styles;

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#3867D6' />                
                <ScrollView>
                    <CommonPage>
                    <Text style={ stySubtitle }>
                        Description
                    </Text>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/create.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input title'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#f1f2f6'
                            maxLength={ 25 }
                            onChangeText={(text) => this.setState({ title: text })}
                            value={ this.state.title }
                            autoCapitalize='sentences'
                        />
                    </InputBox>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/label.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input category'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#f1f2f6'
                            maxLength={ 15 }
                            onChangeText={(text) => this.setState({ category: text })}
                            value={ this.state.category }
                            autoCapitalize='sentences'
                        />
                    </InputBox>                   
                    <Text style={ stySubtitle }>
                        Keyword { '(' + this.state.numberKey + ')' }
                    </Text>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/key.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input abbrevation'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#f1f2f6'
                            maxLength={ 15 }
                            onChangeText={(text) => this.setState({ tempAbbr: text })}
                            value={ this.state.tempAbbr }
                            autoCapitalize='characters'
                        />
                    </InputBox>
                    <InputBox>
                        <Image 
                            style={ styIcon }
                            source={require('../img/eye.png')}                            
                        />
                        <TextInput 
                            style={ styInput }
                            placeholder='input meaning'
                            placeholderTextColor='#a4b0be'
                            underlineColorAndroid= '#f1f2f6'
                            maxLength={ 15 }
                            onChangeText={(text) => this.setState({ tempMeaning: text })}
                            value={ this.state.tempMeaning }
                            autoCapitalize='characters'
                        />
                    </InputBox>
                    <ColumnBox>  
                        <SecondaryButton onPress={ () => this.props.navigation.navigate(
                            'preview', 
                            { 
                                id_main: this.state.id_main,
                                title: this.state.title,
                                category: this.state.category,
                                abbrAndMeaning: this.state.abbrAndMeaning,
                                numberKey: this.state.numberKey,
                                status: this.state.status
                            }) }>
                            <Text style={ styButtonText2 }> Preview </Text>
                        </SecondaryButton>
                        <Separator />
                        <PrimaryButton onPress={ this.insertState }>
                            <Text style={ styButtonText }> Add </Text>
                        </PrimaryButton>                            
                    </ColumnBox>                                                       
                </CommonPage>                                                       
                </ScrollView>
            </View>
        );
    }    
}

const styles = {
    styContent: {
        flex: 1,     
        backgroundColor: '#ffffff'           
    },
    styInput: {
        flex:1,        
        height: 45,
        fontFamily: 'quicksand',
        paddingTop: 10,
    },
    styIcon: {        
        height: 17,
        width: 17,   
        marginLeft: 15,
        marginTop: 15,               
        marginRight: 15,      
        marginBottom: 15,
        tintColor: '#a4b0be'
    },
    stySubtitle: {
        color: '#a4b0be',                             
        marginTop: 15,
        marginBottom: 10,
        fontFamily: 'quicksand'
    },
    styButtonText: {
        color: '#fff', 
        fontFamily: 'quicksand_medium'
    },
    styButtonText2: {
        color: '#1e90ff', 
        fontFamily: 'quicksand_medium'
    },
    stySaveWrap:{
        marginRight: 15
    },
    stySave:{
        fontSize: 18, 
        color: '#FFFFFF'
    }
}

//Realm Database
const mainTable = {
    name: 'main_table',
    properties: {
        id_main: 'int',
        title: 'string',
        category: 'string',
        status: 'string'
    }
}

const listTable = {
    name: 'list_table',
    properties: {
        id_main: 'int',
        id_list: 'int',
        abbrevation: 'string',
        meaning: 'string'
    }
}

const databaseOptions = {
    schema: [mainTable, listTable]
}

export { AddItems };