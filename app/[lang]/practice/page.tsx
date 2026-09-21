import { RoutePage, routeMetadata } from '../RoutePage';

export const generateMetadata = ({ params }: { params: Promise<{ lang: string }> }) =>
  routeMetadata(params, 'practice');

export default function PracticePage({ params }: { params: Promise<{ lang: string }> }) {
  return <RoutePage params={params} tab="practice" />;
}
