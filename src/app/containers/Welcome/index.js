import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import CustomButton from '../../components/Button';
import {navigateToSignup} from '../../actions/navigation';
import {userAcceptedTerms} from './actions';
import commonStyles from '../../common/styles';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Linking } from 'react-native';
import { LinearGradient } from 'expo';
import {YELLOW, PURPLE} from '../../common/colors';


class WelcomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'welcome'
  };

  async continuePressed() {
    const {userAcceptedTerms, navigateToSignup} = this.props;
    await userAcceptedTerms();
    await navigateToSignup();
  }
  render() {
    return (
      <LinearGradient colors={[YELLOW,PURPLE]}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style = {commonStyles.container_home}
      >

        <View style={commonStyles.container}>

          <View style={styles.rocketWrapper}>
            <FontAwesome style={[styles.rocketIcon]}>
              {Icons.rocket}
            </FontAwesome>
          </View>
          <Text style={[commonStyles.text, styles.welcomeText]}>Welcome to</Text>
          <Text style={[commonStyles.text, styles.explorerText]}>Explorer</Text>
          <Text style={[commonStyles.text, styles.descriptionText]}>group GPS sharing</Text>
          <Text style={[commonStyles.text, styles.continueText]}>Tap {'"continue"'} to agree with our </Text>
          <Text style={[commonStyles.text, styles.termsText]} onPress={() => Linking.openURL('#')}>
Terms of Service and Privacy Policy </Text>

          <CustomButton
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
            text="Continue"
            onPress={this.continuePressed.bind(this)}
          />
        </View>
      </LinearGradient>
    );
  }
}

WelcomeScreen.propTypes = {
  account: PropTypes.object,
  userAcceptedTerms: PropTypes.func.isRequired,
  navigateToSignup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.accountData
});
const mapDispatchToProps = dispatch => bindActionCreators({
  navigateToSignup,
  userAcceptedTerms
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
