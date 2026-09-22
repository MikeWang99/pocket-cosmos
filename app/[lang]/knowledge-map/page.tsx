import { RoutePage, routeMetadata } from '../RoutePage';

export const generateMetadata = ({ params }: { params: Promise<{ lang: string }> }) =>
  routeMetadata(params, 'curriculum');

export default function KnowledgeMapPage({ params }: { params: Promise<{ lang: string }> }) {
  return <RoutePage params={params} tab="curriculum" />;
}
