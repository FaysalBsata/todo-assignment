import {StyleSheet} from 'react-native';
const Styles = StyleSheet.create({
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
export default Styles;
