import ProjectPage from './pages/ProjectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectPage />
    </QueryClientProvider>
  );
}

export default App;
