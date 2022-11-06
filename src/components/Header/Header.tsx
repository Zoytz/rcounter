import { FC } from 'react';

type PropsType = {
  handleOpenMenu: () => void
}

const Header: FC<PropsType> = ({ handleOpenMenu }) => {
  return (
    <header className='header'>
      <a target="_blank" rel="noreferrer" href="https://github.com/Zoytz" className="header__link page__link">Zoytz</a>
      <button onClick={handleOpenMenu} className="header__button" type="button" aria-label='Кнопка открытия меню'>
      </button>
    </header>
  )
}

export default Header;