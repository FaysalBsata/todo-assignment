import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import CustomButton from '../CustomButton';
import createStyleSheet from './AppBar.styles';
type Props = {
  title: String;
  onLangChange: () => void;
};
export default function AppBar(props: Props) {
  const {t, i18n} = useTranslation();
  const styles = createStyleSheet({lang: i18n.language});
  return (
    <View
      style={{
        ...styles.appBar,
      }}>
      <View style={styles.seperator} />
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{props.title}</Text>
      </View>
      <CustomButton
        title={t('lang')}
        onPress={props.onLangChange}
        buttonStyle={styles.customButtonContainer}
        textStyle={styles.customButtonText}
      />
    </View>
  );
}
