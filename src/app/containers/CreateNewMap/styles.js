import {StyleSheet} from 'react-native';
import {WHITE} from '../../common/colors';

const styles = StyleSheet.create({
  rocketWrapper: {
    marginTop: 30,
    borderColor: WHITE,
    padding: 20
  },
  rocketIcon: {
    fontSize: 78,
    color: WHITE
  },
  welcomeText: {
    fontSize: 48,
    marginTop: 45,
    color: WHITE
  },
  explorerText: {
    fontSize: 22,
    marginTop: 1,
    color: WHITE,
    padding: 38,
    paddingBottom: 0,
    textAlign: 'center',

  },
  descriptionText: {
    fontSize: 22,
    marginTop: 10,
    color: WHITE,
    padding: 38,
    paddingTop:10,
    textAlign: 'center',
  },
  continueText: {
    fontSize: 14,
    marginTop: 95,
    color: WHITE
  },
  termsText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    marginTop: 5,
    color: WHITE
  },
  continueButton: {
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: 4,
    padding: 18,
    marginTop: 30,
  },
  continueButtonText: {
    fontSize: 20,
    color: WHITE
  }
});
export default styles;
