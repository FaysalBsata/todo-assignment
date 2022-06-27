import React from 'react';
import {View, TextInput} from 'react-native';
import CustomButton from './CustomButton';
import {Languages} from '../types/languages';
import styles from '../constants/styles/AppStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
type Props = {
  title: string;
  setTitle: (arg0: string) => void;
  addTodo: () => void;
};
const Input = (props: Props) => {
  const {t, i18n} = useTranslation();
  return (
    <View
      style={{
        ...styles.todo,
        flexDirection: i18n.language == Languages.ar ? 'row-reverse' : 'row',
      }}>
      <TextInput
        placeholder={t('add_holder')}
        placeholderTextColor={'silver'}
        value={props.title}
        onChangeText={(value: string) => props.setTitle(value)}
        style={{
          ...styles.textbox,
          textAlign: i18n.language == Languages.ar ? 'right' : 'left',
        }}
      />
      <CustomButton
        title={t('add_btn')}
        onPress={() => props.addTodo()}
        textStyle={{color: 'green'}}
        buttonStyle={{
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        leftComponent={<Icon name="add" size={27} color="green" />}
      />
    </View>
  );
};
export default Input;
