import { useContext } from 'react';
import type { HeaderProps } from '../../interfaces/HeaderProps';
import { Search } from '../Search';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';
import ButtonComponent from '../FlyoutButton';

const Header = ({ handleSearch, isLoading, triggerErr }: HeaderProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="w-full p-4 bg-white dark:bg-[#131212] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] text-white flex items-center justify-between">
      <h1 className="text-[35px] text-black dark:text-white">Star wars</h1>
      <Search onSearch={handleSearch} isLoading={isLoading} />
      <div className="flex gap-3 items-center justify-center">
        <Link to="/about" className="text-xl text-black dark:text-white">
          About
        </Link>
        <ButtonComponent
          componentStyle=""
          text={theme === 'light' ? '☾ Dark Mode' : '☀︎ Light Mode'}
          handleClick={toggleTheme}
        />
        <ButtonComponent
          componentStyle=""
          text="Error button"
          handleClick={triggerErr}
        />
      </div>
    </header>
  );
};

export default Header;
