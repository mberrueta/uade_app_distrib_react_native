import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Comment from '../components/Comment';

export default class Profile extends Component {

    constructor(){
        super();
        this.state = {
            userId: "",
            userName: "",
            userEmail: "",
            userToken: "",
            comments: null
        }
      

    }


    componentDidMount(){
        this.getData();

        //var token;
        const value = AsyncStorage.getItem('@user');
        console.log("VALUE", value);
        //const valueJson = JSON.parse(value);
       // const token = valueJson.token;

        //console.log("TOKENNN", token);

       const endpoint_back_movies = `https://uade-app-distrib-node-back.herokuapp.com/movie-comments`;
        console.log("endpoint:", endpoint_back_movies);
        fetch(endpoint_back_movies,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }
        ).then(
            (response) => {
                return response.json();
            }
        ).then(responseDataBack => {
            console.log("response",responseDataBack);
            const results = responseDataBack.comments;
            console.log("results",results);
            var movieComments = [];

            results.forEach( (movie) => {
                const movieComment =
                <Comment movie={movie}/>
                    
                movieComments.push(movieComment);
                

            })


            this.setState({comments: movieComments});

            console.log("Comments:",responseDataBack);


       });
        
    }


    getData = async () => {
    
        const value = await AsyncStorage.getItem('@user');
        const valueJson = JSON.parse(value);
        if(value !== null) {
          this.setState({
              userId: valueJson.user_id, 
              userName: valueJson.user_name,
              userEmail: valueJson.email,
              userToken: valueJson.token
            })
        }
    }

  render() {
    
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.userName}</Text>
              <Text style={styles.email}>{this.state.userEmail}</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>
                {this.state.comments}
              </Text>
              
              
            </View>
        </View>
      </View>
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
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});