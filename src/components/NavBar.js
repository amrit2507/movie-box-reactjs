import React from "react";
// import {connect} from "react-redux"
import {addMovieToList,handleMovieSearch}from '../actions/index';
import { connect } from "react-redux";
// import { StoreContext } from "../index";
// import { connect } from "../index";

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      searchText: ''
    }
  }

  handleChange=(e)=>{
    // console.log(e.target.value);
    this.setState({
      searchText: e.target.value
    })
  }
  handleSearch=()=>{
    const {searchText}=this.state;
    //api call --> this will be an action
    this.props.dispatch(handleMovieSearch(searchText));

  }

  handleAddMovie= (movie)=>{
    console.log('movie',movie);
    this.props.dispatch(addMovieToList(movie));
  }

  render() {
    const {result,showSearchResults}=this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange}/>
          <button id="search-btn" onClick={this.handleSearch}>Search</button>
          
          {showSearchResults && 
            <div className="search-results">
            <div className="search-result">
              <img src={result.Poster} alt="search-pic" />
              <div className="movie-info">
                <span>{result.Title}</span>
                <button onClick={()=> this.handleAddMovie(result)}>
                  Add to Movies
                </button>
              </div>
            </div>
          </div>
          }

        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component{
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store)=><Navbar dispatch={store.dispatch} search={this.props.search}></Navbar>}
//       </StoreContext.Consumer>
//     )
//   }
// }
// export default NavbarWrapper;

function mapStateToProps({search})
{
    return {
        search
    }
}

const ConnectedAppComponent = connect(mapStateToProps)(Navbar);

export default ConnectedAppComponent;