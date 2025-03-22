import { create } from 'zustand'

interface AudioSegment {
  id: string
  name: string
  startTime: number
  endTime: number
  duration: number
}

interface AudioState {
  audioFile: File | null
  selectedSegment: AudioSegment | null
  isPlaying: boolean
  setAudioFile: (file: File) => void
  setSelectedSegment: (segment: AudioSegment | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  clearAudioFile: () => void
}

export const useAudioStore = create<AudioState>((set) => ({
  audioFile: null,
  selectedSegment: null,
  isPlaying: false,
  setAudioFile: (file) => set({ audioFile: file, selectedSegment: null }),
  setSelectedSegment: (segment) => set({ selectedSegment: segment }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  clearAudioFile: () => set({ audioFile: null, selectedSegment: null, isPlaying: false })
})) 