import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query'
import AxiosConfig from './AxiosConfig';
import Routes from './routes';

export default function App() {

  const queryClient = new QueryClient();

  return (
    <div className="App">
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
              <AxiosConfig />
              <Routes />
            </QueryClientProvider>
        </ChakraProvider>
    </div>
  );
}
