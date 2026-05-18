import type { CardListProps } from '../interfaces/CardListProps';
import { Card } from './Card';

export const CardList = ({ items, isLoading, error }: CardListProps) => {
  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (items.length === 0) return <div>Not found</div>;

  return (
    <div className="p-5 grid grid-cols-3 gap-5 w-full">
      {items.map((x) => (
        <Card key={x.id} item={x} isShowCharacter={false} />
      ))}
    </div>
  );
};
