import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Halkan ku qor state iyo functions
  count: 0,
  
  increment: () => set(state => ({ count: state.count + 1 })),
  decreament:()=>set(state=>({count:state.count-1})),
  
  reset: () => set({ count: 0 }),
}));

export default useStore

