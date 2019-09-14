import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

const HeaderButton = (props) => {
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
        marginTop: 0.1,
        marginRight: 13,
        marginLeft: 3
    }
}

export { HeaderButton };