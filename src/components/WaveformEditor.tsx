'use client'

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions'
import { useAudioStore } from '@/store/audioStore'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline'
import '@/app/WaveformEditor.css'
import type { Region } from 'wavesurfer.js/dist/plugins/regions'
import type { Dictionary } from '@/i18n/types'

interface WaveformEditorProps {
  dictionary: Dictionary;
}

export default function WaveformEditor({ dictionary }: WaveformEditorProps) {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const regionsPluginRef = useRef<RegionsPlugin | null>(null)
  const currentPartRef = useRef<number>(0)  // 添加一个 ref 来跟踪当前编辑的部分
  const [duration, setDuration] = useState('00:00')
  const [selectedSegment, setSelectedSegment] = useState<Region | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveFormat, setSaveFormat] = useState<'mp3' | 'wav'>('mp3')
  const [progressPosition, setProgressPosition] = useState(0)
  const [regionStartPosition, setRegionStartPosition] = useState(0)
  const [regionEndPosition, setRegionEndPosition] = useState(0)
  
  const audioFile = useAudioStore((state) => state.audioFile)
  const isPlaying = useAudioStore((state) => state.isPlaying)
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying)
  const setSelectedSegmentStore = useAudioStore((state) => state.setSelectedSegment)
  const clearAudioFile = useAudioStore((state) => state.clearAudioFile)

  // 添加进度位置日志
  useEffect(() => {
    console.log('Progress position updated:', progressPosition + '%')
  }, [progressPosition])

  // 初始化 WaveSurfer
  useEffect(() => {
    if (waveformRef.current && audioFile) {
      const regions = RegionsPlugin.create()
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: 'rgba(129, 140, 248, 0.8)',
        cursorColor: '#1E293B',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 200,
        barGap: 3,
        plugins: [regions]
      })

      wavesurferRef.current = wavesurfer
      regionsPluginRef.current = regions

      // 更新区域位置和时间显示
      const updateRegionPositions = (region: Region) => {
        const duration = wavesurfer.getDuration()
        if (!duration) {
          console.warn('Duration is not available yet')
          return
        }

        // 更新选中片段状态
        setSelectedSegment(region)
        setSelectedSegmentStore({
          id: region.id,
          name: `segment ${Math.floor(region.start)}-${Math.floor(region.end)}`,
          startTime: region.start,
          endTime: region.end,
          duration: region.end - region.start
        })
        
        // 更新区域位置
        const startPos = (region.start / duration) * 100
        const endPos = (region.end / duration) * 100
        
        setRegionStartPosition(startPos)
        setRegionEndPosition(endPos)

        // 检查当前播放位置是否在区域内，如果不在则调整到最近的边界
        const currentTime = wavesurfer.getCurrentTime()
        if (currentTime < region.start || currentTime > region.end) {
          // 计算到开始和结束位置的距离
          const distanceToStart = Math.abs(currentTime - region.start)
          const distanceToEnd = Math.abs(currentTime - region.end)
          
          // 移动到最近的边界
          const newTime = distanceToStart < distanceToEnd ? region.start : region.end
          wavesurfer.setTime(newTime)
          
          // 更新进度气泡位置和时间显示
          const newProgress = (newTime / duration) * 100
          setProgressPosition(newProgress)
        }
      }

      // 添加事件监听器
      wavesurfer.on('ready', () => {
        const duration = wavesurfer.getDuration()
        setDuration(formatTime(duration))
        console.log('Wavesurfer ready, duration:', duration)
        
        // 清除之前的区域
        regions.clearRegions()
        
        // 创建初始区域
        const region = regions.addRegion({
          id: 'selection',
          start: 0,
          end: duration,
          color: 'rgba(79, 70, 229, 0.2)',
          drag: true,
          resize: true,
          minLength: 0.1,
          maxLength: duration
        })

        // 确保在区域创建后更新位置
        if (region) {
          updateRegionPositions(region)
        }
      })

      wavesurfer.on('audioprocess', () => {
        const currentTime = wavesurfer.getCurrentTime()
        const duration = wavesurfer.getDuration()
        // 更新进度位置
        const progress = (currentTime / duration) * 100
        console.log('Audio process - Current Time:', currentTime, 'Progress:', progress + '%')
        setProgressPosition(progress)
      })

      // 添加点击事件监听
      wavesurfer.on('click', (relativeX: number) => {
        const duration = wavesurfer.getDuration()
        const clickTime = relativeX * duration
        const progress = (clickTime / duration) * 100
        console.log('Click event - RelativeX:', relativeX, 'Click Time:', clickTime, 'Progress:', progress + '%')
        setProgressPosition(progress)
      })

      // 监听区域更新事件
      regions.on('region-update', (region: Region) => {
        updateRegionPositions(region)
      })

      regions.on('region-updated', (region: Region) => {
        updateRegionPositions(region)
      })

      regions.on('region-created', (region: Region) => {
        updateRegionPositions(region)
      })

      // 加载音频文件
      const audioUrl = URL.createObjectURL(audioFile)
      wavesurfer.load(audioUrl)

      return () => {
        URL.revokeObjectURL(audioUrl)
        regions.destroy()
        wavesurfer.destroy()
      }
    }
  }, [audioFile, setSelectedSegmentStore])

  // 阻止拖放到页面时浏览器默认行为 - 使用更简单的防御策略
  useEffect(() => {
    // 全局拖放防御
    const handleGlobalDrop = (e: DragEvent) => {
      // 放宽上传区域的判断条件
      const target = e.target as HTMLElement;
      const isInUploadArea = Boolean(
        target.closest('[data-dropzone]') || 
        target.closest('.upload-area') ||
        document.querySelector('[data-dropzone]')?.contains(target) ||
        document.querySelector('.upload-area')?.contains(target)
      );
      
      // 打印更详细的信息用于调试
      console.log('全局drop事件:', {
        target: target.tagName, 
        inUploadArea: isInUploadArea,
        hasDropzoneParent: Boolean(target.closest('[data-dropzone]')),
        path: e.composedPath().map(el => (el as HTMLElement).tagName || el.toString()).join(' > ')
      });
      
      // 阻止默认行为（浏览器会自动打开文件）
      e.preventDefault();
      
      // 重要：无论在哪里都不阻止事件冒泡
      // 让事件自然传播到上传组件
      // 不再使用: if (!isInUploadArea) { e.stopPropagation(); }
    };
    
    // 处理拖动过程中的事件
    const handleGlobalDragOver = (e: DragEvent) => {
      // 阻止默认行为（显示"+"图标）
      e.preventDefault();
      
      // 无论在哪里都不阻止事件冒泡
      // 让事件自然传播到上传组件
    };
    
    // 在document级别监听，而不是window级别
    document.addEventListener('drop', handleGlobalDrop, true);
    document.addEventListener('dragover', handleGlobalDragOver, true);
    
    // 简单的页面级防御 - 只阻止默认行为，不阻止冒泡
    document.ondragover = (e) => { 
      e.preventDefault(); 
      return false;
    };
    
    document.ondrop = (e) => {
      e.preventDefault();
      return false;
    };
    
    return () => {
      document.removeEventListener('drop', handleGlobalDrop, true);
      document.removeEventListener('dragover', handleGlobalDragOver, true);
      document.ondragover = null;
      document.ondrop = null;
    };
  }, []);

  // 播放/暂停控制
  useEffect(() => {
    if (wavesurferRef.current && selectedSegment) {
      const wavesurfer = wavesurferRef.current

      if (isPlaying) {
        // 如果当前播放位置不在选中区域内，则从区域开始位置播放
        const currentTime = wavesurfer.getCurrentTime()
        if (currentTime < selectedSegment.start || currentTime >= selectedSegment.end) {
          wavesurfer.setTime(selectedSegment.start)
        }
        wavesurfer.play()

        // 监听播放进度，当到达区域结束位置时停止
        const handleAudioprocess = () => {
          const currentTime = wavesurfer.getCurrentTime()
          if (currentTime >= selectedSegment.end) {
            wavesurfer.pause()
            wavesurfer.setTime(selectedSegment.start)
            setIsPlaying(false)
          }
        }

        wavesurfer.on('audioprocess', handleAudioprocess)
        return () => {
          wavesurfer.un('audioprocess', handleAudioprocess)
        }
      } else {
        wavesurfer.pause()
      }
    }
  }, [isPlaying, selectedSegment, setIsPlaying])

  const togglePlayPause = () => {
    if (!selectedSegment) return
    setIsPlaying(!isPlaying)
  }

  const handleSave = async () => {
    if (!selectedSegment || !wavesurferRef.current || !audioFile) return

    setIsSaving(true)
    try {
      const wavesurfer = wavesurferRef.current
      const startTime = selectedSegment.start
      const endTime = selectedSegment.end
      const duration = endTime - startTime

      // 创建音频上下文
      const audioContext = new AudioContext()
      const audioBuffer = await wavesurfer.getDecodedData()
      
      if (!audioBuffer) {
        throw new Error('Failed to decode audio data')
      }

      // 计算开始和结束的采样点
      const startSample = Math.floor(startTime * audioBuffer.sampleRate)
      const endSample = Math.floor(endTime * audioBuffer.sampleRate)
      
      // 创建新的音频缓冲区
      const newBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        endSample - startSample,
        audioBuffer.sampleRate
      )
      
      // 复制选中的音频数据
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel)
        const newChannelData = newBuffer.getChannelData(channel)
        for (let i = 0; i < endSample - startSample; i++) {
          newChannelData[i] = channelData[startSample + i]
        }
      }

      // 创建音频源
      const source = audioContext.createBufferSource()
      source.buffer = newBuffer

      // 创建媒体流
      const mediaStreamDestination = audioContext.createMediaStreamDestination()
      source.connect(mediaStreamDestination)

      // 创建 MediaRecorder
      const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream)
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: `audio/${saveFormat}` })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `audio-segment.${saveFormat}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setIsSaving(false)
      }

      // 开始录制
      mediaRecorder.start()
      source.start()

      // 设置停止时间
      setTimeout(() => {
        source.stop()
        mediaRecorder.stop()
      }, duration * 1000)
    } catch (error) {
      console.error('Error saving audio segment:', error)
      setIsSaving(false)
    }
  }

  // 格式化时间为 HH:mm:ss
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // 解析时间字符串为秒数
  const parseTimeString = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }

  // 处理键盘导航
  const handleTimeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const selectionStart = input.selectionStart || 0

    // 确定当前选中的部分（时/分/秒）
    let currentPart: number
    if (selectionStart >= 6) {
      currentPart = 2 // seconds
    } else if (selectionStart >= 3) {
      currentPart = 1 // minutes
    } else {
      currentPart = 0 // hours
    }

    // 更新当前部分的引用
    currentPartRef.current = currentPart

    // 获取当前部分的起始位置（考虑冒号）
    const partStartPos = currentPartRef.current === 0 ? 0 : currentPartRef.current === 1 ? 3 : 6

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        if (currentPartRef.current > 0) {
          currentPartRef.current -= 1
          const newPos = currentPartRef.current === 0 ? 0 : 3
          input.setSelectionRange(newPos, newPos + 2)
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (currentPartRef.current < 2) {
          currentPartRef.current += 1
          const newPos = currentPartRef.current === 1 ? 3 : 6
          input.setSelectionRange(newPos, newPos + 2)
        }
        break
      case 'Tab':
        e.preventDefault()
        currentPartRef.current = e.shiftKey ? 
          (currentPartRef.current === 0 ? 2 : currentPartRef.current - 1) : 
          (currentPartRef.current === 2 ? 0 : currentPartRef.current + 1)
        const newPos = currentPartRef.current === 0 ? 0 : currentPartRef.current === 1 ? 3 : 6
        input.setSelectionRange(newPos, newPos + 2)
        break
      case 'Backspace':
      case 'Delete':
        e.preventDefault()
        const newValue = input.value.slice(0, partStartPos) + '00' + input.value.slice(partStartPos + 2)
        const type = input.placeholder === '00:00:00' ? 'start' : 'end'
        handleTimeInput(type, newValue)
        input.setSelectionRange(partStartPos, partStartPos + 2)
        break
    }
  }

  // 处理时间输入
  const handleTimeInput = (type: 'start' | 'end', value: string) => {
    console.log('处理时间输入:', { type, value })
    
    if (!wavesurferRef.current || !regionsPluginRef.current) return
    
    const duration = wavesurferRef.current.getDuration()
    const region = regionsPluginRef.current.getRegions()[0]
    if (!region) return

    // 验证时间格式
    if (!/^\d{2}:\d{2}:\d{2}$/.test(value)) {
      console.log('时间格式无效')
      return
    }

    const timeInSeconds = parseTimeString(value)
    console.log('解析时间:', { timeInSeconds })

    // 确保时间在有效范围内
    if (type === 'start') {
      if (timeInSeconds >= 0 && timeInSeconds < region.end) {
        updateRegion(region.id, timeInSeconds, region.end)
      } else {
        console.log('开始时间超出范围')
      }
    } else {
      if (timeInSeconds > region.start && timeInSeconds <= duration) {
        updateRegion(region.id, region.start, timeInSeconds)
      } else {
        console.log('结束时间超出范围')
      }
    }
  }

  // 更新区域
  const updateRegion = (id: string, start: number, end: number) => {
    if (!wavesurferRef.current || !regionsPluginRef.current) return
    
    const duration = wavesurferRef.current.getDuration()
    
    // 更新波形图上的分割线位置
    regionsPluginRef.current.clearRegions()
    const region = regionsPluginRef.current.addRegion({
      id,
      start,
      end,
      color: 'rgba(79, 70, 229, 0.2)',
      drag: true,
      resize: true,
      minLength: 0.1,
      maxLength: duration
    })
    
    // 更新气泡位置和选中片段
    setRegionStartPosition((start / duration) * 100)
    setRegionEndPosition((end / duration) * 100)
    setSelectedSegment(region)
  }

  // 处理时间输入框获得焦点
  const handleTimeFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const selectionStart = e.target.selectionStart || 0
    
    // 根据光标位置确定当前部分
    if (selectionStart >= 6) {
      currentPartRef.current = 2 // seconds
      e.target.setSelectionRange(6, 8)
    } else if (selectionStart >= 3) {
      currentPartRef.current = 1 // minutes
      e.target.setSelectionRange(3, 5)
    } else {
      currentPartRef.current = 0 // hours
      e.target.setSelectionRange(0, 2)
    }
  }

  // 微调时间
  const adjustTime = (type: 'start' | 'end', delta: number) => {
    if (!wavesurferRef.current || !regionsPluginRef.current) return
    
    const region = regionsPluginRef.current.getRegions()[0]
    if (!region) return

    const currentTime = type === 'start' ? region.start : region.end
    const newTime = Math.max(0, Math.min(wavesurferRef.current.getDuration(), currentTime + delta))
    
    if (type === 'start') {
      if (newTime < region.end) {
        updateRegion(region.id, newTime, region.end)
      }
    } else {
      if (newTime > region.start) {
        updateRegion(region.id, region.start, newTime)
      }
    }
  }

  return (
    <div className="waveform-editor fade-in">
      {/* 波形编辑器区域 - 仅在有文件时显示 */}
      {audioFile ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={clearAudioFile}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200"
              >
                {dictionary.upload.newFile}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={saveFormat}
                onChange={(e) => setSaveFormat(e.target.value as 'mp3' | 'wav')}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
              >
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
              </select>
              <button
                onClick={handleSave}
                disabled={!selectedSegment || isSaving}
                className="save-button"
              >
                {isSaving ? dictionary.editor.saving : dictionary.editor.save}
              </button>
              <button
                onClick={togglePlayPause}
                className="play-control-button"
              >
                {isPlaying ? (
                  <>
                    <PauseIcon className="w-5 h-5" />
                    {dictionary.editor.pause}
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5" />
                    {dictionary.editor.play}
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="waveform-container">
            <div ref={waveformRef} className="w-full" />
            {/* 播放进度时间气泡 */}
            <div 
              className="progress-bubble"
              style={{ '--progress-left': `${progressPosition}%` } as React.CSSProperties}
            >
              <div className="progress-bubble-content">
                {formatTime(wavesurferRef.current?.getCurrentTime() || 0)}
              </div>
              <div className="progress-bubble-arrow"></div>
            </div>
            
            {/* 开始时间气泡 */}
            <div 
              className="time-bubble"
              style={{ left: `${regionStartPosition}%` }}
            >
              <div className="time-bubble-content">
                {selectedSegment ? formatTime(selectedSegment.start) : '00:00:00'}
              </div>
              <div className="time-bubble-arrow"></div>
            </div>
            
            {/* 结束时间气泡 */}
            <div 
              className="time-bubble"
              style={{ left: `${regionEndPosition}%` }}
            >
              <div className="time-bubble-content">
                {selectedSegment ? formatTime(selectedSegment.end) : formatTime(Number(duration))}
              </div>
              <div className="time-bubble-arrow"></div>
            </div>

            {/* 总时长显示 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2">
              <span className="text-sm text-gray-500">{duration}</span>
            </div>
          </div>

          {/* 时间输入控制 */}
          <div className="time-control">
            <div className="time-input-group">
              <input
                type="text"
                value={selectedSegment ? formatTime(selectedSegment.start) : '00:00:00'}
                onChange={(e) => handleTimeInput('start', e.target.value)}
                onKeyDown={handleTimeKeyDown}
                onFocus={handleTimeFocus}
                placeholder="00:00:00"
                className="time-input"
              />
              <div className="time-adjust-buttons">
                <button
                  className="time-adjust-button"
                  onClick={() => adjustTime('start', 1)}
                >
                  +
                </button>
                <button
                  className="time-adjust-button"
                  onClick={() => adjustTime('start', -1)}
                >
                  -
                </button>
              </div>
            </div>
            <div className="time-input-group">
              <input
                type="text"
                value={selectedSegment ? formatTime(selectedSegment.end) : formatTime(Number(duration))}
                onChange={(e) => handleTimeInput('end', e.target.value)}
                onKeyDown={handleTimeKeyDown}
                onFocus={handleTimeFocus}
                placeholder="00:00:00"
                className="time-input"
              />
              <div className="time-adjust-buttons">
                <button
                  className="time-adjust-button"
                  onClick={() => adjustTime('end', 1)}
                >
                  +
                </button>
                <button
                  className="time-adjust-button"
                  onClick={() => adjustTime('end', -1)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="upload-area" 
          data-dropzone="true"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('WaveformEditor上传区域: dragover事件');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('WaveformEditor上传区域: drop事件');
            
            // 从拖放事件中获取文件
            const files = e.dataTransfer?.files;
            if (files && files.length > 0) {
              const file = files[0];
              // 检查是否为音频文件
              if (file.type.startsWith('audio/')) {
                console.log('WaveformEditor接收到音频文件:', file.name);
                useAudioStore.getState().setAudioFile(file);
              } else {
                console.log('不是有效的音频文件:', file.type);
              }
            }
          }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{dictionary.upload.title}</h2>
          <p className="mb-4 text-gray-600">{dictionary.upload.dropzone}</p>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                useAudioStore.getState().setAudioFile(file)
              }
            }}
          />
          <button
            onClick={() => document.getElementById('audio-upload')?.click()}
            className="play-control-button"
          >
            {dictionary.upload.button}
          </button>
        </div>
      )}
    </div>
  )
}