import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './app/modules/redux';
import { RootStack } from './app/screens';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <RootStack/>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
export default App;