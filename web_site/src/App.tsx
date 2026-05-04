import { HomePage } from './pages/HomePage';

const App = () => {
  const path = (typeof window !== 'undefined' && window.location.pathname) || '';
  switch (path) {
    case '':
    case '/':
    case '/home': {
      return <HomePage />;
    }

    default:
      return <div>DEFAULT</div>;
  }
};

export default App;
