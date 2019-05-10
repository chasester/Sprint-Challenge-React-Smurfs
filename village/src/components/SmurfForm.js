import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
    this.redirect = false;
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    this.props.submitCb(this.state);
    this.redirect = true;
    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if(this.redirect){ this.redirect = false; return (<Redirect to="/"/>) }
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
