import React, { Component } from 'react';

// import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import TimePicker from './components/TimePicker';

import { TimePicker  as AntTP} from 'antd';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimePicker
          showSecond={false}
          disabledHours={this.disabledHours}
          disabledMinutes={this.disabledMinutes}
          hideDisabledOptions
        />
        <AntTP
          format={'HH:mm'}
          hoursDisplayFunc={val => `${val % 12}a.m.`}
          disabledMinutes={this.disabledMinutes}
          hideDisabledOptions
        />
      </div>
    );
  }

  disabledHours = () => {
    return generateRange(8);
  }

  disabledMinutes = () => {
    return generateRange(60).filter( value => value % 15 !== 0);
  }
}

function generateRange(length) {
  let options = [];
  for(let i = 0; i < length; i++) {
    options.push(i);
  }

  return options;
}

export default App;
