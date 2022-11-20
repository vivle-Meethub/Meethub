import create from 'zustand'
import { devtools } from 'zustand/middleware';

const initialState = {
  is3D: true,
  commitCount : '',
  location : '',
  temperature:'',
  weather: '',
};

const useStore = create(devtools((set) => ({
  ...initialState,
  changeView: () => set((state:any) => ({ is3D: !state.is3D })),
  setCommitCount : (input:any) => set({commitCount : input}),
  setLocation : (input:any) => set({location : input}),
  setTemperature : (input:any) => set({temperature : input}),
  setWeather : (input:any) => set({weather : input}),
})))
  

export default useStore