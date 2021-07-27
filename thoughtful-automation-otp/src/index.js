import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const https = require('https')

class MyForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
                    email: '',
                password: '',
                inputPass: '',
            generated: false};
    }

    myChangeHandler = (event) => {
        this.setState({email: event.target.value, password: uuidv4()});
      }

    mySubmitHandler = (event) => {
        event.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)   
    const  options = {
    hostname: 'b180j0gpod.execute-api.us-east-2.amazonaws.com',
    path: '/default/thoughtful-automation-lambda ',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
    }
    const req = https.request(options, res => {
        let err = JSON.stringify(res)
        console.log(`statusCode: ${err}`)
        this.state.generated = true;
        res.on('data', (d) => {
  
          });
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.write(data);
req.end();  
    }

    myPassChangeHandler = (event) => {
        this.setState({inputPass: event.target.value});
      }

    passwordHandler = (event) => {
        if (this.state.generated && this.state.password === this.state.inputPass) {
            alert("Passowrd is correct")
        } else {
            alert("Password is incorrect")
        }
    }


    render() {
      return (
        <div>
        <form onSubmit={this.mySubmitHandler}>
        <h1>Hello</h1>
        <p>Enter your email:</p>
        <input
          type='text'
          onChange={this.myChangeHandler}
        />
        <input type="submit" value="Submit" />
        </form>

        <form onSubmit={this.passwordHandler}>
        <p>Verify Password</p>
         <input
          type='text'
          onChange={this.myPassChangeHandler}
        />
           <input type="submit" value="Submit" />
        </form>
        </div>

      );
    }
  }
  
  ReactDOM.render(<MyForm />, document.getElementById('root'));