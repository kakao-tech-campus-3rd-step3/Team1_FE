import { Button } from '@/shared/components/shadcn/button';

const LandingFooter = () => {
  return (
    <div className="mt-24 bg-gray-900 text-white w-screen py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">궁금한 점이 있으신가요?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              BOOST에 대해 더 자세히 알고 싶거나 도움이 필요하시면 연락 주셔도 되는데 아직 연락을
              받진 못해요.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-boost-blue rounded-lg flex items-center justify-center">
                  <span className="text-white">📧</span>
                </div>
                <div>
                  <div className="font-medium">이메일</div>
                  <div className="text-gray-300">contact@boost.co.kr</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">💬</span>
                </div>
                <div>
                  <div className="font-medium">카카오톡 채널</div>
                  <div className="text-gray-300">@boost</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-transparent text-white"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-transparent text-white"
                  placeholder="hong@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">메시지</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg  focus:border-transparent text-white"
                  placeholder="문의사항을 입력해주세요.. 입력해주셔도 아직 저희가 문의 사항을 받지는 못해요.."
                />
              </div>

              <Button className="w-full h-13">메시지 보내기</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
