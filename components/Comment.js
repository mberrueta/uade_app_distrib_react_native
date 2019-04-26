import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { ListItem, Rating } from 'react-native-elements';
import moment from 'moment';

class Comment extends Component {

    constructor(props){
        super(props);
    }

    render(){
        let no_img = require ("../assets/images/face.png")
        let data = this.props.movie.user.full_contact_data
        let title = data ? `${this.props.movie.user.name} (${data.full_name} ${data.age || '' })` : this.props.movie.user.name
        return (


            <ListItem
                key={this.props.movie.id}
                leftAvatar={{ source: (data && data.photo)  && { uri: data.photo } || no_img }}

                title={title}
                subtitle={
                    <View>
                        <Text>{data && data.location}</Text>
                        <Text style={{fontStyle: 'italic'}}>{this.props.movie.comment}</Text>
                        <Text>{moment(this.props.movie.comment.date).fromNow()}</Text>
                    </View>
                }
                rightAvatar = {<Rating startingValue={this.props.movie.stars} imageSize={12} readonly/>}
            />
        )

    }
}


export default Comment;