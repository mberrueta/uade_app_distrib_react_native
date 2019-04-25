import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Card} from 'react-native-elements';
import Navigation from '../components/Navigation';
import AwesomeButton from "react-native-really-awesome-button";

export default class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            user: "felipe@gmail.com",
            pw: "12345678",
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
                this.storeData(responseOk.user_id);
                this.props.navigation.navigate('Movies', {response: responseOk});
                console.log("responseOK",responseOk);              
            }
            else{
                alert("failed");
            }

        })
        ;

        
    }

    storeData = async (user) => {
        try {
            await AsyncStorage.setItem('@user', user)
        } catch (e) {
            // saving error
        }
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
                    <View style={{margin:20}}>
                        <Text 
                            style={{fontSize: 27, marginLeft: 125}}>
                            New User
                        </Text>
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            //placeholder='Email' 
                            onChangeText = {this.updateNewUser}
                            label="Email"
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            //placeholder='Nombre' 
                            onChangeText = {this.updateNewName}
                            label="Nombre"
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Password' 
                            onChangeText = {this.updateNewPw}
                            label="Contrasena"
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.newUser.bind(this)}
                            //title="Submit"
                            mode="contained"
                            color="lightblue"
                        >
                            Registrar
                        </Button>
                    </View>
                    <View style={{margin:20}} alignContent='center'>
                        <Button mode="outlined" onPress={() => {this.updateNewUserForm(false)}} color="lightblue">Volver</Button>
                    </View>
                </View>
            )
        }
        else{

            return (
                <View>
                    <Navigation/>
                    <View style={{margin:20}}>
                        <Text 
                            style={{fontSize: 27, marginLeft:150}}>
                            Login
                        </Text>
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            //placeholder='Username' 
                            onChangeText = {this.updateUser}
                            label="Usuario"
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            //placeholder='Password' 
                            onChangeText = {this.updatePw}
                            label="Contrasena"
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.login.bind(this)}
                            mode="contained"
                            color="lightblue"
                        >
                            Entrar
                        </Button>
                    </View>
                    <View style={{margin:20}}>
                        <Button mode="outlined" onPress={() => {this.updateNewUserForm(true)}} color="lightblue">Registrarse</Button>
                    </View>
                </View>
            )

         }
        
    }
}