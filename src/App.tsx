import React, { Component } from 'react';
import './App.css';
// import config from './config/credentials';

async function getHelloMsg(name: string): Promise<string> {
  const url = `/.netlify/functions/hello?name=${name}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.message;
  } catch (err) {
      console.log(err);
  }
  return 'Hey - sorry we failed to get a good message :(';
}

declare global {
  interface Window {
    gapi: any;
  }
}

// export function load(callback: any) {
//   window.gapi.client.load("sheets", "v4", () => {
//     window.gapi.client.sheets.spreadsheets.values
//       .get({
//         spreadsheetId: config.spreadsheetId,
//         range: "Sheet1!A2:T"
//       })
//       .then(
//         (response: any) => {
//           console.log(response);
//           const data = response.result.values;
//           const cars = data.map((car: any) => ({
//             year: car[0],
//             make: car[1],
//             model: car[2]
//           })) || [];
//           callback({
//             cars
//           });
//         },
//         (response: any) => {
//           callback(false, response.result.error);
//         }
//       );
//   });
// }

class App extends Component<{}, { cars: any[], error: any, helloMsg: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      cars: [],
      error: null,
      helloMsg: 'Hey There'
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
  // initClient = () => {
  //   // 2. Initialize the JavaScript client library.
  //   window.gapi.client
  //     .init({
  //       apiKey: config.apiKey,
  //       // Your API key will be automatically added to the Discovery Document URLs.
  //       discoveryDocs: config.discoveryDocs
  //     })
  //     .then(() => {
  //     // 3. Initialize and make the API request.
  //     load(this.onLoad);
  //   });
  // };

  public async getHelloMessage() {
    const msg = await getHelloMsg('Goodbye March Madness');
    this.setState({helloMsg: msg});
  }

  componentDidMount() {
    // 1. Load the JavaScript client library.
    // window.gapi.load("client", this.initClient;
    this.getHelloMessage();
  }
  render() {
    const { cars, error } = this.state;
     if (error) {
        return <div>{this.state.error.message}</div>;
      }
      return (
        <div>
          <p>
            {this.state.helloMsg}
          </p>
        <ul>
          {cars.map((car: any, i: number) => (
            <li key={i}>
              {car.year} {car.make} {car.model}
            </li>
          ))}
        </ul>
        </div>
      );
  }
}

export default App;
