import React, { Component } from 'react'
import { Text, View, StyleSheet, Header, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { Textarea } from 'native-base'

// TODO: use global config
const url = 'http://www.omdbapi.com/?&apikey='
const apikey = 'd0b64143'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

class Serie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // imdbID: props.imdbID || 'tt3165576'
      movie: props.navigation.getParam('movie')

    }
    const endpoint = `${url}${apikey}&Type=series&i=${this.state.movie.imdbID}`
    fetch(endpoint).then(
      (response) => {
        return response.json()
      }
    ).then(responseData => {
      this.setState({ movie: responseData })
    })
  }

  render () {
    // let imageUri = this.state.movie.Poster != 'N/A' ? {uri: this.state.movie.Poster} : require('.././assets/images/no_image.jpg');
    let imageUri = this.state.movie.Poster
    let rating = this.state.movie.imdbRating / 2
    return (
      <ScrollView>
        { <View style={styles.titleView}>
          <Text style={styles.titleText}>
            {'\n'}{'\n'}
            {this.state.movie.Title} ({this.state.movie.Year}) {'\n'}{'\n'}
          </Text>
        </View> }
        {/* <Header
                    centerComponent={{ text: {this.state.movie.Title}, style: { color: '#fff' } }}
                /> */}
        <View style={styles.subTitleView}>
          <Text style={styles.subTitleText}>
            {this.state.movie.Genre} | {this.state.movie.Language} | {this.state.movie.Released} ({this.state.movie.Country})
          </Text>
        </View>

        <Card
          key={this.state.movie.imdbID}
          image = {{ uri: imageUri }}
          imageStyle= {{ width: 300, height: 444, marginLeft: 40 }}>

          <Text>
            {this.state.movie.Plot}{'\n'}{'\n'}

                        Director: {this.state.movie.Director} {'\n'}
                        Actors: {this.state.movie.Actors}

          </Text>

          <Rating showRating fractions="{1}" startingValue={rating} />

        </Card>

        <Card
          title="Comments:">

          <View>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { require: ('../assets/images/face.png') } }}
                  title={l.name}
                  subtitle={l.subtitle}
                />
              ))
            }
          </View>

          <View>
            <Textarea rowSpan={5} bordered placeholder="Add Comments..." />
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0 }}
              title='Add'/>
          </View>

        </Card>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin'
  },
  titleView: {
    height: 80,
    backgroundColor: 'blue',
    paddingStart: 5
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  subTitleView: {
    height: 30,
    backgroundColor: 'blue',
    paddingStart: 10,
    paddingBottom: 5
  },
  subTitleText: {
    fontSize: 12,
    color: 'white'
  },
  imgView: {
    height: 250,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgage: {
    width: 200,
    height: 200
  }
})

export default Serie
