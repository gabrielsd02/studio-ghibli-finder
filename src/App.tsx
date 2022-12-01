import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import AxiosConfig from './AxiosConfig';
import Home from './Home';

export default function App() {
  return (
    <div className="App">
        <ChakraProvider>
          <AxiosConfig />
          <Home />
        </ChakraProvider>
    </div>
  );
}
