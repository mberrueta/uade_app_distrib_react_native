const users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
    ... // more users here
   ]
   
   import { View, Text, Image } from 'react-native'
   import { Card, ListItem, Button, Icon } from 'react-native-elements'
   
   
   // implemented with Text and Button as children
   <Card
     title='HELLO WORLD'
     image={require('../images/pic2.jpg')}>
     <Text style={{marginBottom: 10}}>
       The idea with React Native Elements is more about component structure than actual design.
     </Text>
     <Button
       icon={<Icon name='code' color='#ffffff' />}
       backgroundColor='#03A9F4'
       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
       title='VIEW NOW' />
   </Card>