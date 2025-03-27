import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - MP3 Cutter | Audio Editing Tips and Tutorials',
  description: 'Learn about audio editing, MP3 cutting techniques, and get tips for the best audio editing experience. Expert guides and tutorials from MP3 Cutter.',
  keywords: 'audio editing blog, mp3 cutting tutorial, audio editing tips, mp3 editor guide',
  openGraph: {
    title: 'Blog - MP3 Cutter | Audio Editing Tips and Tutorials',
    description: 'Learn about audio editing, MP3 cutting techniques, and get tips for the best audio editing experience.',
    type: 'website',
    url: 'https://mp3cutter.pro/blog',
  },
};

// 这里可以替换为实际的博客数据
const blogPosts = [
  {
    id: 'how-to-cut-mp3',
    title: 'How to Cut MP3 Files: A Complete Guide',
    description: 'Learn the best techniques for cutting MP3 files and maintaining audio quality.',
    date: '2024-03-27',
    slug: 'how-to-cut-mp3',
  },
  {
    id: 'audio-quality-tips',
    title: 'Tips for Maintaining Audio Quality When Editing',
    description: 'Essential tips and tricks to ensure your audio quality remains high during editing.',
    date: '2024-03-26',
    slug: 'audio-quality-tips',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
} 