import React from 'react';
import Link from 'next/link';

interface FriendLink {
  link: string;
  siteName: string;
}

// 从API获取友链数据
async function getFriendLinks(): Promise<FriendLink[]> {
  try {
    // 调用API获取友链数据
    const response = await fetch('https://api.driftbossgame.org/get-friend-links', {
      cache: 'no-store', // 禁用缓存，确保每次都获取最新数据
      next: { revalidate: 3600 } // 每小时重新验证一次数据
    });
    
    if (!response.ok) {
      console.error('获取友链数据失败:', response.statusText);
      return [];
    }
    
    // 解析JSON响应
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取友链数据时发生错误:', error);
    return [];
  }
}

// 友链服务端组件
export default async function FriendLinks() {
  // 获取环境变量中的域名
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || '';
  
  // 获取友链数据
  const links = await getFriendLinks();
  
  // 过滤掉当前站点的链接，只基于域名匹配
  const filteredLinks = links.filter(link => {
    // 检查链接URL是否包含当前站点域名
    return !siteDomain || !link.link.includes(siteDomain);
  });
  
  // 如果没有友链数据，不渲染组件
  if (!filteredLinks || filteredLinks.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-3">
    {filteredLinks.map((link, index) => (
        <Link 
        key={index} 
        href={link.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gray-800/30 text-sm py-1 px-3 rounded hover:bg-gray-700/40 transition-colors"
        >
        {link.siteName}
        </Link>
    ))}
    </div>
  );
} 