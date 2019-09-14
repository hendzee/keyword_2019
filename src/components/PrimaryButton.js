import React, { COmponent } from 'react';
import { View, TouchableOpacity } from 'react-native';

const PrimaryButton = (props) => {
    const { styContent, styBtn } = styles;

    return(
        <View style={ styContent }>
            <TouchableOpacity
                style={ styBtn }                                 
                onPress={ props.onPress } 
            >               
            { props.children }
            </TouchableOpacity> 
        </View>
    );
}

const styles = {
    styContent: {
        flex: 1
    },
    styBtn: {
        flex: 1,
        width: '100%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 35,
        backgroundColor: '#1e90ff',        
    }
}

export { PrimaryButton }