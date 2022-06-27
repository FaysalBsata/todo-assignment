import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AppBar from './components/AppBar';
import TodoList from './components/List';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import useAsyncStorage from './hooks/useAsyncStorage';
import styles from './constants/styles/AppStyle';
import CustomButton from './components/CustomButton';
import {Languages} from './types/languages';
type Todo = {
  key: string;
  name: string;
  isChecked: boolean;
};
const App = () => {
  const [age, setAge] = useAsyncStorage('todo', 29);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [title, setTitle] = useState('');
  const {t, i18n} = useTranslation();
  const [todos, setTodos] = useAsyncStorage('todos', []);
  // const [todos, setTodos] = useState<Array<Todo>>([]);
  // const [todosss, setTodosss] = useAsyncStorage('todosss', []);
  // useEffect(() => {
  //   const retrieveList = async () => {
  //     let list = await AsyncStorage.getItem('todos');
  //     if (list) {
  //       const content = JSON.parse(list);
  //       setTodos(content?.list);
  //     }
  //   };
  //   retrieveList();
  // }, []);
  // useEffect(() => {
  //   let changeDetect = async () => {
  //     let todosSave = JSON.stringify({list: [...todos]});
  //     await AsyncStorage.setItem('todos', todosSave);
  //   };
  //   changeDetect();
  // }, [todos]);
  const addTodo = () => {
    if (title.length > 0) {
      setTodos([
        ...todos,
        {key: Date.now().toString(), name: title, isChecked: false},
      ]);
      setTitle('');
    }
  };

  const checkTodo = (id: string) => {
    setTodos(
      todos.map((todo: {key: string; isChecked: boolean}) => {
        if (todo.key === id) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      }),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(
      todos.filter((todo: {key: string}) => {
        return todo.key !== id.toString();
      }),
    );
  };

  return (
    <ImageBackground source={require('./assets/bg.jpeg')} style={{flex: 1}}>
      <View style={styles.container}>
        <AppBar
          title={t('header')}
          onLangChange={() => {
            i18n.changeLanguage(
              i18n.language == Languages.ar ? Languages.en : Languages.ar,
            );
          }}
        />
        <View
          style={{
            ...styles.todo,
            flexDirection:
              i18n.language == Languages.ar ? 'row-reverse' : 'row',
          }}>
          <TextInput
            placeholder={t('add_holder')}
            placeholderTextColor={'silver'}
            value={title}
            onChangeText={value => setTitle(value)}
            style={{
              ...styles.textbox,
              textAlign: i18n.language == Languages.ar ? 'right' : 'left',
            }}
          />
          <CustomButton
            title={t('add_btn')}
            onPress={() => addTodo()}
            textStyle={{color: 'green'}}
            buttonStyle={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            leftComponent={<Icon name="add" size={27} color="green" />}
          />
        </View>

        <ScrollView>
          {todos.map((todo: Todo, index: number) => (
            <TodoList
              key={`Todo-${todo.key}`}
              todo={todo}
              checkTodo={checkTodo}
              deleteTodo={deleteTodo}
            />
          ))}
          {todos.length <= 0 && (
            <Text
              style={{
                color: 'gold',
                fontWeight: 'bold',
                fontSize: 22,
                textAlign: 'center',
                marginTop: 30,
              }}>
              {t('no_todos')}
            </Text>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default App;
