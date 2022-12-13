import create from 'zustand'
import { devtools } from 'zustand/middleware';

const initialState = {
  username : '',
  searchUsername:'',
  author:'',
  is3D : true,
  commitCount : '0',
  location : '',
  temperature :'',
  weather : '',
  postCount : 0,
  totalCount : '0',
  showMessageModal : false,
  showMessageBoxModal : false,
  showCreatePostModal : false,
  showPostDetailModal : false,
  posts : [],
  post : {},
  tags: [],
  relativeTime: new Date(),
};

const useStore = create(devtools((set) => ({
  ...initialState,
  setUsername : (input:any) => set({username : input}),
  setSearchUsername : (input:any) => set({searchUsername : input}),
  setAuthor : (input:any) => set({author : input}),
  changeView: () => set((state:any) => ({ is3D: !state.is3D })),
  setCommitCount : (input:any) => set({commitCount : input}),
  setLocation : (input:any) => set({location : input}),
  setTemperature : (input:any) => set({temperature : input}),
  setWeather : (input:any) => set({weather : input}),
  setPostCount : (input:any) => set({postCount : input}),
  setTotalCount : (input:any) => set({totalCount : input}),
  openMessageModal : () => set(() => ({ showMessageModal: true })),
  closeMessageModal : () => set(() => ({ showMessageModal: false })),
  openMessageBoxModal : () => set(() => ({ showMessageBoxModal: true })),
  closeMessageBoxModal : () => set(() => ({ showMessageBoxModal: false })),
  openCreatePostModal : () => set(() => ({ showCreatePostModal: true })),
  closeCreatePostModal : () => set(() => ({ showCreatePostModal: false })),
  openPostDetailModal : () => set(() => ({ showPostDetailModal: true })),
  closePostDetailModal : () => set(() => ({ showPostDetailModal: false })),
  setPosts : (input:any) => set({posts : input}),
  setPost : (input:any) => set({post : input}),
  setTags : (input:any) => set({tags : input}),
  setRelativeTime : (input:any) => set({relativeTime : input}),
})))
  

export default useStore