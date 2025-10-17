import qrCode from '@/shared/assets/images/QR코드.png';
import boo from '@/shared/assets/images/boost/boo-with-message.png';

const WebpushQRPage = () => {
  return (
    <div className=" flex items-center justify-center p-4 mt-2.5">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-40 h-40">
              <img src={boo} alt="Boo 캐릭터" className=" w-full h-full" />
            </div>
          </div>
          <p className="text-gray-600 text-md">QR 코드를 스캔하여 알림을 받아보세요!</p>
        </div>
        <div className="w-[240px] m-auto bg-gray-50 rounded-lg p-4 flex flex-col items-center mb-6">
          {qrCode && <img src={qrCode} alt="QR 코드" className="p-1 " />}
        </div>
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <p className="text-xs text-gray-700 uppercase tracking-wider font-semibold">
            받을 수 있는 소식
          </p>
          <div className="space-y-2 ">
            {['⏳ 마감 하루 전의 알림', '✅ 팀원들의 승인', '🎯내가 검토해야하는 작업'].map(
              (feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  {feature}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebpushQRPage;
