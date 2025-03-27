import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// 这里可以替换为实际的博客数据
const blogPosts = {
  'how-to-cut-mp3': {
    title: 'How to Cut MP3 Files: A Complete Guide',
    description: 'Learn the best techniques for cutting MP3 files and maintaining audio quality.',
    date: '2024-03-27',
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
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - MP3 Cutter',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} - MP3 Cutter Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://mp3cutter.pro/blog/${resolvedParams.slug}`,
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
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500">{post.date}</time>
      </header>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
} 