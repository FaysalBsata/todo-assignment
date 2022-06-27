import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
type Props = {
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  title: String;
  onPress: () => void;
  textStyle?: object;
  buttonStyle?: ViewStyle;
};
export default function CustomButton(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.buttonStyle}>
      {props.leftComponent}
      <Text style={props.textStyle}>{props.title}</Text>
      {props.rightComponent}
    </TouchableOpacity>
  );
}
