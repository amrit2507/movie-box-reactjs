import React from 'react';
import { data } from '../data';
import { connect } from "react-redux";
import NavBar from './NavBar';
import MovieCard from './MovieCard';
import {addMovies,setShowFavourites} from '../actions';
// import { connect } from "../index";
// StoreContext can only be used in render method
// import { StoreContext } from "../index";

class App extends React.Component{
    componentDidMount(){
      // const {store}=this.props;
      //make api call
      //dispach action
      // store.subscribe(()=>{
      //   console.log('UPDATED');
      //   this.forceUpdate(); //shouldn't be used
      // })
      //after every dispatch subscribe would be called
      this.props.dispatch(addMovies(data));

      //console.log('STATE',this.props.store.getState());
    }
    isMovieFavourite=(movie)=>{
      const {movies}=this.props;
      
      const index=movies.favourites.indexOf(movie);
      if(index!==-1)
      {
        return true;
      }
      return false;
    }
    onChangeTab = (val)=>{
      this.props.dispatch(setShowFavourites(val))
    }
    render(){
      const {movies,search}=this.props;
      const {list,favourites,showFavourites}=movies//{movies:{list:[] , favourite:[],showFavourites:},search:{results:{}}}
      // console.log('RENDER',this.props.store.getState());
      
      const displayMovies=showFavourites?favourites:list;
      return (
        <div className="App">
          <NavBar 
          search={search}
          />
          <div className="main">
            <div className="tabs">
              <div className={`tab ${showFavourites? '': 'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
              <div className={`tab ${showFavourites? 'active-tabs' : ''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie,index)=>(
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length===0 ? <div className="no-movies">No movies to display</div> : null}
        </div>
      );
    }
}
//We created this because we can't use StoreContext.Consumer above as if we will we can't access store in componentDidMount
// class AppWrapper extends React.Component{
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store)=><App store={store}></App>}
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state){
  return {
    movies:state.movies,
    search:state.search
  }
}
const ConnectedAppComponent = connect(mapStateToProps)(App);

export default ConnectedAppComponent;
