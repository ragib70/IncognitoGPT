import React, { Component } from 'react';
import ConnectButton from './ConnectButton';
import axios from 'axios';
import ContractInteraction from './ContractInteraction';

class ChatRoom extends Component {
  state = {
    text: '',
    messages: []
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      id: this.state.messages.length,
      text: this.state.text,
      sender: 'user'
    }

    this.setState(state => ({
      messages: state.messages.concat(message),
      text: ''
    }));

    axios.post('https://avid-infinity-386618.el.r.appspot.com/api', { userPrompt: this.state.text }) // replace with your API endpoint
      .then(response => {
        // log the privatePrompt to the console
        console.log("\n")
        console.log(response.data.privatePrompt)
        console.log("\n")
        

        const botMessage = {
          id: this.state.messages.length + 1,
          text: response.data.response, // modify this based on your API response structure
          sender: 'bot'
        }
        this.setState(state => ({
          messages: state.messages.concat(botMessage)
        }));
      })
      .catch(error => {
        console.error("Error:", error);
        const botMessage = {
          id: this.state.messages.length + 1,
          text: "Hurray! Internal Server Error!",
          sender: 'bot'
        }
        this.setState(state => ({
          messages: state.messages.concat(botMessage)
        }));
      });
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <h1>IncognitoGPT</h1>
          <ConnectButton/>
          <p>Incognito GPT, a next-generation AI solution designed with privacy at its core. Our system is built to ensure that users can freely interact with AI without the fear of revealing sensitive information. It incorporates advanced mechanisms to detect and mask confidential data, providing a safe and secure environment for AI conversations.</p>
        </div>
        <div className="chat-room-container">
          <div className="chat-room">
            {this.state.messages.map(message => (
              <div className={`message ${message.sender}`} key={message.id}>
                <div>{message.text}</div>
              </div>
            ))}
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
          <form className="input-form" onSubmit={this.handleSubmit}>
            <input
              className="input-field"
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="Type your message here"
            />
            <input className="submit-button" type="submit" value="Send" />
            <ContractInteraction className="submit-button" type="submit" value="Send"/>  
          </form>
        </div>
      </div>
    );
  }
  
  
}

export default ChatRoom;
