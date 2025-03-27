import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/types';

// 这里可以替换为实际的博客数据
const blogPosts = {
  'trim-song-online': {
    title: 'How to Trim a Song Online: Quick and Easy Guide',
    description: 'Learn how to trim your favorite songs online using our free MP3 cutter tool. No software installation required!',
    date: '2024-03-28',
    category: 'Tutorial',
    readTime: '4 min read',
    image: '/blog/trim-song-online.svg',
    author: {
      name: 'John Doe',
      avatar: '/blog/author-avatar.svg',
    },
    content: `
      <h2>Introduction</h2>
      <p>Want to create a custom ringtone from your favorite song? Or need to extract a specific part of a song for a project? Our online MP3 cutter makes it easy to trim songs without installing any software. In this guide, we'll show you how to use our tool to trim your songs quickly and efficiently.</p>

      <h2>Why Use an Online Song Trimmer?</h2>
      <p>Online song trimmers offer several advantages:</p>
      <ul>
        <li>No software installation required</li>
        <li>Access from any device with a web browser</li>
        <li>Instant processing and download</li>
        <li>No registration or account needed</li>
        <li>Free to use</li>
      </ul>

      <h2>How to Trim a Song Using Our Tool</h2>
      <p>Follow these simple steps to trim your song:</p>
      <ol>
        <li>Visit our MP3 cutter website</li>
        <li>Upload your song by dragging and dropping it into the upload area or clicking to select a file</li>
        <li>Use the waveform visualization to select your desired start and end points</li>
        <li>Click the "Cut" button to process your selection</li>
        <li>Download your trimmed song</li>
      </ol>

      <h2>Tips for Best Results</h2>
      <p>To get the best results when trimming your song:</p>
      <ul>
        <li>Choose precise cut points to avoid audio artifacts</li>
        <li>Use the waveform display to identify the exact moments you want to cut</li>
        <li>Preview your selection before downloading</li>
        <li>Keep the original file as a backup</li>
      </ul>

      <h2>Common Use Cases</h2>
      <p>Our online song trimmer is perfect for:</p>
      <ul>
        <li>Creating custom ringtones</li>
        <li>Extracting favorite parts of songs</li>
        <li>Preparing audio clips for presentations</li>
        <li>Making song samples</li>
        <li>Editing podcast segments</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Trimming songs online has never been easier. Our MP3 cutter tool provides a simple, fast, and free solution for all your song trimming needs. Try it now and create the perfect audio clips for your projects!</p>
    `,
  },
  'how-to-cut-mp3': {
    title: 'How to Cut MP3 Files: A Complete Guide',
    description: 'Learn the best techniques for cutting MP3 files and maintaining audio quality.',
    date: '2024-03-27',
    category: 'Tutorial',
    readTime: '5 min read',
    image: '/blog/how-to-cut-mp3.svg',
    author: {
      name: 'John Doe',
      avatar: '/blog/author-avatar.svg',
    },
    content: `
      <h2>Introduction</h2>
      <p>Cutting MP3 files is a common task that many people need to perform. Whether you're creating ringtones, editing podcasts, or preparing audio for a presentation, knowing how to cut MP3 files effectively is essential.</p>

      <h2>Why Cut MP3 Files?</h2>
      <p>There are several reasons why you might need to cut an MP3 file:</p>
      <ul>
        <li>Creating ringtones from your favorite songs</li>
        <li>Removing unwanted sections from audio recordings</li>
        <li>Preparing audio clips for presentations</li>
        <li>Editing podcasts or interviews</li>
      </ul>

      <h2>Best Practices for Cutting MP3 Files</h2>
      <p>When cutting MP3 files, it's important to follow these best practices:</p>
      <ol>
        <li>Always work with a copy of your original file</li>
        <li>Choose precise cut points to avoid audio artifacts</li>
        <li>Maintain consistent bitrate throughout the file</li>
        <li>Use high-quality audio editing software</li>
      </ol>

      <h2>Conclusion</h2>
      <p>With the right tools and techniques, cutting MP3 files can be a straightforward process. Remember to always work with copies of your original files and follow best practices to maintain audio quality.</p>
    `,
  },
  'audio-quality-tips': {
    title: 'Tips for Maintaining Audio Quality When Editing',
    description: 'Essential tips and tricks to ensure your audio quality remains high during editing.',
    date: '2024-03-26',
    category: 'Tips & Tricks',
    readTime: '4 min read',
    image: '/blog/audio-quality-tips.svg',
    author: {
      name: 'Jane Smith',
      avatar: '/blog/author-avatar.svg',
    },
    content: `
      <h2>Introduction</h2>
      <p>Maintaining high audio quality during editing is crucial for professional results. This guide will help you understand how to preserve audio quality while editing your files.</p>

      <h2>Understanding Audio Quality</h2>
      <p>Audio quality is determined by several factors:</p>
      <ul>
        <li>Bitrate</li>
        <li>Sample rate</li>
        <li>Audio format</li>
        <li>Compression settings</li>
      </ul>

      <h2>Tips for Maintaining Quality</h2>
      <p>Here are some essential tips for maintaining audio quality:</p>
      <ol>
        <li>Use lossless formats when possible</li>
        <li>Avoid multiple re-encodings</li>
        <li>Maintain consistent bitrate</li>
        <li>Use high-quality audio processing algorithms</li>
      </ol>

      <h2>Conclusion</h2>
      <p>By following these tips, you can ensure your audio maintains its quality throughout the editing process.</p>
    `,
  },
};

interface PageProps {
  params: Promise<{ 
    lang: Locale;
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: dict.blog.notFound,
      description: dict.blog.notFoundDescription,
    };
  }

  return {
    title: `${post.title} - ${dict.blog.title}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://mp3cutter.pro/${resolvedParams.lang}/blog/${resolvedParams.slug}`,
      images: [
        {
          url: `https://mp3cutter.pro${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>

              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <time className="text-sm text-gray-500">{post.date}</time>
                </div>
              </div>

              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 pt-8 border-t">
                <Link 
                  href={`/${resolvedParams.lang}/blog`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 