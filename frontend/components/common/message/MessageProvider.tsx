'use client';
import { AnimatePresence, color, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { CheckCircle, Info, XCircle } from 'lucide-react';
import { MsgEnum } from '@/enums/message-enum';
import ColorConstants from '@/constants/ColorConstants';
import useMessageStore from './message';


const getIcon = (type: string) => {
  switch (type) {
    case MsgEnum.SUCCESS:
      return <CheckCircle className="w-5 h-5 mr-2" style={{color: ColorConstants.green}}/>;
    case MsgEnum.ERROR:
      return <XCircle className="w-5 h-5 mr-2" style={{color: ColorConstants.red}} />;
    case MsgEnum.INFO:
    default:
      return <Info className="w-5 h-5 mr-2" style={{color: ColorConstants.secondaryColor}} />;
  }
};

const MessageProvider = () => {
  const messages = useMessageStore((state) => state.messages);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-[130px] right-[30px] z-[9999] flex flex-col gap-3 h-[40px]" style={{fontSize: '14px'}}>
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={`text-white px-4 py-2 rounded-lg flex items-center bg-white text-black shadow-lg`}
          >
            {getIcon(msg.type)}
            <span style={{color: ColorConstants.black}}>{msg.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.getElementById('__message__') as HTMLElement
  );
};

export default MessageProvider;
