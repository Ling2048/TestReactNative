import React from 'react';
import { AccessibilityInfo, Text, View } from 'react-native';

export default class ScreenReaderStatusExample extends React.Component {
    state = {
      screenReaderEnabled: false,
    }
  
    componentDidMount() {
      AccessibilityInfo.addEventListener(
        'change',
        this._handleScreenReaderToggled
      );
      AccessibilityInfo.fetch().done((isEnabled) => {
        this.setState({
          screenReaderEnabled: isEnabled
        });
      });
    }
  
    componentWillUnmount() {
      AccessibilityInfo.removeEventListener(
        'change',
        this._handleScreenReaderToggled
      );
    }
  
    _handleScreenReaderToggled = (isEnabled) => {
      this.setState({
        screenReaderEnabled: isEnabled,
      });
    }
  
    render() {
      return (
        <View>
          <Text>
            The screen reader is {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
          </Text>
        </View>
      );
    }
}