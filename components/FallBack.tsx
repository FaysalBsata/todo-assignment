import React from 'react';
import {Text} from 'react-native';
type Props = {
  text: string;
};
export default function FallBack(props: Props) {
  return (
    <Text
      style={{
        color: 'gold',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 30,
      }}>
      {props.text}
    </Text>
  );
}
