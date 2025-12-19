import { create } from 'zustand';

const useStore = create(set => {
  return {
    tipOpen: false,
    tipsMessage: '',
    setTip: (open: boolean, message: string) => {
      console.log(open, message, '-----');
      return set({ tipOpen: open, tipsMessage: message });
    },
  };
});

export default useStore;