import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

class Switch extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
    disabled: PropTypes.bool,
    activeText: PropTypes.string,
    inActiveText: PropTypes.string,
    backgroundActive: PropTypes.string,
    backgroundInactive: PropTypes.string,
    value: PropTypes.bool,
    circleActiveColor: PropTypes.string,
    circleInActiveColor: PropTypes.string,
    circleSize: PropTypes.number,
    circleBorderActiveColor: PropTypes.string,
    circleBorderInactiveColor: PropTypes.string,
    activeTextStyle: PropTypes.object,
    inactiveTextStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    barHeight: PropTypes.number,
    circleBorderWidth: PropTypes.number,
    innerCircleStyle: PropTypes.object,
    renderInsideCircle: PropTypes.func,
    changeValueImmediately: PropTypes.bool,
    outerCircleStyle: PropTypes.object,
    renderActiveText: PropTypes.bool,
    renderInActiveText: PropTypes.bool,
    switchLeftPx: PropTypes.number,
    switchRightPx: PropTypes.number,
    switchWidthMultiplier: PropTypes.number
  };

  static defaultProps = {
    value: false,
    onValueChange: () => null,
    renderInsideCircle: () => null,
    disabled: false,
    activeText: 123,
    inActiveText: 'Off',
    backgroundActive: 'green',
    backgroundInactive: 'gray',
    circleActiveColor: 'white',
    circleInActiveColor: 'white',
    circleBorderActiveColor: 'rgb(100, 100, 100)',
    circleBorderInactiveColor: 'rgb(80, 80, 80)',
    circleSize: 30,
    barHeight: null,
    circleBorderWidth: 1,
    changeValueImmediately: true,
    innerCircleStyle: { alignItems: 'center', justifyContent: 'center' },
    outerCircleStyle: {},
    renderActiveText: true,
    renderInActiveText: true,
    switchLeftPx: 2,
    switchRightPx: 2,
    switchWidthMultiplier: 2
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value,
      transformSwitch: new Animated.Value(
        props.value
          ? props.circleSize / props.switchLeftPx
          : -props.circleSize / props.switchRightPx
      ),
      backgroundColor: new Animated.Value(props.value ? 75 : -75),
      circleColor: new Animated.Value(props.value ? 75 : -75),
      circleBorderColor: new Animated.Value(props.value ? 75 : -75)
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value === this.props.value) {
      return;
    }
    if (prevProps.disabled) {
      return;
    }

    this.animateSwitch(value, () => this.setState({ value }));
  }

  handleSwitch = () => {
    const { value } = this.state;
    const {
      onValueChange,
      disabled,
      changeValueImmediately,
      value: propValue
    } = this.props;
    if (disabled) {
      return;
    }

    if (changeValueImmediately) {
      this.animateSwitch(!propValue);
      onValueChange(!propValue);
    } else {
      this.animateSwitch(!value, () =>
        this.setState({ value: !value }, () => onValueChange(this.state.value))
      );
    }
  };

  animateSwitch = (value, cb = () => {}) => {
    Animated.parallel([
      Animated.spring(this.state.transformSwitch, {
        toValue: value
          ? this.props.circleSize / this.props.switchLeftPx
          : -this.props.circleSize / this.props.switchRightPx
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200
      }),
      Animated.timing(this.state.circleColor, {
        toValue: value ? 75 : -75,
        duration: 200
      }),
      Animated.timing(this.state.circleBorderColor, {
        toValue: value ? 75 : -75,
        duration: 200
      })
    ]).start(cb);
  };

  render() {
    const {
      transformSwitch,
      backgroundColor,
      circleColor,
      circleBorderColor
    } = this.state;

    const {
      backgroundActive,
      backgroundInactive,
      circleActiveColor,
      circleInActiveColor,
      activeText,
      inActiveText,
      circleSize,
      containerStyle,
      activeTextStyle,
      inactiveTextStyle,
      barHeight,
      circleInactiveBorderColor,
      circleActiveBorderColor,
      circleBorderWidth,
      innerCircleStyle,
      outerCircleStyle,
      renderActiveText,
      renderInActiveText,
      renderInsideCircle,
      switchWidthMultiplier,
      value
    } = this.props;

    const interpolatedColorAnimation = backgroundColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [backgroundInactive, backgroundActive]
    });

    const interpolatedCircleColor = circleColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInActiveColor, circleActiveColor]
    });

    const interpolatedCircleBorderColor = circleBorderColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInactiveBorderColor, circleActiveBorderColor]
    });

    return (
      <TouchableWithoutFeedback onPress={this.handleSwitch}>
        <Animated.View
          style={[
            styles.container,
            containerStyle,
            {
              backgroundColor: interpolatedColorAnimation,
              width: circleSize * switchWidthMultiplier,
              height: barHeight || circleSize,
              borderRadius: circleSize
            }
          ]}
        >
          <Animated.View
            style={[]}
          >
            {value && renderActiveText && (
              <Text style={[styles.text, styles.paddingRight, activeTextStyle]}>
                {activeText}
              </Text>
            )}
            {!value && renderInActiveText && (
              <Text
                style={[styles.text, styles.paddingLeft, inactiveTextStyle]}
              >
                {inActiveText}
              </Text>
            )}
          </Animated.View>

          <Animated.View
            style={[
              styles.animatedContainer,
              {
                left: transformSwitch,
                width: circleSize * switchWidthMultiplier
              },
              outerCircleStyle
            ]}
          >
            <Animated.View
              style={[
                styles.circle,
                {
                  borderWidth: circleBorderWidth,
                  borderColor: interpolatedCircleBorderColor,
                  backgroundColor: interpolatedCircleColor,
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize / 2
                },
                innerCircleStyle
              ]}
            >
              {renderInsideCircle()}
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 71,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'black',
    position: 'relative'
  },
  animatedContainer: {
    flex: 1,
    width: 78,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginLeft: 55
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white'
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  paddingRight: {
    paddingLeft: 35,
    paddingTop: 16
  },
  paddingLeft: {
    paddingLeft: 56,
    paddingTop: 16
  }
});
export default Switch;
