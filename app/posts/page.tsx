import Post from '@/components/Post';

export default function PostsPage() {
  const samplePost = {
    username: 'Jessica',
    category: 'History',
    title: 'The Beginning of the End of the World',
    content:
      'The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future...',
    commentCount: 32,
  };
  return (
    <div className='p-8 bg-gray-100'>
      <div className='container mx-auto space-y-4'>
        <Post {...samplePost} />
        <Post {...samplePost} />
        <Post {...samplePost} />
      </div>
    </div>
  );
}
