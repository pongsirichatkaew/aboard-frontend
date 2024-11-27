import type { Metadata } from 'next';
import TopBar from '../../components/Topbar';

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
      <main>{children}</main>
    </>
  );
}
