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
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.user) === true){
            
            let data = {
                email: this.state.user,
                pass: this.state.pw
            }
   
            const endpoint_auth = `https://uade-app-distrib-node-back.herokuapp.com/auth/signin`;
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
                    storedData = JSON.stringify(responseOk);
                    this.storeData(storedData);
                    console.log("STORED DATA",storedData);
                    this.props.navigation.navigate('Movies', {response: responseOk});
                    console.log("responseOK",responseOk);               
                }
                else{
                    alert("User or password are invalid.");
                }
    
            })
            ;

        }
        else{
            alert("Incorrect email format.");
        }

        

        
    }

    storeData = async (user) => {
        try {
            await AsyncStorage.setItem('@user', user)
        } catch (e) {
            // saving error
        }
    }
  

    newUser(){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.newUser) === true){
            let data = {
                email: this.state.newUser,
                pass: this.state.newPw,
                name: this.state.newName
            }    
            const endpoint_new_user = `https://uade-app-distrib-node-back.herokuapp.com/users`;
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
                        if(response.status == 200){
                            return response.json();
                        }
                        else{
                            return null;
                        }
                    }
                ).then(responseOk => {
                    if(responseOk){
                        //this.storeData(responseOk.token);
                        //this.props.navigation.navigate('Movies', {response: responseOk});
                        alert("Usuario creado correctamente.");
                        this.setState({newUserForm: false});              
                    }
                    else{
                        alert("User registration failed.");
                    }
        
                })
                ;
    
            //this.props.navigation.navigate('Movies');
        }
        else{
            alert("Formato de email incorrecto.")
        }
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
                            value={this.state.newUser}
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            //placeholder='Nombre' 
                            onChangeText = {this.updateNewName}
                            label="Name"
                            value={this.state.newName}
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            placeholder='Password' 
                            onChangeText = {this.updateNewPw}
                            label="Password"
                            secureTextEntry={true}
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.newUser.bind(this)}
                            //title="Submit"
                            mode="contained"
                            color="lightblue"
                        >
                            Submit
                        </Button>
                    </View>
                    <View style={{margin:20}} alignContent='center'>
                        <Button mode="outlined" onPress={() => {this.updateNewUserForm(false)}} color="lightblue">Back</Button>
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
                            value={this.state.user}
                            label="User"
                        />
                        <TextInput 
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            //placeholder='Password' 
                            onChangeText = {this.updatePw}
                            label="Password"
                            secureTextEntry={true}
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.login.bind(this)}
                            mode="contained"
                            color="lightblue"
                        >
                            Enter
                        </Button>
                    </View>
                    <View style={{margin:20}}>
                        <Button mode="outlined" onPress={() => {this.updateNewUserForm(true)}} color="lightblue">Register</Button>
                    </View>
                </View>
            )

         }
        
    }
}