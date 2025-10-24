import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from '@/app/routes/Router';
import ServerErrorPage from '@/pages/ServerErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import ModalRenderer from '@/shared/components/ui/modal/ModalRenderer';
import { Toaster } from 'react-hot-toast';
import AppInitializer from '@/app/AppInitializer';

const queryClient = new QueryClient();
// 아래는 에러바운더리 테스트용 코드입니다.
// const BuggyComponent = () => {
//   throw new Error('😱 일부러 발생시킨 에러!');
//   return <div>안보일거야</div>;
// };

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
