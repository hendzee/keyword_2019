import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

const FloatButton = (props) => {
    const { styBtn } = styles;
    
    return(
        <View style={ styBtn }>
            <TouchableOpacity onPress={ props.onPress }>
                {props.children}
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    styBtn: {
        width: 50,  
        height: 50,   
        borderRadius: 30,            
        backgroundColor: '#45AAF2',                                    
        position: 'absolute',                                          
        bottom: 5,                                                    
        right: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export { FloatButton };