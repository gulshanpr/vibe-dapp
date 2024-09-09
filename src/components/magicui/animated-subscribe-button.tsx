"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  pendingText: React.ReactElement | string; // New prop for pending state
}

export const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> = ({
  buttonColor,
  buttonTextColor,
  subscribeStatus,
  initialText,
  changeText,
  pendingText,
}) => {
  const [status, setStatus] = useState<'initial' | 'pending' | 'done'>('initial');
  
  const handleClick = async () => {
    if (status === 'initial') {
      setStatus('pending');
      try {
        await asyncSubscribe(); // Simulate async operation
        setStatus('done');
      } catch (error) {
        console.error('Subscription failed:', error);
        setStatus('initial'); // Optionally handle error and reset state
      }
    }
  };

  const asyncSubscribe = async () => {
    // Simulate an async operation (e.g., API call)
    return new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.button
          className="relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : status === 'pending' ? (
        <motion.button
          className="relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="pending"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {pendingText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
