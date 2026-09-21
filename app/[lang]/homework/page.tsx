import { RoutePage, routeMetadata } from '../RoutePage';

export const generateMetadata = ({ params }: { params: Promise<{ lang: string }> }) =>
  routeMetadata(params, 'homework');

export default function HomeworkPage({ params }: { params: Promise<{ lang: string }> }) {
  return <RoutePage params={params} tab="homework" />;
}
