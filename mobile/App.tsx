import { NativeBaseProvider, Center, StatusBar } from "native-base";
import { THEME } from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { AuthContextProvider } from "./src/components/AuthContext";
import { NewPoll } from "./src/screens/NewPoll";
import { FindPoll } from "./src/screens/FindPoll";
import { Polls } from "./src/screens/Polls";


export default function App() {

  const [ fontsLoaded ] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar 
          barStyle="light-content"
          backgroundColor='transparent'
          translucent
        />

        { fontsLoaded ? <SignIn /> : <Loading /> }

      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
