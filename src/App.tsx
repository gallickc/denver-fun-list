import React, { Component } from 'react';
import './App.css';
import config from './config/credentials';

declare global {
  interface Window {
    gapi: any;
  }
}


export function load(callback: any) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:T"
      })
      .then(
        (response: any) => {
          console.log(response);
          const data = response.result.values;
          const cars = data.map((car: any) => ({
            year: car[0],
            make: car[1],
            model: car[2]
          })) || [];
          callback({
            cars
          });
        },
        (response: any) => {
          callback(false, response.result.error);
        }
      );
  });
}

class App extends Component<{}, { cars: any[], error: any}> {
  constructor(props: any) {
    super(props);
    this.state = {
      cars: [],
      error: null
    }
  }
  onLoad = (data: any, error?: any) => {
    if (data) {
      const cars = data.cars;
      this.setState({ cars });
    } else {
      this.setState({ error });
    }
  };
  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
      // 3. Initialize and make the API request.
      load(this.onLoad);
    });
  };
  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }
  render() {
    const { cars, error } = this.state;
     if (error) {
        return <div>{this.state.error.message}</div>;
      }
      return (
        <ul>
          {cars.map((car: any, i: number) => (
            <li key={i}>
              {car.year} {car.make} {car.model}
            </li>
          ))}
        </ul>
      );
  }
}

export default App;
