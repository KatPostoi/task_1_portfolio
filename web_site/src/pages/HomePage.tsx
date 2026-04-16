import { MainWrapper } from '../components/common/MainWrapper';
import { InformationAboutMe } from '../components/common/InformationAboutMe';
import { EducationWrapper } from '../components/common/EducationWrapper';
import { SkillsWrapper } from '../components/common/SkillsWrapper';
import { CultureOfWork } from '../components/common/CultureOfWork';
import { WorkWrapper } from '../components/common/WorkWrapper';
import { Footer } from '../components/common/Footer';
import { ScrollToTopButton } from '../components/common/ScrollToTopButton';

export const HomePage = () => {
  return (
    <div className="HomePage roboto">
      <MainWrapper>
        <InformationAboutMe />
        <EducationWrapper />
        <SkillsWrapper />
        <CultureOfWork />
        <WorkWrapper />
        <Footer />
      </MainWrapper>
      <ScrollToTopButton />
    </div>
  );
};
