import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ItemProps } from '../interfaces/ItemProps';

const fetchAllCharacters = async (): Promise<ItemProps[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const res = await fetch('https://swapi.info/api/people');
  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }
  const data = await res.json();
  return data.map((character: ItemProps) => ({
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

const filterCharactersBySearch = (
  characters: ItemProps[],
  searchTerm: string
): ItemProps[] => {
  if (!searchTerm) return characters;
  return characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const useCharactersQuery = (searchTerm: string = '') => {
  return useQuery<ItemProps[], Error>({
    queryKey: ['characters', searchTerm],
    queryFn: async () => {
      const allCharacters = await fetchAllCharacters();
      return filterCharactersBySearch(allCharacters, searchTerm);
    },
  });
};

export const useCharacterDetailsQuery = (characterId: string | undefined) => {
  return useQuery<ItemProps | null, Error>({
    queryKey: ['character', characterId],
    queryFn: async () => {
      if (!characterId) return null;
      const allCharacters = await fetchAllCharacters();
      const character = allCharacters.find((char) => char.name === characterId);
      return character || null;
    },
    enabled: !!characterId,
  });
};

export const useCharactersQueryClient = () => {
  return useQueryClient();
};

export const useInvalidateCharactersCache = () => {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({
      queryKey: ['characters'],
      refetchType: 'all'
    });
  };
};

export const useInvalidateCharacterCache = () => {
  const queryClient = useQueryClient();
  return (characterId: string) => {
    queryClient.invalidateQueries({ queryKey: ['character', characterId] });
  };
};
