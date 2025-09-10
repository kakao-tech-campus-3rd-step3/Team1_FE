import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './router/Router';
// import AppInitializer from './app/AppInitializer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* //아래 컴포넌트는 API와 연동이 되어있어 주석처리 했습니다.  */}
      {/* < AppInitializer/> */}
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
