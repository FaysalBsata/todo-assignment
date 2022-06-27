import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AppBar from './components/AppBar';
import TodoList from './components/List';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import useLocalStorage from './hooks/useLocalStorage';
type Todo = {
  key: string;
  name: string;
  isChecked: boolean;
};
const App = () => {
  const [age, setAge] = useLocalStorage('todo', {
    key: '31242343242',
    name: 'title',
    isChecked: false,
  });
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [title, setTitle] = useState('');
  const {t, i18n} = useTranslation();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  useEffect(() => {
    const retrieveList = async () => {
      let list = await AsyncStorage.getItem('todos');
      if (list) {
        const content = JSON.parse(list);
        setTodos(content?.list);
      }
    };
    retrieveList();
  }, []);
  useEffect(() => {
    let changeDetect = async () => {
      let todosSave = JSON.stringify({list: [...todos]});
      await AsyncStorage.setItem('todos', todosSave);
    };
    changeDetect();
  }, [todos]);
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
      todos.map(todo => {
        if (todo.key === id) {
          todo.isChecked = !todo.isChecked;
          let todosSave = JSON.stringify({list: [...todos]});
        }
        return todo;
      }),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(
      todos.filter(todo => {
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
            i18n.changeLanguage(i18n.language == 'ar' ? 'en' : 'ar');
          }}
        />
        <View
          style={{
            ...styles.todo,
            flexDirection: i18n.language == 'ar' ? 'row-reverse' : 'row',
          }}>
          <TextInput
            placeholder={t('add_holder')}
            placeholderTextColor={'silver'}
            value={title}
            onChangeText={value => setTitle(value)}
            style={{
              ...styles.textbox,
              textAlign: i18n.language == 'ar' ? 'right' : 'left',
            }}
          />
          <TouchableOpacity
            onPress={() => addTodo()}
            style={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="add" size={27} color="green" />
            <Text style={{color: 'green'}}>{t('add_btn')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {todos.map((todo, index) => (
            <View key={`item-${todo.key}`}>
              <TodoList
                key={`Todo-${todo.key}`}
                todo={todo}
                checkTodo={checkTodo}
                deleteTodo={deleteTodo}
              />
              <View
                style={{height: 1, width: '100%', backgroundColor: 'green'}}
                key={`Sep-${todo.key}`}
              />
            </View>
          ))}
          {todos.length <= 0 && (
            <Text
              onPress={async () => {
                let togo = await AsyncStorage.getItem('todo');
                if (togo) {
                  let toLog = JSON.parse(togo);
                  console.log('exists', toLog);
                } else {
                  console.log('doesnt');
                }
              }}
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

const styles = StyleSheet.create({
  statusBar: {
    color: '#fff',
    width: '100%',
    height: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbox: {
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: '80%',
  },
});
export default App;
