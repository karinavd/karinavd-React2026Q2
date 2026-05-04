import { Component } from 'react';
import type { CardListProps } from '../interfaces/CardListProps';
import { Card } from './Card';

export class CardList extends Component<CardListProps> {
  render() {
    const { items, isLoading, error } = this.props;
    if (error) return <div>Error: {error}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (items.length === 0) return <div>Not found</div>;
    return (
      <div className="p-5">
        {items.map((x) => (
          <Card key={x.id} item={x} />
        ))}
      </div>
    );
  }
}
