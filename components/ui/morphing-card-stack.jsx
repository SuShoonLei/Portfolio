import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Grid3X3, Layers, LayoutList } from "lucide-react";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
};

const SWIPE_THRESHOLD = 50;

/**
 * Morphing stack / grid / list cards (Vite + JSX port; styles: portfolio `.morph-*`).
 * @param {{ id: string, title: string, description: string, icon?: import('react').ReactNode, color?: string }[]} cards
 */
export function MorphingCardStack({
  cards = [],
  className = "",
  defaultLayout = "stack",
  onCardClick,
}) {
  const [layout, setLayout] = useState(defaultLayout);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragMovedRef = useRef(false);

  if (!cards || cards.length === 0) {
    return null;
  }

  const handleDragEnd = (_event, info) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > 12) dragMovedRef.current = true;
    const swipe = Math.abs(offset.x) * velocity.x;

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
    setIsDragging(false);
    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 100);
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length;
      reordered.push({ ...cards[index], stackPosition: i });
    }
    return reordered.reverse();
  };

  const getLayoutStyles = (stackPosition) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        };
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        };
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        };
      default:
        return { top: 0, left: 0, zIndex: 1, rotate: 0 };
    }
  };

  const displayCards =
    layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }));

  return (
    <div className={cn("morph-root", className)}>
      <div className="morph-toggle-bar">
        {Object.keys(layoutIcons).map((mode) => {
          const Icon = layoutIcons[mode];
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setLayout(mode)}
              className={cn("morph-toggle-btn", layout === mode && "morph-toggle-btn--active")}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="morph-toggle-icon" strokeWidth={1.75} />
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className={cn(
            "morph-container",
            layout === "stack" && "morph-container--stack",
            layout === "grid" && "morph-container--grid",
            layout === "list" && "morph-container--list"
          )}
        >
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition);
              const isExpanded = expandedCard === card.id;
              const isTopCard = layout === "stack" && card.stackPosition === 0;

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => {
                    dragMovedRef.current = false;
                    setIsDragging(true);
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging || dragMovedRef.current) return;
                    setExpandedCard(isExpanded ? null : card.id);
                    onCardClick?.(card);
                  }}
                  className={cn(
                    "morph-card",
                    layout === "stack" && "morph-card--stack",
                    layout === "stack" && isTopCard && "morph-card--top",
                    layout === "grid" && "morph-card--grid",
                    layout === "list" && "morph-card--list",
                    isExpanded && "morph-card--expanded"
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  <div className="morph-card-inner">
                    {card.icon ? (
                      <div className="morph-card-icon-wrap">{card.icon}</div>
                    ) : null}
                    <div className="morph-card-text">
                      <h3 className="morph-card-title">{card.title}</h3>
                      <p
                        className={cn(
                          "morph-card-desc",
                          layout === "stack" && "morph-card-desc--stack",
                          layout === "grid" && "morph-card-desc--grid",
                          layout === "list" && "morph-card-desc--list"
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {isTopCard ? (
                    <div className="morph-swipe-hint">Swipe to navigate</div>
                  ) : null}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 ? (
        <div className="morph-dots">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn("morph-dot", index === activeIndex && "morph-dot--active")}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Demo / shadcn-style alias */
export function Component(props) {
  return <MorphingCardStack {...props} />;
}

export default MorphingCardStack;
