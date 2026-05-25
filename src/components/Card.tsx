import { useNavigate, useSearchParams } from 'react-router-dom';
import type { CardProps } from '../interfaces/CardProps';
import useItemStore from '../useItemStore';

export const Card = ({ item, isShowCharacter = false }: CardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedItems, selectItem } = useItemStore();
  const isChecked = selectedItems.some((i) => i.id === item.id);
  const handleClick = () => {
    if (!isShowCharacter) {
      navigate(`/details/${item.id}?${searchParams.toString()}`);
    }
  };
  return (
    <div
      className={`border-2 w-full rounded-md p-2 ${!isShowCharacter ? 'cursor-pointer' : ''} text-black dark:text-white`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl">{item.name}</p>
        {!isShowCharacter && (
          <input
            type="checkbox"
            checked={isChecked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => selectItem(item)}
            className="w-6 h-6 cursor-pointer"
          />
        )}
      </div>
      <p>Gender: {item.gender}</p>
      <p>Birth year: {item.birth_year}</p>
      {isShowCharacter && (
        <div>
          <p>Height: {item.height}</p>
          <p>Mass: {item.mass}</p>
          <p>Hair color: {item.hair_color}</p>
          <p>Skin color: {item.skin_color}</p>
          <p>Eye color: {item.eye_color}</p>
        </div>
      )}
    </div>
  );
};
