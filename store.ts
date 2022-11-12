import create from 'zustand'

const useStore = create((set) => ({
    is3D: true,
    changeView: () => set((state:any) => ({ is3D: !state.is3D })),

  }))

export default useStore