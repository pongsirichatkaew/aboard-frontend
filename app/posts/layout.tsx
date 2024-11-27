import type { Metadata } from 'next';
import TopBar from '../../components/Topbar';
import MainNavigation from '../../components/MainNavigation';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts Page',
};

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <div className='bg-gray-100 min-h-screen flex flex-row'>
        <MainNavigation />
        <main className='flex-grow'>{children}</main>
      </div>
    </>
  );
}
