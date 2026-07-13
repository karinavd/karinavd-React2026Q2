import type { ItemProps } from './interfaces/ItemProps';

export const fetchDataCharacters = async (
  item: string
): Promise<ItemProps[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const res = await fetch(`https://swapi.info/api/people`).then((res) =>
    res.json()
  );
  const filteredCharacters = item
    ? res.filter((char: ItemProps) =>
        char.name.toLowerCase().includes(item.toLowerCase())
      )
    : res;
  return filteredCharacters.map((character: ItemProps) => ({
    id: character.name,
    name: character.name,
    height: character.height,
    mass: character.mass,
    hair_color: character.hair_color,
    skin_color: character.skin_color,
    eye_color: character.eye_color,
    birth_year: character.birth_year,
    gender: character.gender,
    url: character.url,
  }));
};
