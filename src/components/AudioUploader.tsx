'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useAudioStore } from '@/store/audioStore'

export default function AudioUploader() {
  const setAudioFile = useAudioStore((state) => state.setAudioFile)
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const didDropRef = useRef(false) // 用于跟踪是否已经处理过文件拖放

  // 主要的文件处理函数 - 可以被各处调用
  const processFile = useCallback((file: File) => {
    if (!file) return;
    
    // 详细打印文件对象的属性
    console.log('处理文件:', {
      name: file.name,
      type: file.type,
      size: file.size + ' 字节 (' + (file.size / 1024).toFixed(2) + ' KB)',
      lastModified: new Date(file.lastModified).toLocaleString()
    });
    
    // 设置到store中
    setAudioFile(file);
    
    // 标记为已处理
    didDropRef.current = true;
    
    // 延迟清理状态
    setTimeout(() => {
      if (dropzoneRef.current) {
        dropzoneRef.current.removeAttribute('data-drag-active');
      }
      didDropRef.current = false;
    }, 100);
  }, [setAudioFile]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('react-dropzone onDrop被调用，文件数量：', acceptedFiles.length)
    
    const file = acceptedFiles[0]
    if (file) {
      processFile(file);
    }
  }, [processFile])

  // 确保document.body不处理拖放事件
  useEffect(() => {
    const preventBodyDrop = (e: DragEvent) => {
      e.preventDefault()
    }
    
    document.body.addEventListener('dragover', preventBodyDrop, false)
    document.body.addEventListener('drop', preventBodyDrop, false)
    
    return () => {
      document.body.removeEventListener('dragover', preventBodyDrop, false)
      document.body.removeEventListener('drop', preventBodyDrop, false)
    }
  }, [])

  // 直接处理拖放事件，不依赖React的事件系统
  useEffect(() => {
    const element = dropzoneRef.current;
    if (!element) return;
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      // 显示可拖放状态
      element.setAttribute('data-drag-active', 'true');
    };
    
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (!element.contains(e.relatedTarget as Node)) {
        element.removeAttribute('data-drag-active');
      }
    };
    
    const handleDrop = (e: DragEvent) => {
      console.log('原生drop事件触发');
      e.preventDefault();
      e.stopPropagation();
      
      // 直接从事件中获取文件
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        const validTypes = ['.mp3', '.wav', '.m4a', '.ogg'];
        const isAudioFile = file.type.startsWith('audio/') || 
                           validTypes.some(ext => file.name.toLowerCase().endsWith(ext));
        
        if (isAudioFile) {
          console.log('原生事件处理 - 检测到音频文件', file.name);
          processFile(file);
        }
      }
      
      // 移除拖放状态
      element.removeAttribute('data-drag-active');
    };
    
    // 添加原生事件监听
    element.addEventListener('dragover', handleDragOver, false);
    element.addEventListener('dragleave', handleDragLeave, false);
    element.addEventListener('drop', handleDrop, false);
    
    return () => {
      element.removeEventListener('dragover', handleDragOver, false);
      element.removeEventListener('dragleave', handleDragLeave, false);
      element.removeEventListener('drop', handleDrop, false);
    };
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    maxFiles: 1,
    noClick: false,
    preventDropOnDocument: true,
  })

  console.log('拖放区域活动状态：', isDragActive)

  return (
    <div
      {...getRootProps()}
      ref={dropzoneRef}
      data-dropzone="true"
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? '放开文件进行上传...'
          : '将音频文件拖放到此处，或点击选择'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        支持的格式: MP3, WAV, M4A, OGG
      </p>
    </div>
  )
} 