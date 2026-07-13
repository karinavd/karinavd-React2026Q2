import { useEffect, useRef } from 'react';
import { Card } from './Card';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ButtonComponent from './FlyoutButton';
import useOutsideClick from '../OutSideClick';
import {
  useCharacterDetailsQuery,
  useInvalidateCharacterCache,
} from '../hooks/useCharactersQuery';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const boxRef = useRef(null);
  const isboxOutsideClick = useOutsideClick(boxRef);

  const { data: item, isLoading, error } = useCharacterDetailsQuery(id);
  const invalidateCharacterCache = useInvalidateCharacterCache();

  useEffect(() => {
    if (isboxOutsideClick) handleClose();
  }, [isboxOutsideClick]);

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  const handleRefresh = () => {
    if (id) {
      invalidateCharacterCache(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className="flex gap-3 flex-col items-start h-full p-3 shadow-[-15px_0_15px_-15px_rgba(0,0,0,0.5)]">
        <ButtonComponent
          text="✕ Close"
          componentStyle=""
          handleClick={handleClose}
        />
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      className="flex gap-3 flex-col items-start h-full p-3 shadow-[-15px_0_15px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="flex gap-2 w-full">
        <ButtonComponent
          text="✕ Close"
          componentStyle=""
          handleClick={handleClose}
        />
        <button
          onClick={handleRefresh}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
        >
          Refresh
        </button>
      </div>
      {item && <Card item={item} isShowCharacter={true} />}
    </div>
  );
};

export default DetailsPage;
