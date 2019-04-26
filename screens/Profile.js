import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Button
} from 'react-native';
import { ListItem, Rating } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Config from '../constants/Config';
import Loader from '../components/Loader';
import {TextInput} from 'react-native-paper';


export default class Profile extends Component {

    constructor(){
        super();
        this.state = {
            userId: "",
            userName: "",
            userEmail: "",
            userToken: "",
            user: {},
            movies: null,
            loading: false,
            showChangePw: "",
            newPw: ""
        }

        this.fetchData = this.fetchData.bind(this)
      

    }


    componentDidMount(){
        this.getData(this.fetchData);
    }


    getData = async (cb) => {
    
        const storageValue = await AsyncStorage.getItem('@user');
        const storageValueJson = JSON.parse(storageValue);
        if(storageValue !== null) {
          this.setState({
              userId: storageValueJson.id,
              userName: storageValueJson.name,
              userEmail: storageValueJson.email,
              userToken: storageValueJson.token,
              user: storageValueJson
            }, cb)
        }
    }

    fetchData(){
        this.setState({loading: true});
        const endpoint_back_movies = `${Config.api_url}/movie-comments`;
        fetch(endpoint_back_movies,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.state.userToken}`
                }
            }
        ).then(
            (response) => {
                return response.json();
            }
        ).then(responseDataBack => {
            const results = responseDataBack.comments;
            var movies = [];

            let movies_titles = Object.keys(results);

                movies_titles.forEach(movie_title => {
                    let movie_comments = results[movie_title]
                    const movieComment =(
                    <View key={movie_title} style={{margin:10}}>
                        <Text 
                            style={{fontWeight:"bold", fontSize:18, color: "#00BFFF", textDecorationLine: 'underline'}}
                            //onPress={this.navigateToMovie}
                        >
                            {movie_title}
                        </Text>
                        {movie_comments.map(item => <ListItem
                            key={item.id}
                            title={item.comment}
                            subtitle={item.date}
                            rightAvatar = {<Rating startingValue={item.stars} imageSize={12} readonly/>}
                        /> )   }
                    </View>)

                    movies.push(movieComment);
                })                 

 
            this.setState({movies: movies, loading:false});



       });
    } 

    updateNewPw = pw => {
        this.setState({ newPw: pw });
    };

    changePw(){

            
            let data = {
                pass: this.state.newPw
            }

            const endpoint = `${Config.api_url}/users/`;
            fetch(endpoint,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${this.state.user.token}` 
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
                    this.props.navigation.navigate('Login');
                }
                else{
                    alert("FAILED.");
                }
    
            })
            ; 
    }


  render() {
    
    let no_img = require ("../assets/images/user.png");
    let data = this.state.user.full_contact_data;
    let title = data ? `(${data.full_name} ${this.state.user.gender || '' } ${data.age || '' })` : this.state.user.name
    let subtitle = data ? `${ data.location || '' }` : ''
    return (
      <ScrollView style={styles.container}>
            <Loader loading={this.state.loading} />
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={ (data && data.photo)  && { uri: data.photo } || no_img }/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.user.name}</Text>
              <Text style={styles.email}>{this.state.user.email}</Text>
              <Text style={styles.info}>{ title }</Text>
              <Text style={styles.info}>{ subtitle }</Text>
              <Text style={styles.description}>
                
              </Text>
              
              
              
            </View>
        </View>
        <View style={{marginLeft:50, marginRight:50}}>
        <TextInput
                style={{fontSize: 18, marginTop:5, marginBottom:5, height: 50, borderColor: "grey", borderBottomWidth: 1}}
                placeholder='New Password' 
                onChangeText={this.updateNewPw}
                label="New Password"
                secureTextEntry={true}
            />
        <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 10}}
            onPress={this.changePw.bind(this)}
            title='Change password'/>
            </View>
        <Text style={{fontWeight:"bold", fontSize:16, marginLeft:5, marginBottom:10, marginTop:10}}>Comments:</Text>
        <View>{this.state.movies}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  email:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
    textDecorationLine: 'underline'
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  }
});