import LandingNavigation from '@/features/landing/components/LandingNavigation';
import HeroSection from '@/features/landing/components/HeroSection';
import FeatureSection from '@/features/landing/components/FeatureSection';
import LandingFooter from '@/features/landing/components/LandingFooter';
import TeamSection from '@/features/landing/components/TeamSection';
import { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
    }

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center ">
      <LandingNavigation />
      <HeroSection />
      <FeatureSection
        title="팀 프로젝트 관리의 핵심, 칸반보드 "
        subtitle="간편한 할 일 이동"
        description="프로젝트의 진행 상황을 파악해보세요"
        animationType="left"
      />
      <FeatureSection
        title="실시간 피드백"
        subtitle="팀원의 작업을 바로 확인"
        description="각자 맡은 작업에 피드백을 남기고, 빠르게 소통할 수 있어요."
        animationType="right"
      />
      <FeatureSection
        title="승인 시스템"
        subtitle="팀원에게 작업 승인 요청"
        description="완료한 작업을 팀원에게 승인받아 프로젝트 진행 상황을 명확하게 확인하세요."
        animationType="left"
      />
      <FeatureSection
        title="익명 & AI 댓글"
        subtitle="감정 충돌 없는 소통"
        description="익명 댓글과 AI 기반 댓글 변환으로 팀원 간 소통을 부드럽게 만들어줍니다."
        animationType="right"
      />
      <TeamSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
