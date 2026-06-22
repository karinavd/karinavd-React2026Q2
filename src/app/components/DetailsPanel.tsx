import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import type { ItemProps } from '@/app/types';

export async function DetailsPanel({ item }: { item: ItemProps }) {
  const t = await getTranslations('common');

  return (
    <div className="p-4 border-l border-gray-700 h-full text-black dark:text-white">
      <Link
        href="/"
        className="text-black dark:text-white hover:opacity-70 mb-4 block text-sm font-medium"
      >
        ✕ {t('back')}
      </Link>
      <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
      <p className="mb-1">
        <span className="font-semibold">Gender:</span> {item.gender}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Birth year:</span> {item.birth_year}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Height:</span> {item.height}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Mass:</span> {item.mass}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Hair color:</span> {item.hair_color}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Skin color:</span> {item.skin_color}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Eye color:</span> {item.eye_color}
      </p>
    </div>
  );
}
