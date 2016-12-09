import React, { PropTypes } from 'react';
import Select from './Select';

const formatOption = (option, disabledOptions, displayFunc) => {
  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value: option,
    disabled,
    display: displayFunc(option),
  };
};

const militaryToStandard = (hour) => {
  const number =  hour % 12 ? hour % 12 : 12;
  const suffix = hour < 12 ? 'am' : 'pm';
  return `${number} ${suffix}`;
}

const militaryHourDisplay = (value) => {
  value < 10 ? `0${value}` : `${value}`;
}

const identity = (value) => {
  return value
}

const Combobox = React.createClass({
  propTypes: {
    format: PropTypes.string,
    defaultOpenValue: PropTypes.object,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onCurrentSelectPanelChange: PropTypes.func,
    military: PropTypes.bool,
    hoursDisplayFunc: PropTypes.func,
    minutesDisplayFunc: PropTypes.func,
    secondsDisplayFunc: PropTypes.func,
  },

  onItemChange(type, itemValue) {
    const { onChange, defaultOpenValue } = this.props;
    const value = (this.props.value || defaultOpenValue).clone();
    if (type === 'hour') {
      value.hour(itemValue);
    } else if (type === 'minute') {
      value.minute(itemValue);
    } else {
      value.second(itemValue);
    }
    onChange(value);
  },

  onEnterSelectPanel(range) {
    this.props.onCurrentSelectPanelChange(range);
  },

  getHourSelect(hour) {
    const { prefixCls, hourOptions, disabledHours, showHour, military, hoursDisplayFunc } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();
    const displayFunc = hoursDisplayFunc || ( !military ? militaryToStandard : identity )

    return (
      <Select
        prefixCls={prefixCls}
        options={hourOptions.map(option => formatOption(option, disabledOptions, displayFunc))}
        selectedIndex={hourOptions.indexOf(hour)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
      />
    );
  },

  getMinuteSelect(minute) {
    const { prefixCls, minuteOptions, disabledMinutes, defaultOpenValue, showMinute, minutesDisplayFunc } = this.props;
    if (!showMinute) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledMinutes(value.hour());
    const displayFunc = minutesDisplayFunc || identity;

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions, displayFunc))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
      />
    );
  },

  getSecondSelect(second) {
    const { prefixCls, secondOptions, disabledSeconds, showSecond, defaultOpenValue, secondsDisplayFunc } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledSeconds(value.hour(), value.minute());
    const displayFunc = secondsDisplayFunc || identity;

    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option, disabledOptions, displayFunc))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
      />
    );
  },

  render() {
    const { prefixCls, defaultOpenValue } = this.props;
    const value = this.props.value || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.hour())}
        {this.getMinuteSelect(value.minute())}
        {this.getSecondSelect(value.second())}
      </div>
    );
  },
});

export default Combobox;
