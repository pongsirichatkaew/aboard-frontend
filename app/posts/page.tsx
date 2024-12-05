import AddPostModal from './components/AddEditPostModal';
import Post, { PostItem } from '@/app/posts/components/PostCard';

async function fetchPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <div className='flex flex-col space-y-1 p-8'>
      <div className='flex flex-row-reverse py-4 items-end gap-4'>
        <AddPostModal />
      </div>

      {posts.map((post: PostItem) => (
        <Post
          key={post.id}
          postId={post.id}
          username={post.user.username}
          community={post.community}
          title={post.title}
          content={post.content}
          commentCount={post.comments.length}
        />
      ))}
    </div>
  );
}
