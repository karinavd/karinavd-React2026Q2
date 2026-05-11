import { describe, expect, it } from 'vitest';
import { Card } from '../components/Card';
import { render, screen } from '@testing-library/react';
const userData = {
  id: '1',
  name: 'testCard',
  height: '100m',
  mass: '100kg',
  hair_color: 'dark green',
  skin_color: 'yellow',
  eye_color: 'hazel',
  birth_year: '1900',
  gender: 'f',
  url: 'user_url',
};
describe('Card component', () => {
  it('should render the card with the provided fields', () => {
    render(<Card item={userData} />);
    expect(screen.getByText(userData.name)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${userData.gender}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Birth year: ${userData.birth_year}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Height: ${userData.height}`)).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${userData.mass}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Hair color: ${userData.hair_color}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Skin color: ${userData.skin_color}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Eye color: ${userData.eye_color}`)
    ).toBeInTheDocument();
  });
});
