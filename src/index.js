import React from 'react';
import {LogBox} from 'react-native';
import * as Sentry from '@sentry/react-native';
// Redux implementation
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as StoreProvider} from 'react-redux';
// Redux Store import
import {store, persistor} from './store';
import Navigation from './navigation';

const App = () => {
  React.useEffect(() => {
    Sentry.init({
      dsn: '',
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
