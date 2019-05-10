import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount()
  {
    axios.get('http://localhost:3333/smurfs')
    .then((res)=> this.setState({smurfs: res.data}))
    .catch(err=> console.log(err));
  }

  addSmurf(obj)
  {
    axios.post(`http://localhost:3333/smurfs`, obj)
    .then((res)=> this.setState({smurfs: res.data}))
    .catch(err=> console.log(err));
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/form" exact render={(props) => <SmurfForm {...props} submitCb={(obj) => this.addSmurf(obj)}/>}/>
          <Route path="/" exact render={(props) => <Smurfs {...props} smurfs={this.state.smurfs} />}/>
          <Route path="/smurfs/:id" exact render={(props) =>
          {
            try{
            var smurf = this.state.smurfs[props.match.params.id]
            smurf.name;
            }catch(err) {return <Redirect to="/"/>}
          return(<Smurf {...props}
              name={smurf.name}
              id={smurf.id}
              age={smurf.age}
              height={smurf.height}
              key={smurf.id} 
            />);
          }
          }/>
        </div>
      </Router>
    );
  }
}

export default App;
