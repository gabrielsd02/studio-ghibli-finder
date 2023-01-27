import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import AxiosConfig from './AxiosConfig';
import Routes from './routes';

export default function App() {
  return (
    <div className="App">
        <ChakraProvider>
            <AxiosConfig />
            <Routes />
        </ChakraProvider>
    </div>
  );
}
