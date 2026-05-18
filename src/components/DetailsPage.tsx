import { useEffect, useState } from 'react';
import { Card } from './Card';
import type { ItemProps } from '../interfaces/ItemProps';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [item, setItem] = useState<ItemProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resData = await fetch(`https://swapi.info/api/people`).then(
          (res) => res.json()
        );
        const res = resData.find((char: ItemProps) => char.name === id);
        const characterData: ItemProps = {
          id: res.name,
          name: res.name,
          height: res.height,
          mass: res.mass,
          hair_color: res.hair_color,
          skin_color: res.skin_color,
          eye_color: res.eye_color,
          birth_year: res.birth_year,
          gender: res.gender,
          url: res.url,
        };
        setItem(characterData);
      } catch (error) {
        console.error('Error fetching character data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (isLoading) return <div>Loading...</div>;
  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="flex gap-3 flex-col items-start">
      <button onClick={handleClose} className="cursor-pointer">
        Close
      </button>
      {item && <Card item={item} isShowCharacter={true} />}
    </div>
  );
};

export default DetailsPage;
