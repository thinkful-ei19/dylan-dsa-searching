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

        <div>
          <p>Find a book thought process: </p>
          <pre>
            <code>
              {
                `const library = [{ author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
                { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
                { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
                { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
                { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
                { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
                { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
                { author:'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
                { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane's Fighting Ships' },
                { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }];`
              }
            </code>
          </pre>
          <p>Given the above data set, how would I implement a searching algorithm on the dewey codes?</p>
          <ol>
            <li>Split the dewey decimal of each book into two parts: before and after the decimal.</li>
            <li>Run a binary search on the before part of the decimal and return a match.</li>
            <li>If a match is found, run a binary search on the after part of the decimal and return a match.</li>
            <li>If no match is found during either of the searches, return null.</li>
            <li>If a match is found in both searches, combine the results at the decimal and return the complete dewey.</li>
          </ol>
        </div>

      </div>
    );
  }
}

export default Search;