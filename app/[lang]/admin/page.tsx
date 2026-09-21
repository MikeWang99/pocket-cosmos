import { RoutePage, routeMetadata } from '../RoutePage';

export const generateMetadata = ({ params }: { params: Promise<{ lang: string }> }) =>
  routeMetadata(params, 'admin');

export default function AdminPage({ params }: { params: Promise<{ lang: string }> }) {
  return <RoutePage params={params} tab="admin" />;
}
