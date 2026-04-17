import './footer.css';

export const Footer = () => {
  return (
    <div className="footer">
      <h2 className="text-block__xl">Информация о ходе работы</h2>
      <div className="results-list">
        <h2 className="results-text-cell text-block__m">Нейросети: OpenAI Codex, Perplexity AI, Алиса AI</h2>
        <h2 className="results-text-cell text-block__m">Время выполнения - 3 дня</h2>
        <h2 className="results-text-cell text-block__m">
          Реализованный функционал на JavaScript: модальное окно изображения, кнопка прокрутки страницы наверх,
          горизонтальный scroll-driven таймлайн, интерактивные внешние ссылки и базовая клиентская маршрутизация.
        </h2>
      </div>
    </div>
  );
};
