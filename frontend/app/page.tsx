import RouteConstants from '@/constants/RouteConstants';
import { redirect } from 'next/navigation';

export default async function Root() {
  redirect(RouteConstants.home);
}