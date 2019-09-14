import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, Image } from 'react-native';
import { HeaderButton, CommonPage } from '../components';
import { NavigationActions } from 'react-navigation';

class Preview extends Component{    
    constructor(props){    
        super(props) 

        this.state = {
            id_main: 0,
            title: '',
            category: '',
            abbrAndMeaning: [],
            numberKey: 0,            
        }        
    }

    componentDidMount(){
        this.insertState();
    }

    //extract data abbr and meaning
    extractData = () => {
        const { styText, styItem, styAbbr } = styles;

        return (
            this.state.abbrAndMeaning.map((data, index) => 
                (
                    <View style={ styItem }>
                        <Text style={ styAbbr }>{ data.abbrData + ": " }</Text>
                        <Text style={styText}>{ data.meaningData }</Text>
                    </View>
                )
            )
        )
    }

    setKeyword = () => {
        let temp = '';

        this.state.abbrAndMeaning.map(data => {
            temp += data.abbrData
        });

        return temp;
    }

    insertState = () =>{
        const { params } = this.props.navigation.state;

        this.setState({ id_main: params.id_main,
            title: params.title,
            category: params.category,
            abbrAndMeaning: params.abbrAndMeaning,
            numberKey: params.numberKey});
    }

    static navigationOptions = ({ navigation }) => {                

        return({
            headerLeft: (
                <HeaderButton onPress={() => navigation.dispatch(NavigationActions.back())}>
                    <Image 
                        source={require('../img/back.png')} 
                        style={{ width: 33, height: 33, tintColor: '#f8fcf6' }}                                             
                    />
                </HeaderButton>
            )   
        })        
    }
    
    getTopContent = () => {
        const { keyBold, styIcon, styKeyword, styTitle } = styles;
        
        let keyword = null;
        let title = <Text style={ styTitle }>Title Not Set</Text>
        
        if (this.state.numberKey > 0){
            keyword = (
                <View style={styKeyword}>
                    <Image 
                        style={ styIcon }
                        source={require('../img/key.png')}                            
                    />
                    <Text style={ keyBold }>
                        { this.setKeyword()}
                    </Text>
                </View>
            )
        }

        if (this.state.title != null && this.state.title != ''){
            title = <Text style={ styTitle }>
                {this.state.title}
            </Text>
        }

        return (
            <View>
                { title }
                { keyword }
            </View>
        );
    }

    getMainContent = () => {
        let content = null;
        const { styEmptyList, styThin, styBold, imgInfo } = styles;

        if (this.state.numberKey > 0){
            content = (
                content = this.extractData()             
            );
        }else {
            content = (
                <View style={styEmptyList}> 
                    <Image style={imgInfo} source={require('../img/empty_list.png')} />                  
                    <Text style={styBold}>Empty List</Text>
                    <Text style={styThin}>Create min 1 abbrevation</Text>
                </View>
            );
        }

        return content;
    }

    render(){
        const { styContent } = styles;    

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#3867D6' />
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <CommonPage>
                        {this.getTopContent()}    
                        {this.getMainContent()}
                    </CommonPage>
                </ScrollView>                  
            </View>
        );
    }
}

const styles = {
    styItem: {
        flexDirection: "row", 
        marginBottom: 20, 
        borderBottomWidth: 0.5, 
        borderColor: '#dfe4ea', 
        paddingBottom: 10
    }, 
    styAbbr:{
        fontWeight: 'bold'
    },
    styTitle: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 30
    },
    styContent: {
        flex: 1,                
        backgroundColor: '#ffffff'
    },
    keyBold: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    styText: {
        flex: 0, 
        height: 21, 
        justifyContent: 'center', 
        color: '#747d8c',
        fontFamily: 'quicksand',
    },
    styEmptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    styThin: {
        fontFamily: 'quicksand',
        color: '#dfe4ea'
    },
    styBold: {
        fontSize: 19,
        fontFamily: 'quicksand-medium'
    },
    styIcon: {        
        height: 15,
        width: 15,   
        marginRight: 10,
        marginLeft: -2,
        tintColor: '#45AAF2'
    },
    styKeyword: {
        flexDirection: "row",
        marginBottom: 20
    },
    imgInfo: {
        marginTop: -10,
        marginBottom: 30,
        width: 200,
        height: 200
    },
}

export { Preview }