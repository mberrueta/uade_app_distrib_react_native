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
import Navigation from '../components/Navigation';
import AwesomeButton from "react-native-really-awesome-button";
import { AsyncStorage } from 'AsyncStorage';

export default class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            user: "",
            pw: "",
            newUser: "",
            newPw:"",
            newName: "",
            newUserForm: false,
            //response: {}
        }

    }

    updateUser = user => {
        this.setState({ user: user });
    };

    updatePw = pw => {
        this.setState({ pw: pw });
    };

    updateNewUser = newUser => {
        this.setState({ newUser: newUser });
    };

    updateNewPw = newPw => {
        this.setState({ newPw: newPw });
    };

    updateNewName = newName => {
        this.setState({ newName: newName });
    };


    updateNewUserForm (show) {
        this.setState({newUserForm: show});
    }

    login(){
        console.log("user", this.state.user);
        console.log("pw", this.state.pw);

        let data = {
            email: this.state.user,
            pass: this.state.pw
        }

        //console.log(JSON.stringify(data));

        const endpoint_auth = `https://uade-app-distrib-node-back.herokuapp.com/auth/signin`;
        //console.log("endpoint:", endpoint);
        fetch(endpoint_auth,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            (response) => {
                if(response.status == 200){
                    return response.json();
                }
                else{
                    return null;
                }
            }
        ).then(responseOk => {
            if(responseOk){
                //alert("ok");
                //this.setState({response: responseOk});

                storeData = async () => {
                    try {
                      await AsyncStorage.setItem('@user_data', responseOk)
                    } catch (e) {
                      // saving error
                    }
                  }

                this.props.navigation.navigate('Movies', {response: responseOk});
            }
            else{
                alert("failed");
            }

        })
        ;

        
    }

    newUser(){
        console.log("newUser", this.state.newUser);
        console.log("newPw", this.state.newPw);
        console.log("newName", this.state.newName);

        let data = {
            email: this.state.newUser,
            pass: this.state.newPw,
            name: this.state.newName
        }

        //console.log(JSON.stringify(data));

        const endpoint_new_user = `https://uade-app-distrib-node-back.herokuapp.com/users`;
        //console.log("endpoint:", endpoint);
        fetch(endpoint_new_user,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            (response) => {
                console.log("response",response);
                //return response.json();
            }
        );

        this.props.navigation.navigate('Movies');
    }

    render() {

        if(this.state.newUserForm){
            
            return (
                <View>
                    <Navigation/>
                    <Card>
                        <Text 
                            style={{fontSize: 27}}>
                            Nuevo Usuario
                        </Text>
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Email' 
                            onChangeText = {this.updateNewUser}
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Nombre' 
                            onChangeText = {this.updateNewName}
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Password' 
                            onChangeText = {this.updateNewPw}
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.newUser.bind(this)}
                            title="Submit"
                            style={{padding:50, height:50}}
                        />
                    </Card>
                    <View style={{marginTop:50, marginLeft:120}} alignContent='center'>
                        <AwesomeButton height={30} onPress={() => {this.updateNewUserForm(false)}}>Volver</AwesomeButton>
                    </View>
                </View>
            )
        }
        else{

            return (
                <View>
                    <Navigation/>
                    <Card>
                        <Text 
                            style={{fontSize: 27}}>
                            Login
                        </Text>
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Username' 
                            onChangeText = {this.updateUser}
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Password' 
                            onChangeText = {this.updatePw}
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.login.bind(this)}
                            title="Submit"
                            style={{padding:50, height:50}}
                        />
                    </Card>
                    <View style={{marginTop:50, marginLeft:120}} alignContent='center'>
                        <AwesomeButton height={30} onPress={() => {this.updateNewUserForm(true)}}>Registrar nuevo usuario</AwesomeButton>
                    </View>
                </View>
            )

         }
        
    }
}