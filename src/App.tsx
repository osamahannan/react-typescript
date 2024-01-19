import { Provider } from 'react-redux';
import Form from './components/Form';
import store from './store/configureStore';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Form />
      </Provider>
    </div>
  );
}

export default App;
