/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';

import Navigation from './src/navigation/Navigation';
import { persistor, store } from './src/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};


export default App;
