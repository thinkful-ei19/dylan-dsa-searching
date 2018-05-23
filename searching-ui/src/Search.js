import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      foundValue: null,
      numOfTries: 0,
      hasFoundValue: false,
      hasSearched: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }


  linearSearch(e) {
    e.preventDefault();

    this.setState({ hasSearched: true });

    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i] === parseInt(this.state.value, 10)) {
        this.setState({
          numOfTries: i + 1,
          foundValue: this.state.value,
          hasFoundValue: true
        });
        break;
      } else {
        this.setState({
          hasFoundValue: false
        });
      }
    }
  }

  binarySearch(e, start, end, count = 0) {

    e.preventDefault();

    count++;

    if (!start) {
      start = 0;
    }

    if (!end) {
      end = this.props.sortedData.length - 1;
    }

    if (start > end) {
      this.setState({
        hasSearched: true,
        hasFoundValue: false
      });
      return -1;
    }

    let index = Math.floor((start + end) / 2);
    let item = this.props.sortedData[index];

    if (item === parseInt(this.state.value, 10)) {
      this.setState({
        numOfTries: count,
        foundValue: this.state.value,
        hasFoundValue: true
      });
    } else if (item < parseInt(this.state.value, 10)) {
      return this.binarySearch(e, index + 1, end, count);
    } else if (item > parseInt(this.state.value, 10)) {
      return this.binarySearch(e, start, index - 1, count);
    }

  }

  render() {

    let responseText = '';

    if (this.state.hasFoundValue) {
      responseText = `${this.state.foundValue} found in ${this.state.numOfTries} tries.`;
    } else if (this.state.hasSearched && !this.state.hasFoundValue) {
      responseText = 'Value not found';
    }


    return (
      <div>
        <form>
          <label htmlFor="search">Search: </label>
          <input name="search" id="search" type="number" value={this.state.value} onChange={this.handleChange} />
          <button type="submit" id="linear-search" onClick={e => this.linearSearch(e)}>Linear Search</button>
          <button type="submit" id="binary-search" onClick={e => this.binarySearch(e)}>Binary Search</button>
        </form>

        <div>
          <p>{responseText}</p>
        </div>

      </div>
    );
  }
}

export default Search;