'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useAudioStore } from '@/store/audioStore'

export default function AudioUploader() {
  const setAudioFile = useAudioStore((state) => state.setAudioFile)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setAudioFile(file)
    }
  }, [setAudioFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    maxFiles: 1
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? '将文件拖放到这里...'
          : '拖放音频文件到这里，或点击选择文件'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        支持的格式：MP3, WAV, M4A, OGG
      </p>
    </div>
  )
} 