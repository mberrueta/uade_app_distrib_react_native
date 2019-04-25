import MoviesSearch from './MoviesSearch'

class SeriesSearch extends MoviesSearch {
  constructor (props) {
    super(props)
    this.state.type = 'series'
  }
}

export default SeriesSearch
