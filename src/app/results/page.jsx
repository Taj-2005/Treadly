import Results from '@/app/components/Results/Results';

export default function Page({ searchParams }) {
  return <Results place={searchParams.place} />;
}
