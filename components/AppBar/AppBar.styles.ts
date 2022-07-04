import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Languages} from '../../types/languages';
const BUTTON_SIZE = 40;
const createStyleSheet = props => {
  const {lang} = props;
  return StyleSheet.create({
    appBar: {
      color: 'white',
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      paddingHorizontal: 24,
      flexDirection: lang == Languages.ar ? 'row-reverse' : 'row',
    },
    heading: {
      color: 'white',
      flex: 1,
      fontSize: 24,
      fontWeight: '400',
    },
    customButtonText: {
      color: 'white',
      fontSize: 18,
    },
    seperator: {
      height: 40,
      width: 40,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    customButtonContainer: {
      height: 40,
      width: 40,
    },
  });
};

export default createStyleSheet;
