import { Component } from 'react';
import type { CardProps } from '../interfaces/CardProps';

export class Card extends Component<CardProps> {
  render() {
    const { item } = this.props;
    return (
      <div className="border p-2">
        <p className="text-bold text-2xl">{item.name}</p>
        <p>Gender: {item?.gender}</p>
        <p>Birth year: {item.birth_year}</p>
        <p>Height: {item.height}</p>
        <p>Mass: {item.mass}</p>
        <p>Hair color: {item.hair_color}</p>
        <p>Skin color: {item.skin_color}</p>
        <p>Eye color: {item.eye_color}</p>
      </div>
    );
  }
}
