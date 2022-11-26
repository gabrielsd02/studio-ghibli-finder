import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './Home';

export default function App() {
  return (
    <div className="App">
        <ChakraProvider>
          <Home />
        </ChakraProvider>
    </div>
  );
}
