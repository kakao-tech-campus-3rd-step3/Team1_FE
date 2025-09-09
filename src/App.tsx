import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './router/Router';
import AppLayout from './layout/AppLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
