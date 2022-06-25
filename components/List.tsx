import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from '../i18n';

type Props = {
  checkTodo: (key: string) => void;
  deleteTodo: (key: string) => void;
  todo: {key: string; name: string; isChecked: boolean};
};
export default function TodoList(props: Props) {
  const {width, height} = useWindowDimensions();
  return (
    <TouchableOpacity onPress={() => props.checkTodo(props.todo.key)}>
      <View
        style={{
          ...styles.listTile,
          width: (width * 8) / 10,
          flexDirection: i18n.language == 'ar' ? 'row-reverse' : 'row',
        }}>
        <Icon
          name={
            props.todo.isChecked ? 'check-circle' : 'radio-button-unchecked'
          }
          style={{marginHorizontal: 10}}
          size={20}
          color="green"
          onPress={() => props.checkTodo(props.todo.key)}
        />
        <Text style={styles.title}>{props.todo.name}</Text>
        <Icon
          name="delete"
          style={{marginHorizontal: 10}}
          size={20}
          color="red"
          onPress={() => props.deleteTodo(props.todo.key)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listTile: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  leading: {},
  title: {
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
  trailing: {},
});
