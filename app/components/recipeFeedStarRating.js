//Imports from React
import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';

//Component to display a rating in stars
class RecipeFeedStarRating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  //update the star count
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        starSize={20}
        starColor='gold'
        disabled={this.props.disabled}
        rating={this.props.rating}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
    );
  }
}

module.exports = RecipeFeedStarRating;
