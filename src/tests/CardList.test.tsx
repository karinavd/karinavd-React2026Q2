import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CardList } from '../components/CardList';
import type { CardProps } from '../interfaces/CardProps';
const userData = [
  {
    id: '1',
    name: 'Luke Skywalker',
    height: '100m',
    mass: '100kg',
    hair_color: 'dark green',
    skin_color: 'yellow',
    eye_color: 'hazel',
    birth_year: '1900',
    gender: 'f',
    url: 'user_url',
  },
  {
    id: '2',
    name: 'Darth Vader',
    height: '200m',
    mass: '200kg',
    hair_color: 'dark brown',
    skin_color: 'green',
    eye_color: 'blue',
    birth_year: '2000',
    gender: 'm',
    url: 'user_url2',
  },
];
vi.mock('../components/Card', () => {
  return {
    Card: (props: CardProps) => (
      <div data-testid="cardListContainer">{props.item.name}</div>
    ),
  };
});
describe('CardList component', () => {
  describe('Error routing', () => {
    it("should render an error message if there's an API error", () => {
      const errMsg = 'Failed to fetch characters from SWAPI server';
      render(<CardList items={[]} isLoading={false} error={errMsg} />);
      expect(screen.getByText(`Error: ${errMsg}`)).toBeInTheDocument();
    });
  });
  describe('Loading state rounting', () => {
    it("should render an 'loading...' text when data is fetching", () => {
      render(<CardList items={[]} isLoading={true} error={null} />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
  describe('Empty state', () => {
    it("should render an 'Not found' when no items are found", () => {
      render(<CardList items={[]} isLoading={false} error={null} />);
      expect(screen.getByText(/Not found/i)).toBeInTheDocument();
    });
  });
  describe('Success state', () => {
    it('should render a list of cards', () => {
      render(<CardList items={userData} isLoading={false} error={null} />);
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
      const cardsCount = screen.getAllByTestId('cardListContainer');
      expect(cardsCount).toHaveLength(2);
    });
  });
});
