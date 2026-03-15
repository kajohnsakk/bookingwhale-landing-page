import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { translations } from "../../stores/language";
import type { Lang } from "../../i18n/utils";

type TranslationKey = keyof typeof translations.en;

const notifications: {
  icon: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  position: "top-left" | "top-right" | "bottom-right" | "bottom-left";
}[] = [
  {
    icon: "/icons/calendar.gif",
    titleKey: "heroNotif1Title",
    subtitleKey: "heroNotif1Subtitle",
    position: "top-left",
  },
  {
    icon: "/icons/check.gif",
    titleKey: "heroNotif2Title",
    subtitleKey: "heroNotif2Subtitle",
    position: "bottom-right",
  },
  {
    icon: "/icons/customers.gif",
    titleKey: "heroNotif3Title",
    subtitleKey: "heroNotif3Subtitle",
    position: "top-right",
  },
  {
    icon: "/icons/notification.gif",
    titleKey: "heroNotif4Title",
    subtitleKey: "heroNotif4Subtitle",
    position: "bottom-left",
  },
];

const positionClasses = {
  "top-left": "-top-2 -left-2 sm:-top-4 sm:-left-6 md:-left-4 lg:-left-8",
  "top-right": "top-8 -right-1 sm:top-6 sm:-right-4 md:-right-2 lg:-right-6",
  "bottom-right": "bottom-16 -right-1 sm:bottom-20 sm:-right-4 md:-right-2 lg:-right-8",
  "bottom-left": "bottom-4 -left-2 sm:bottom-8 sm:-left-4 md:-left-2 lg:-left-6",
};

export default function HeroNotifications({ lang = "th" }: { lang?: Lang }) {
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const [cycle, setCycle] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const showNotifications = useCallback((startDelay: number) => {
    notifications.forEach((_, i) => {
      const id = setTimeout(() => {
        setVisibleSet((prev) => new Set(prev).add(i));
      }, startDelay + i * 900);
      timersRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    showNotifications(1200);

    const cycleInterval = setInterval(() => {
      notifications.forEach((_, i) => {
        const id = setTimeout(() => {
          setVisibleSet((prev) => {
            const next = new Set(prev);
            next.delete(i);
            return next;
          });
        }, i * 300);
        timersRef.current.push(id);
      });

      const id = setTimeout(() => {
        setCycle((c) => c + 1);
        showNotifications(400);
      }, notifications.length * 300 + 600);
      timersRef.current.push(id);
    }, 10000);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      clearInterval(cycleInterval);
    };
  }, [showNotifications]);

  return (
    <>
      <AnimatePresence mode="sync">
        {notifications.map((notif, i) =>
          visibleSet.has(i) ? (
            <motion.div
              key={`notif-${i}-${cycle}`}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8, transition: { duration: 0.35, ease: "easeIn" } }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
                mass: 0.8,
              }}
              className={`absolute ${positionClasses[notif.position]} z-10 flex items-center gap-2 sm:gap-2.5 bg-white rounded-xl shadow-lg shadow-black/8 px-2.5 py-2 sm:px-3.5 sm:py-2.5 border border-gray-100 max-w-[180px] sm:max-w-[220px]`}
            >
              <img src={notif.icon} alt="" loading="lazy" className="shrink-0 w-6 h-6 sm:w-7 sm:h-7" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-900 truncate">
                  {translations[lang][notif.titleKey]}
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">
                  {translations[lang][notif.subtitleKey]}
                </p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </>
  );
}
