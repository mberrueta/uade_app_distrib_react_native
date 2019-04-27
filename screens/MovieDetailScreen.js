import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, AsyncStorage} from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';
import {Textarea} from 'native-base';
import Comment from '../components/Comment';
import RadioGroup from 'react-native-radio-buttons-group';
import Config from '../constants/Config';
import Loader from '../components/Loader';


class MovieDetailScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            movie: props.navigation.getParam('movie'),
            comments: null,
            commentToSave:"",
            type: 'movie',
            browser: props.navigation.getParam('browser'),
            alertMsg:"",
            ranking: 3,
            user: null,
            loading: false,
            ratingOptions: [
                { label: '1' },
                { label: '2' },
                { label: '3', selected: true },
                { label: '4' },
                { label: '5' }
            ]

        }
        this.fetchData = this.fetchData.bind(this)

        const endpoint = `${Config.url}${Config.apikey}&Type=${this.state.type}&i=${this.state.movie.imdbID}`;
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            this.setState({movie: responseData})
        });

        this.saveComment = this.saveComment.bind(this);
        this.updatecommentToSave = this.updatecommentToSave.bind(this);

        
    }

    static navigationOptions = ({ navigation }) => {
        const movie = navigation.getParam('movie');
        return {
          title: `${movie.Title} (${movie.Year})`,
          headerStyle: {
            backgroundColor: '#0099ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        };
      };

    componentDidMount(){
        this.getData(this.fetchData);
    }
      
    fetchData(){
        this.setState({loading: true});
        const endpoint_back_movies = `${Config.api_url}/movie-comments/${this.state.movie.imdbID}`;
        fetch(endpoint_back_movies,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.state.user.token}`
                }
            }
        ).then(
            (response) => {
                return response.json();
            }
        ).then(responseDataBack => {
            const results = responseDataBack.comments;
            var movieComments = [];

            results.forEach( (movie) => {
                const movieComment =
                    <Comment movie={movie} key={movie.id}/>

                movieComments.push(movieComment);
            })

            this.setState({comments: movieComments,commentToSave:"", loading: false});
        });
    }


    getData = async (cb) => {
        const user = await AsyncStorage.getItem('@user');
        if(user !== null) {      
        this.setState({user: JSON.parse(user) }, cb)
        }
    }

    updatecommentToSave = commentToSave => {
        this.setState({ commentToSave: commentToSave });
    };

    updateRanking = ranking => {
        this.setState({ ranking: ranking.find(e => e.selected == true).value });
    };

    saveComment(){
        let data = {
            imdb_id: this.state.movie.imdbID,
            imdb_title: this.state.movie.Title,
            comment: this.state.commentToSave,
            stars: this.state.ranking
        }

        const endpoint_back_movies_post = `${Config.api_url}/movie-comments/`;
        console.log("endpoint",endpoint_back_movies_post);
        fetch(endpoint_back_movies_post,
            {
                method: 'POST',
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
        ).then(responseDataBack => {
            var txt_title = 'Error!'
            var txt = 'something went wrong'
            if(responseDataBack){
                txt_title = 'Thanks!'
                txt = 'Your comment has been saved successfully.'
            }

            const alertMsg = Alert.alert(
                txt_title,
                txt,
                [
                  {text: 'OK', onPress: () => this.componentDidMount()},
                ],
                {cancel: true},
              );
            this.setState({
                alertMsg: alertMsg,
                commentToSave: ""
            });
            
        });

    }

    render(){
        let image_uri = this.state.movie.Poster;
        let rating = this.state.movie.imdbRating / 2;

        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled key={this.state.uniqueValue}>
            <Loader loading={this.state.loading} />
            <ScrollView key={`${this.state.movie.imdbID}_view`}>
                {/* { <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        {this.state.movie.Title} ({this.state.movie.Year})
                    </Text>

                </View> } */}
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>
                        {this.state.movie.Genre} | {this.state.movie.Language} | {this.state.movie.Released} ({this.state.movie.Country})
                    </Text>
                </View>


                <Card 
                    key={this.state.movie.imdbID}
                    image = {{ uri: image_uri }}
                    imageStyle= {{width:300, height:444, marginLeft:40}}>

                    <Text>
                        {this.state.movie.Plot}{'\n'}{'\n'}

                        Director: {this.state.movie.Director} {'\n'}
                        Actors: {this.state.movie.Actors} {'\n'} {'\n'}
                    </Text>

                    <Rating showRating fractions={1} startingValue={rating} readonly/>

                </Card>

                <Card 
                    title="Comments:">

                    <View>
                        {this.state.comments}
                    </View>

                    <View>
                        <Textarea rowSpan={5} bordered
                            placeholder="Add Comments..."
                            onChangeText={this.updatecommentToSave}
                            value={this.state.commentToSave}
                            style={{marginBottom:10}}    
                        />
                        <View style={{width:300}}>
                            <Text>
                                Ranking:
                            </Text>

                            <RadioGroup
                                radioButtons={this.state.ratingOptions}
                                onPress={this.updateRanking}
                                flexDirection='row' />
                        </View>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                            onPress={this.saveComment}
                            title='Add'/>
                            
                    </View>

                    <Text>
                        {this.state.alertMsg}
                    </Text>
                </Card>
                

            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    baseText: {
      fontFamily: 'Cochin',
    },
    titleView: {
        height: 80,
        backgroundColor: '#0099ff',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    subTitleView: {
        height: 30,
        backgroundColor: '#0099ff',
    },
    subTitleText: {
        fontSize: 12,
        color: 'white'
    },
    imgView: {
        height: 250,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgage: {
        width:200,
        height: 200
    }
  });

  export default MovieDetailScreen;