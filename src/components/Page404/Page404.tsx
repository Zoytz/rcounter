import React from 'react';
import { Link } from 'react-router-dom';

export const Page404 = React.memo((props) => {

  return (
    <section className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <Link to="/rcounter" className="not-found-page__link page__link">
        Назад
      </Link>
    </section>
  )
})