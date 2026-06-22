import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import type { AboutPageProps } from '@/app/types';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }];
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale });

  return (
    <div className="min-h-screen bg-[#131212] text-white p-10 flex flex-col w-full">
      <Link
        href="/"
        className="text-2xl rounded cursor-pointer transition-colors mb-8 hover:text-gray-300"
      >
        {t('common.back')}
      </Link>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">{t('about.title')}</h1>
        <div className="p-6">
          <p className="text-xl mb-4">
            <b>Author:</b> Karyna
          </p>
          <p className="text-xl mb-4">
            <b>Github:</b>{' '}
            <a
              href="https://github.com/karinavd"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              karinavd
            </a>
          </p>
          <p className="text-xl">
            <b>Course: </b>
            <a
              href="https://app.rs.school/course/student/dashboard?course=react-2026-q2"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              RS School React Course
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
