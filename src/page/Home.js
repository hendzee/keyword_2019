import React, { Component } from 'react';
import { Text, View, BackHandler, StatusBar, Image, FlatList} from 'react-native';
import { DataList, HeaderButton, CommonPage, FloatButton } from '../components';
import Realm from 'realm';

class Home extends Component{
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props){
        super(props);
        this.state = {
            mainTableData: [],
            deleteList: []           
        };
        this.selectHandler.bind(this);  
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler));      
    } 
    
    fetchData = () => {
        Realm.open(databaseOptions).then(realm => {
            let getData = realm.objects('main_table').sorted('title');
            
            getData.map(data => {
                this.setState({ mainTableData: [...this.state.mainTableData, {
                    id_main: data.id_main,
                    title: data.title,
                    category: data.category,
                    status: data.status,
                    checkBoxStatus: false
                }]})
            })                    
        });    
    }
    
    selectHandler = id_main => {
        let tempData = this.state.mainTableData;
        let tempDelete = this.state.deleteList;

        tempData.map(data => {
            if (data.id_main == id_main){
                data.checkBoxStatus = !data.checkBoxStatus
                
                if (data.checkBoxStatus == true){
                    tempDelete = [...tempDelete, id_main];
                } else {
                    let dataFilter = [];
                    dataFilter = tempDelete.filter(dataDeselect => {
                        return dataDeselect !== id_main;
                    });

                    tempDelete = dataFilter;
                }
            }

            this.setState({ 
                mainTableData: tempData, 
                deleteList: tempDelete
            });
        });
    }

    deleteListHandler = () => {
        Realm.open(databaseOptions).then(realm => {
            realm.write(() => {
                this.state.deleteList.map(dataDelete => {
                    let selectObjectMain = realm.objects('main_table').filtered('id_main = $0', dataDelete);
                    let selectObjectList = realm.objects('list_table').filtered('id_main = $0', dataDelete)
    
                    realm.delete(selectObjectMain);
                    realm.delete(selectObjectList);
                })
            })
            this.state.deleteList.map(stateDelete => {
                this.setState(prevState => {
                    return {
                        mainTableData: prevState.mainTableData.filter(param => {
                            return param.id_main !== stateDelete
                        }),
                        deleteList: []
                    }
                })
            })
        });   
    }

    componentDidMount() {
        this.fetchData();
        this.props.navigation.setParams({ deleteHandler: this.deleteListHandler });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler));
    }

    componentWillUnmount(){
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    backButtonHandler = () =>{
        BackHandler.exitApp();
        return true;
    }

    static navigationOptions = ({ navigation }) => {        
        const { navigate } = navigation;
        let content = null;
        
        return{
            headerRight: (
                <View style={{ flexDirection: 'row' }}>
                    <HeaderButton onPress={navigation.getParam('deleteHandler')}>
                        <Image 
                            source={require('../img/delete.png')} 
                            style={{ width: 31, height: 31, tintColor: '#ffffff' }}                                             
                        />
                    </HeaderButton>
                </View>
            ),   
        }        
    }        

    getMainContent = () => {
        let content = null;
        const { styEmptyList, styThin, styBold, imgInfo } = styles;

        if (this.state.mainTableData.length > 0){
            content = (
                <FlatList 
                    data={this.state.mainTableData}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.toString()}
                    renderItem={({item}) => 
                        <DataList 
                            CBoxValue={item.checkBoxStatus}
                            onChangeCheck={this.selectHandler.bind(null, item.id_main)}
                            key={ item.id_main } 
                            data={ item } onPress={() => this.props.navigation
                                .navigate('review', { dataReview: item.id_main, dataTitle: item.title,
                                dataCategory: item.category }) }
                        />
                    }
                />
            );
        }else {
            content = (
                <View style={styEmptyList}>
                    <Image style={imgInfo} source={require('../img/empty_list.png')} />
                    <Text style={styBold}>Empty List</Text>
                    <Text style={styThin}>Press plus icon to create new keyword</Text>
                </View>
            );
        }

        return content;
    }

    render(){        
        const { styContent, styScroll, styTopTitle} = styles;
        const { navigate } = this.props.navigation;

        return(                        
            <View style={ styContent }>
                <StatusBar backgroundColor='#3867d6' />
                <CommonPage>
                   {this.getMainContent()}
                   <FloatButton onPress={() => navigate('additems')}>
                        <Image 
                            source={require('../img/add.png')} 
                            style={{ width: 31, height: 31, tintColor: '#ffffff' }}                                             
                            />
                    </FloatButton>
                </CommonPage>
            </View>
        );
    }    
}

const styles = {
    styContent: {
        flex: 1, 
        backgroundColor: '#ffffff'             
    },    
    styTopTitle: {
        flex: 1, 
        color: '#747d8c', 
        fontSize: 18,
        fontFamily: 'quicksand'  
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
    imgInfo: {
        marginTop: -30,
        marginBottom: 30
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

export { Home }