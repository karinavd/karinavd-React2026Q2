import { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import type { ItemProps } from '../interfaces/ItemProps';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ButtonComponent from './FlyoutButton';
import useOutsideClick from '../OutSideClick';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [item, setItem] = useState<ItemProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef(null);
  const isboxOutsideClick = useOutsideClick(boxRef);
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
  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (isboxOutsideClick) handleClose();
  }, [isboxOutsideClick]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      ref={boxRef}
      className="flex gap-3 flex-col items-start h-full p-3 shadow-[-15px_0_15px_-15px_rgba(0,0,0,0.5)]"
    >
      <ButtonComponent
        text="✕ Close"
        componentStyle=""
        handleClick={handleClose}
      />
      {item && <Card item={item} isShowCharacter={true} />}
    </div>
  );
};

export default DetailsPage;
