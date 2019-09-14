import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, CheckBox } from 'react-native';
import { DetailList, ImageList, DescList, WordList } from '../components';

class DataList extends Component{    
    constructor(props){
        super(props);
    }    
    render(){
        const { styBadge, styTitle, stySubTitle } = styles;                

        return(            
            <TouchableOpacity key={ this.props.data.id_main } onPress={this.props.onPress}>
                <DetailList>
                    <CheckBox 
                        value={this.props.CBoxValue}
                        onValueChange={this.props.onChangeCheck} 
                        containerStyle={{backgroundColor: 'pink'}}
                    />  
                    <DescList>                  
                        <Text style={ styTitle }>{ this.props.data.title }</Text>                        
                        <View style={ styBadge }>
                            <Text style={ stySubTitle }>
                                { this.props.data.category }
                            </Text>
                        </View>
                    </DescList>                      
                </DetailList>                                
            </TouchableOpacity>
        );
    }
}

const styles = {   
    styList: {
        flex: 1,        
        marginTop: 5,
        marginBottom: 5,        
    },       
    styTitle: {
        fontSize: 16,
        fontFamily: 'quicksand',
        marginBottom: 3
    },
    stySubTitle: {
        fontSize: 9,
        color: '#FFFFFF',
        fontFamily: 'quicksand'
    },
    styBadge: {
        backgroundColor: '#45AAF2', 
        padding: 2,
        paddingLeft: 10, 
        paddingRight: 10, 
        borderRadius: 10, 
        alignItems: 'center', 
        alignSelf:'baseline'
    }
}

export { DataList };