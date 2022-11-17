import { FC } from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
  handleOpenMenu: () => void
}

const Header: FC<PropsType> = ({ handleOpenMenu }) => {
  return (
    <header className='header'>
      <Link to="/" className="header__link page__link">almostCRM</Link>
      <button onClick={handleOpenMenu} className="header__button" type="button" aria-label='Кнопка открытия меню'>
      </button>
    </header>
  )
}

export default Header;