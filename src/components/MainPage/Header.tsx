import type { HeaderProps } from '../../interfaces/HeaderProps';
import { Search } from '../Search';
import { Link } from 'react-router-dom';

const Header = ({ handleSearch, isLoading, triggerErr }: HeaderProps) => {
  return (
    <header className="w-full p-4 bg-[#131212] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] text-white flex items-center justify-between">
      <h1 className="text-[35px]">Star wars</h1>
      <Search onSearch={handleSearch} isLoading={isLoading} />
      <div className="flex gap-3 items-center justify-center">
        <Link to="/about" className="text-xl">
          About
        </Link>
        <button
          className="bg-white min-w-20 cursor-pointer rounded-[5px] text-black p-1"
          onClick={triggerErr}
        >
          Error button
        </button>
      </div>
    </header>
  );
};

export default Header;
