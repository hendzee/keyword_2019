import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, Image } from 'react-native';
import { HeaderButton, CommonPage } from '../components';
import Realm from 'realm';

class Review extends Component{    
    constructor(props){     
        super(props);

        this.state = {
            listTableData: [],
            title: '',
            category: ''
        };      
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        const { params } = this.props.navigation.state;

        Realm.open(databaseOptions).then(realm => {
            let dataTable = realm.objects('list_table').filtered('id_main = $0', params.dataReview);

            this.setState({ listTableData: dataTable });
        });

        this.setState({ title: params.dataTitle, category: params.dataCategory })
    }

    //extract data abbr and meaning
    extractData = () => {
        const { styText, styItem, styAbbr } = styles;

        return (
            this.state.listTableData.map((data, index) => 
                (
                    <View key={index} style={ styItem }>
                        <Text style={ styAbbr }>{ data.abbrevation + ": " }</Text>
                        <Text style={styText}>{ data.meaning }</Text>
                    </View>
                )
            )
        )
    }

    setKeyword = () => {
        let temp = '';

        this.state.listTableData.map(data => {
            temp += data.abbrevation
        });

        return temp;
    }

    static navigationOptions = ({ navigation }) =>{                
        return{
            headerLeft: (
                <HeaderButton onPress={() => navigation.navigate('home')}>
                    <Image 
                        source={require('../img/back.png')} 
                        style={{ width: 33, height: 33, tintColor: '#f8fcf6' }}                                             
                    />
                </HeaderButton>
            )
        }
    }
    
    getTopContent = () => {
        const { keyBold, styIcon, styKeyword, styTitle } = styles;
        
        let keyword = (
            <View style={styKeyword}>
                <Image 
                    style={ styIcon }
                    source={require('../img/key.png')}                            
                />
                <Text style={ keyBold }>
                    { this.setKeyword()}
                </Text>
            </View>
        );

        let title = <Text style={ styTitle }>
            {this.state.title}
        </Text>

        return (
            <View>
                { title }
                { keyword }
            </View>
        );
    }

    render(){
        const { styContent } = styles;    

        return(
            <View style={ styContent }>
                <StatusBar backgroundColor='#3867D6' />
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <CommonPage>
                        {this.getTopContent()}    
                        {this.extractData()}
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

export { Review }