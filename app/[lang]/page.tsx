import { RoutePage, routeMetadata } from './RoutePage';

export const generateMetadata = ({ params }: { params: Promise<{ lang: string }> }) =>
  routeMetadata(params, 'home');

export default function LocalizedHome({ params }: { params: Promise<{ lang: string }> }) {
  return <RoutePage params={params} tab="home" />;
}
