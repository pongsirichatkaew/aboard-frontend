import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to /posts
  redirect('/posts');
}
