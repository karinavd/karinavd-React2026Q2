import { useNavigate, useSearchParams } from 'react-router-dom';
import type { CardProps } from '../interfaces/CardProps';

export const Card = ({ item, isShowCharacter = false }: CardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleClick = () => {
    navigate(`/details/${item.id}?${searchParams.toString()}`);
  };
  return (
    <div
      className={`border w-full p-2 ${!isShowCharacter ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <p className="text-bold text-2xl">{item.name}</p>
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
