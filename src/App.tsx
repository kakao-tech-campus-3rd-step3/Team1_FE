import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from '@/app/routes/Router';
import ServerErrorPage from '@/pages/ServerErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import ModalRenderer from '@/shared/components/ui/modal/ModalRenderer';
import { Toaster } from 'react-hot-toast';
import AppInitializer from '@/app/AppInitializer';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary fallback={<ServerErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <ModalRenderer />
          <AppRouter />
          <Toaster position="top-right" reverseOrder={false} />
        </AppInitializer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
