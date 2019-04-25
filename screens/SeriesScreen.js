import SeriesSearch from '../components/SeriesSearch';
import MoviesScreen from './MoviesScreen';



export default class SeriesScreen extends MoviesScreen {

  render() {
    return (
      <View style={styles.container}>
        <Navigation/>
        <SeriesSearch navegador={this.props.navigation}/>
      </View>
    );
  }
}
