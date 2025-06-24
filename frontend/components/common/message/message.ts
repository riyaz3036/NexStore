import { MsgEnum } from '@/enums/message-enum';
import { create } from 'zustand';

interface Message {
  id: number;
  text: string;
  type: MsgEnum;
}

interface MessageStore {
  messages: Message[];
  add: (text: string, type: MsgEnum) => void;
  remove: (id: number) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  add: (text, type) => {
    const id = Date.now();
    set((state) => ({
      messages: [...state.messages, { id, text, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== id),
      }));
    }, 3000);
  },
  remove: (id) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id),
    })),
}));

export const message = {
  open: ({ text, type }: { text: string; type: MsgEnum }) => {
    useMessageStore.getState().add(text, type);
  },
};

export default useMessageStore;
