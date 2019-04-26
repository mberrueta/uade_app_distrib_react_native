import MovieDetailScreen from './MovieDetailScreen'

class SeriesDetailScreen extends MovieDetailScreen {
  constructor (props) {
    super(props)
    this.state = {
      type: 'series'
    }
  }
}


export default SeriesDetailScreen
