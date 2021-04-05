import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 640,
    height: 800,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surveyContainer: {
    backgroundColor: '#aaa',
    widthType: 'percentage',
    width: '80%',
    borderRadius: 10,
    borderWidth: 5,
    padding: '10px'
  },
  responseContainer: {
    elevation: 8,
    color: '#fff',
    backgroundColor: "#bbb",
    borderRadius: 10,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: '20px',
    margin: '5px'
  },
  defaultButtonContainer: {
    color: '#fff',
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: '10px',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'black'
  },
  textContentContainer: {
    backgroundColor: '#aaa',
    widthType: 'percentage',
    width: '80%',
    margin: '10px',
    borderRadius: 10,
    borderWidth: 5,
    padding: '10px'
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  questionText: {
    fontSize: 20,
    marginBottom: '10px'
  },
  responseText: {
    fontSize: 15
  },
  contentText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default styles
