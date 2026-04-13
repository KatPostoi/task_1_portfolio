// import { Menu } from '../components/common/Menu';
// import { Footer } from '../components/common/Footer';
import { MainWrapper } from '../components/common/MainWrapper';
import './home-style.css';
import '../assets/styles/root.css';
import ProfilePicture from '../../src/assets/images/profile_picture.png';

export const HomePage = () => {
  return (
    <div className="HomePage roboto">
      {/* <Menu /> */}
      <MainWrapper>
        <div className="information-about-me">
          <h2 className="text-cell text-block__xl">
            <span className="title-part1">
              Екатерина <br />
              Постой – <br />
              UX/UI Designer &nbsp;
            </span>
            <span className="title-part2 text-color-purple">
              with <br />
              an artistic background
            </span>
          </h2>
          <div className="text-cell img-cell">
            <img src={ProfilePicture} alt="Profile_picture" />
          </div>
          <h2 className="text-cell text-block__l">
            Разрабатываю лендинги, корпоративные <br />
            сайты, а также айдентику
          </h2>
          <h2 className="text-cell text-block__s">Telegram @Kat_postoi</h2>
          <h2 className="text-cell text-block__s">Behance @Ekaterina_Postoi</h2>
          <h2 className="text-cell text-block__s">katpostoy@gmail.com</h2>
          <h2 className="text-cell text-block__s">2018-2026</h2>
        </div>

        <div className="education-wrapper">
          <h2 className="text-block__xl text-color-dark-blue">Образование</h2>
          <div className="education-steps">
            <div className="education-steps-card">
              <h2 className="text-block__xl text-color-dark-blue">Step 1</h2>
              <h2 className="text-block__m text-color-dark-blue">
                Ростовское художественное училище им. М. Б. Грекова
              </h2>
              <h2 className="text-block__s text-color-dark-blue">Направление: Графический дизайн</h2>
              <h2 className="text-block__s text-color-dark-blue">2018-2022</h2>
            </div>
            <div className="education-steps-card">
              <h2 className="text-block__xl text-color-dark-blue">Step 2</h2>
              <h2 className="text-block__m text-color-dark-blue">
                Санкт-Петербургский государственный университет промышленных технологий и дизайна
              </h2>
              <h2 className="text-block__s text-color-dark-blue">Направление: Прикладная информатика (в дизайне)</h2>
              <h2 className="text-block__s text-color-dark-blue">2022-2027</h2>
            </div>
            <div className="education-steps-card">
              <h2 className="text-block__xl">Step 3</h2>
              <h2 className="text-block__m">
                Образовательные курсы, вебинары от Pinkman Experience, Dmitrieva.brand, Brand.design.wellness
              </h2>
              <h2 className="text-block__s">Направление: UX/UI-дизайн</h2>
              <h2 className="text-block__s">2022-2026</h2>
            </div>
          </div>
        </div>

        <div className="skills-wrapper">
          <h2 className="skills-title text-block__xl">Технические навыки </h2>
          <div className="skills-list">
            <h2 className="text-block__m skills-list_text-decorate">Figma</h2>
            <h2 className="text-block__m skills-list_text-decorate">Adobe Photoshop</h2>
            <h2 className="text-block__m skills-list_text-decorate">Adobe Illustrator</h2>
            <h2 className="text-block__m skills-list_text-decorate">Adobe InDesign</h2>
            <h2 className="text-block__m skills-list_text-decorate">Adobe After Effects</h2>
            <h2 className="text-block__xl skills-list_text-decorate">+</h2>
            <h2 className="text-block__m skills-list_text-decorate">Blender 3D</h2>
            <h2 className="text-block__m skills-list_text-decorate">ZBrush</h2>
          </div>
        </div>

        <div className="culture-of-work">
          <div className="part1_of_culture">
            <h2 className="principles-card text-block__xl">Культура работы</h2>
            <h2 className="principles-card text-block__m">
              Живой интерес к трендам в дизайне, digital, развитию и всему новому
            </h2>
            <h2 className="principles-card text-block__m">
              Способность челленджить собственные решения и решения коллег
            </h2>
            <h2 className="principles-card text-block__m">
              Умение слушать, вести диалог и аргументировать свои решения
            </h2>
          </div>
          <div className="part2_of_culture">
            <h2 className="principles-card text-block__m">
              Комфортная и эффективная работа как в команде, так и самостоятельно
            </h2>
            <h2 className="principles-card text-block__m">
              Ответственность в сроках и способность довести идею до реализации
            </h2>
            <h2 className="principles-card text-block__m">
              Умею делать сложное простым: продумывая сложные UX-пути, создавая эффектные UI-решения
            </h2>
          </div>
        </div>

        <div className="footer">
          <h2 className="text-block__xl">Информация о ходе работы</h2>
          <div className="results-list">
            <h2 className="results-text-cell text-block__m">Нейросети -</h2>
            <h2 className="results-text-cell text-block__m">Время выполнения -</h2>
            <h2 className="results-text-cell text-block__m">Реализованный функционал на JavaScript -</h2>
          </div>
        </div>
      </MainWrapper>
      {/* <Footer /> */}
    </div>
  );
};
