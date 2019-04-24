import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';



class Navigation extends Component {

    
    
    render(){
        return(
            <View >
                <Header
                leftComponent={{ icon: 'tv', color: '#fff' }}
                centerComponent={{ text: 'APD Movies', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View>

        )

    }

}

export default Navigation;