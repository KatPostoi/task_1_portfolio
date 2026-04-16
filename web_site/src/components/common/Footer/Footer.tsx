import './footer.css';

export const Footer = () => {
  return (
    <div className="footer">
      <h2 className="text-block__xl">Информация о ходе работы</h2>
      <div className="results-list">
        <h2 className="results-text-cell text-block__m">Нейросети -</h2>
        <h2 className="results-text-cell text-block__m">Время выполнения -</h2>
        <h2 className="results-text-cell text-block__m">Реализованный функционал на JavaScript -</h2>
      </div>
    </div>
  );
};
