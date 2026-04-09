import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { translations } from "../stores/language";
import type { Lang } from "../i18n/utils";

const SUPPORT_TOOLTIP_MAP: Record<string, string> = {
  pricingFreeF5: "supportDetailFree",
  pricingProF5: "supportDetailPro",
  pricingEnterpriseF4: "supportDetailEnterpriseDedicated",
  pricingEnterpriseF5: "supportDetailEnterpriseSLA",
};

function FeatureTooltip({
  tooltipKey,
  lang,
}: {
  tooltipKey: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Info
        size={14}
        className="text-blue-400 cursor-pointer flex-shrink-0"
        onClick={() => setOpen((v) => !v)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.15 }}
            className="absolute left-6 bottom-0 w-[220px] bg-gray-900 text-white text-xs rounded-lg p-3 z-50 shadow-lg leading-relaxed whitespace-pre-line"
          >
            {(translations[lang] as Record<string, string>)[tooltipKey] ||
              (translations["en"] as Record<string, string>)[tooltipKey]}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

interface Props {
  lang?: Lang;
}

const plans = [
  {
    id: "free",
    nameKey: "pricingFreeName",
    subtitleKey: "pricingFreeSubtitle",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "pricingFreeF1",
      "pricingFreeF2",
      "pricingFreeF3",
      "pricingFreeF4",
      "pricingFreeF5",
    ],
    ctaKey: "pricingStartFree",
    ctaStyle: "btn btn-secondary btn-large w-full",
    everythingIn: null,
  },
  {
    id: "starter",
    nameKey: "pricingStarterName",
    subtitleKey: "pricingStarterSubtitle",
    monthlyPrice: 590,
    annualPrice: 490,
    savePercent: 17,
    saveKey: "pricingSave17",
    features: [
      "pricingStarterF1",
      "pricingStarterF2",
      "pricingStarterF3",
      "pricingStarterF4",
      "pricingStarterF5",
      "pricingStarterF6",
    ],
    ctaKey: "pricingChoosePlan",
    ctaStyle: "btn btn-primary btn-large w-full",
    everythingIn: "pricingFreeName",
  },
  {
    id: "pro",
    nameKey: "pricingProName",
    subtitleKey: "pricingProSubtitle",
    monthlyPrice: 1490,
    annualPrice: 1190,
    savePercent: 20,
    saveKey: "pricingSave20",
    popular: true,
    features: [
      "pricingProF1",
      "pricingProF2",
      "pricingProF3",
      "pricingProF4",
      "pricingProF5",
      "pricingProF6",
    ],
    ctaKey: "pricingChoosePlan",
    ctaStyle: "btn btn-primary btn-large w-full",
    everythingIn: "pricingStarterName",
  },
  {
    id: "enterprise",
    nameKey: "pricingEnterpriseName",
    subtitleKey: "pricingEnterpriseSubtitle",
    monthlyPrice: 4990,
    annualPrice: 3990,
    savePercent: 20,
    saveKey: "pricingSave20",
    features: [
      "pricingEnterpriseF1",
      "pricingEnterpriseF2",
      "pricingEnterpriseF3",
      "pricingEnterpriseF4",
      "pricingEnterpriseF5",
    ],
    ctaKey: "pricingContactUs",
    ctaStyle: "btn btn-secondary btn-large w-full",
    everythingIn: "pricingProName",
  },
];

function t(key: string, lang: Lang = "th"): string {
  return (
    (translations[lang] as Record<string, string>)[key] ||
    (translations["en"] as Record<string, string>)[key] ||
    key
  );
}

function formatPrice(price: number, lang: Lang): string {
  if (price === 0) return t("pricingFreePrice", lang);
  return price.toLocaleString("th-TH");
}

const MAX_FEATURES = Math.max(...plans.map((p) => p.features.length));
const PRO_INDEX = 2;

export default function PricingToggle({ lang = "th" }: Props) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeCard, setActiveCard] = useState(PRO_INDEX);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const inner = container.firstElementChild;
    if (!inner) return;
    const card = inner.children[PRO_INDEX] as HTMLElement;
    if (!card) return;
    container.scrollTo({
      left: card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
      behavior: "instant" as ScrollBehavior,
    });
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const inner = container.firstElementChild;
    if (!inner) return;
    const cards = Array.from(inner.children) as HTMLElement[];
    const center = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveCard(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <div className="flex flex-col items-center gap-2 mb-12">
        <div className="relative inline-flex bg-gray-100 rounded-full p-1 shadow-inner">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 w-[120px] py-3 text-sm font-semibold rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center ${
              !isAnnual ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t("pricingMonthly", lang)}
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 w-[120px] py-3 text-sm font-semibold rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center ${
              isAnnual ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t("pricingAnnual", lang)}
          </button>
          <motion.span
            onClick={() => setIsAnnual(true)}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              scale: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
            }}
            className="absolute -top-3 -right-4 z-20 cursor-pointer bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-green-200"
          >
            -20%
          </motion.span>
          <motion.div
            className="absolute top-1 bottom-1 bg-white rounded-full shadow-md"
            layout
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            style={{
              left: isAnnual ? "50%" : "4px",
              right: isAnnual ? "4px" : "50%",
            }}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className="overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:overflow-visible md:snap-none md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-6 lg:gap-8 items-stretch pt-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="h-full snap-center shrink-0 w-[72vw] md:w-auto md:shrink md:snap-align-none"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`bg-white rounded-2xl p-6 lg:p-8 flex flex-col h-full transition-shadow duration-300 ${
                  plan.popular
                    ? "border-2 border-blue-600 relative shadow-xl shadow-blue-100 xl:scale-105"
                    : "border border-gray-200 hover:shadow-lg hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md shadow-blue-200">
                    {t("pricingMostPopular", lang)}
                  </span>
                )}

                <div className="mb-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 tracking-wide">
                    {t(plan.nameKey, lang)}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {t(plan.subtitleKey, lang)}
                  </p>
                </div>

                <div className="mb-6 text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnnual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {plan.monthlyPrice === 0 ? (
                        <>
                          <span className="text-4xl font-black text-gray-900">
                            {t("pricingFreePrice", lang)}
                          </span>
                          <div
                            className="flex justify-center mt-2 invisible"
                            aria-hidden="true"
                          >
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold">
                              &nbsp;
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-black text-gray-900">
                              ฿
                              {formatPrice(
                                isAnnual ? plan.annualPrice : plan.monthlyPrice,
                                lang,
                              )}
                            </span>
                            <span className="text-sm text-gray-400 font-medium">
                              {t("pricingPerMonth", lang)}
                            </span>
                          </div>
                          <div className="flex justify-center mt-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                              {t("pricingPerDay", lang)} ฿
                              {Math.ceil(
                                (isAnnual
                                  ? plan.annualPrice
                                  : plan.monthlyPrice) / 30,
                              )}
                              {t("pricingPerDayUnit", lang)}
                            </span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <hr className="border-gray-100 mb-6" />

                {plan.everythingIn ? (
                  <p className="text-sm font-semibold text-gray-900 mb-3 whitespace-nowrap">
                    {t("pricingEverythingIn", lang).replace(
                      "{plan}",
                      t(plan.everythingIn, lang),
                    )}
                  </p>
                ) : (
                  <p
                    className="text-sm font-semibold mb-3 invisible"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </p>
                )}

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((featureKey) => (
                    <li
                      key={featureKey}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        {t(featureKey, lang)}
                        {SUPPORT_TOOLTIP_MAP[featureKey] && (
                          <>
                            {" "}
                            <FeatureTooltip
                              tooltipKey={SUPPORT_TOOLTIP_MAP[featureKey]}
                              lang={lang}
                            />
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                  {Array.from({
                    length: MAX_FEATURES - plan.features.length,
                  }).map((_, i) => (
                    <li
                      key={`pad-${i}`}
                      className="flex items-start gap-2.5 text-sm invisible"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span>&nbsp;</span>
                    </li>
                  ))}
                </ul>

                <button className={plan.ctaStyle}>
                  {t(plan.ctaKey, lang)}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {plans.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to plan ${i + 1}`}
            onClick={() => {
              const container = scrollRef.current;
              if (!container) return;
              const inner = container.firstElementChild;
              if (!inner) return;
              const card = inner.children[i] as HTMLElement;
              if (!card) return;
              container.scrollTo({
                left:
                  card.offsetLeft -
                  (container.offsetWidth - card.offsetWidth) / 2,
                behavior: "smooth",
              });
            }}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              activeCard === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-10">
        {t("pricingTrialNote", lang)}
      </p>
    </div>
  );
}
