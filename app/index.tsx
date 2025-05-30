import MainStack from '../pages/MainStack'; // ou de onde estiver seu App principal
import UserContextProvider from '../src/contexts/UserContext'; // ajuste o caminho se necessário

export default function App() {
  return (
    <UserContextProvider>
      <MainStack />
    </UserContextProvider>
  );
}
