import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from 'components/Layout';
import Post from 'components/Post';
import { getPosts } from 'utils';

export default function HomePage({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <Post key={i} {...post} />
        ))}
      </div>
      <Link
        href="/blog"
        className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
      >
        All Posts
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  const posts = getPosts().slice(0, 6);

  return {
    props: { posts },
  };
}
