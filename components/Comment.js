import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { ListItem, Rating } from 'react-native-elements'

class Comment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <ListItem
        key={this.props.movie.id}
        leftAvatar={{ source: require('../assets/images/face.png') }}
        title={this.props.movie.user.name}
        subtitle={
          <View>
            <Text style={{ fontStyle: 'italic' }}>{this.props.movie.comment}</Text>
          </View>
        }
        rightAvatar = {<Rating startingValue={this.props.movie.stars} imageSize={12} readonly/>}
      />
    )
  }
}

export default Comment
