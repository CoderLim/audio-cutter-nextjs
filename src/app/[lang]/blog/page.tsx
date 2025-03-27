import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/i18n/get-dictionary';
import Image from 'next/image';
import { Locale } from '@/i18n/types';

interface PageProps {
  params: Promise<{ 
    lang: Locale;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return {
    title: dict.blog.title,
    description: dict.blog.description,
    keywords: dict.blog.keywords,
    openGraph: {
      title: dict.blog.title,
      description: dict.blog.description,
      type: 'website',
      url: `https://mp3cutter.pro/${resolvedParams.lang}/blog`,
    },
  };
}

// 这里可以替换为实际的博客数据
const blogPosts = [
  {
    id: 'trim-song-online',
    title: 'How to Trim a Song Online: Quick and Easy Guide',
    description: 'Learn how to trim your favorite songs online using our free MP3 cutter tool. No software installation required!',
    date: '2024-03-28',
    slug: 'trim-song-online',
    category: 'Tutorial',
    readTime: '4 min read',
    image: '/blog/trim-song-online.svg',
  },
  {
    id: 'how-to-cut-mp3',
    title: 'How to Cut MP3 Files: A Complete Guide',
    description: 'Learn the best techniques for cutting MP3 files and maintaining audio quality.',
    date: '2024-03-27',
    slug: 'how-to-cut-mp3',
    category: 'Tutorial',
    readTime: '5 min read',
    image: '/blog/how-to-cut-mp3.svg',
  },
  {
    id: 'audio-quality-tips',
    title: 'Tips for Maintaining Audio Quality When Editing',
    description: 'Essential tips and tricks to ensure your audio quality remains high during editing.',
    date: '2024-03-26',
    slug: 'audio-quality-tips',
    category: 'Tips & Tricks',
    readTime: '4 min read',
    image: '/blog/audio-quality-tips.svg',
  },
];

export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{dict.blog.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{dict.blog.description}</p>
          
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <Link href={`/${resolvedParams.lang}/blog/${post.slug}`} className="block">
                  <div className="relative h-48 md:h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                    <time className="text-sm text-gray-500">{post.date}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 