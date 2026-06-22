'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ItemProps } from '@/app/types';

export async function searchAction(formData: FormData): Promise<void> {
  const q = ((formData.get('q') as string) || '').trim();
  const headersList = await headers();
  const referer = headersList.get('referer') || '/en';
  try {
    const url = new URL(referer);
    url.searchParams.set('q', q);
    url.searchParams.set('page', '1');
    url.searchParams.delete('selected');
    redirect(url.pathname + '?' + url.searchParams.toString());
  } catch {
    redirect('/en?q=' + encodeURIComponent(q) + '&page=1');
  }
}

export async function generateCSV(items: ItemProps[]): Promise<string> {
  const headerRow = 'Id,Name,Gender,Birth year\n';
  const rows = items
    .map(
      (item) =>
        `"${item.id}","${item.name}","${item.gender}","${item.birth_year}"`
    )
    .join('\n');
  return headerRow + rows;
}

export async function fetchCharacters(
  searchTerm: string = ''
): Promise<ItemProps[]> {
  const res = await fetch('https://swapi.info/api/people', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }

  const data = await res.json();
  const characters = data.map((character: ItemProps) => ({
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

  if (!searchTerm) return characters;
  return characters.filter((char: ItemProps) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export async function fetchCharacterDetails(
  characterId: string
): Promise<ItemProps | null> {
  const characters = await fetchCharacters();
  return (
    characters.find((char: ItemProps) => char.name === characterId) || null
  );
}
