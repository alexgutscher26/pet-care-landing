"use client";

import { AnimatePresence, motion } from "motion/react";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { 
      scale: 0.8,
      opacity: 0,
      x: -20,
    },
    animate: { 
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 125,
        damping: 20,
        mass: 1,
      }
    },
    exit: { 
      scale: 0.8,
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
  loop?: boolean;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, loop = true, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (index < childrenArray.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else if (loop) {
          // Add a slightly longer delay before resetting
          setTimeout(() => setIndex(0), 500);
        }
      }, delay);

      return () => clearTimeout(timeout);
    }, [index, delay, childrenArray.length, loop]);

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1);
      return result;
    }, [index, childrenArray]);

    return (
      <div
        className={`flex flex-col items-center gap-3 ${className}`}
        {...props}
      >
        <AnimatePresence mode="popLayout">
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";
