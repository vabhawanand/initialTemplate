import React from 'react';
import {LogBox} from 'react-native';
import * as Sentry from '@sentry/react-native';
// Redux implementation
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as StoreProvider} from 'react-redux';
// Redux Store import
import {store, persistor} from './store';
import Navigation from './navigation';
import {DarkModeProvider, useDarkModeContext} from 'react-native-dark-mode';

const App = () => {
  React.useEffect(() => {
    Sentry.init({
      dsn: '',
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <DarkModeProvider mode={useDarkModeContext()}>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </StoreProvider>
    </DarkModeProvider>
  );
};

export default App;
