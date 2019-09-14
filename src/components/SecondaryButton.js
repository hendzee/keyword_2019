import React, { COmponent } from 'react';
import { View, TouchableOpacity } from 'react-native';

const SecondaryButton = (props) => {
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
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 35,
        borderWidth: 1,
        borderColor: '#1e90ff',
        backgroundColor: 'transparent',
        marginBottom: 10        
    }
}

export { SecondaryButton }