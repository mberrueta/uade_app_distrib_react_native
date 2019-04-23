import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import {Card} from 'react-native-elements';

export default class Login extends Component {
    
    constructor(props){
        super(props);
    }

    login(){
        console.log("entre");
        console.log("props", this.props)
        this.props.navegador.navigate('Movies');
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Card>
                    <Text 
                        style={{fontSize: 27}}>
                        Login
                    </Text>
                    <TextInput style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} placeholder='Username' />
                    <TextInput style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} placeholder='Password' />
                    <View style={{margin:7}} />
                    <Button 
                            onPress={this.login.bind(this)}
                            title="Submit"
                            style={{padding:50, height:50}}
                        />
                        {/* <TouchableOpacity style={{ height: 100, marginTop: 10, backgroundColor: "blue" }}>
                         <Text>Entrar</Text>
</TouchableOpacity> */}
                </Card>
            </ScrollView>
            )
    }
}