import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
type Props = {
  title: String;
  onLangChange: () => void;
};
export default function AppBar(props: Props) {
  const {t, i18n} = useTranslation();
  return (
    <View
      style={{
        ...styles.appBar,
        flexDirection: i18n.language == 'ar' ? 'row-reverse' : 'row',
      }}>
      <View style={{height: 40, width: 40}} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.heading}>{props.title}</Text>
      </View>
      <TouchableOpacity
        style={{height: 40, width: 40}}
        onPress={props.onLangChange}>
        <Text style={{color: 'white', fontSize: 18}}>{t('lang')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    color: 'white',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  heading: {
    color: 'white',

    flex: 1,
    fontSize: 24,
    fontWeight: '400',
  },
});
