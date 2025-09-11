import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './layout/AppLayout';
import { AppRouter } from './app/routes/Router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* //아래 컴포넌트는 API와 연동이 되어있어 주석처리 했습니다.  */}
      {/* < AppInitializer/> */}
      <AppLayout>
        <AppRouter />
      </AppLayout>
      
    </QueryClientProvider>
  );
}

export default App;
