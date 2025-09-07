import { Button } from '@/shared/components/ui/button';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>shadcn/ui 테스트</Button>
      <div className="p-8">
        <h1 className="text-boost-blue label2-regular ">디자인 토큰 테스트</h1>
        <div className="bg-boost-yellow text-gray-100 p-4 rounded-xl mb-4">
          폰트 및 디자인 토큰 테스트
        </div>
      </div>
    </div>
  );
}

export default App;
