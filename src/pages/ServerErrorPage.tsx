import { Card, CardContent } from '@/shared/components/shadcn/card';
import { Button } from '@/shared/components/shadcn/button';
import { Home, RefreshCw } from 'lucide-react';

const ServerErrorPage = () => {
  const handleGoHome = () => {
    // 실제 구현에서는 router.push('/') 또는 navigate('/') 사용
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="space-y-6">
            {/* Error Code */}
            <div className="text-6xl font-bold text-red-500">500</div>

            {/* Error Title */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">서버 오류</h1>
              <p className="text-gray-600">
                죄송합니다. 서버에서 문제가 발생했습니다.
                <br />
                잠시 후 다시 시도해 주세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleGoHome} className="flex items-center gap-2">
                <Home size={16} />
                홈으로 돌아가기
              </Button>

              <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
                <RefreshCw size={16} />
                새로고침
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerErrorPage;
