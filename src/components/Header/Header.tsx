import { FC } from 'react';

type PropsType = {
  handleOpenMenu: () => void
}

const Header: FC<PropsType> = ({ handleOpenMenu }) => {
  return (
    <header className='header'>
      <button onClick={handleOpenMenu} className="header__button" type="button" aria-label='Кнопка открытия меню'>
      </button>
    </header>
  )
}

export default Header;