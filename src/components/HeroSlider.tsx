// src/components/HeroSlider.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export type GallerySlide = {
  image: string;        // e.g. `${process.env.PUBLIC_URL}/images/hero.jpg`
  title: string;
  description?: string;
  alt?: string;
};
// Optional alias if you prefer
export type HeroSlide = GallerySlide;

interface HeroSliderProps {
  slides: GallerySlide[];
  height?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  autoplayResumeDelay?: number;
  respectReducedMotion?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  height,
  autoplay = true,
  autoplayInterval = 3000,
  pauseOnHover = true,
  autoplayResumeDelay = 6000,
  respectReducedMotion = true,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [docHidden, setDocHidden] = useState<boolean>(
    typeof document !== "undefined" ? document.hidden : false
  );
  const [interactionPaused, setInteractionPaused] = useState(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slideHeight = useMemo(
    () =>
      height ??
      ({ xs: 120, sm: 200, md: 260, lg: 260 } as NonNullable<HeroSliderProps["height"]>),
    [height]
  );

  const prefersReducedMotion =
    respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slidesCount = slides?.length ?? 0;

  const goTo = (nextIdx: number) => {
    const el = trackRef.current;
    if (!el || !slidesCount) return;
    const clamped = ((nextIdx % slidesCount) + slidesCount) % slidesCount;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  };

  const scrollByPage = (dir: -1 | 1) => goTo(index + dir);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
    markInteracted();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") {
      markInteracted();
      scrollByPage(-1);
    } else if (e.key === "ArrowRight") {
      markInteracted();
      scrollByPage(1);
    }
  };

  const onMouseEnter = () => pauseOnHover && setHovering(true);
  const onMouseLeave = () => pauseOnHover && setHovering(false);

  const markInteracted = () => {
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    setInteractionPaused(true);
    interactionTimerRef.current = setTimeout(() => {
      setInteractionPaused(false);
    }, autoplayResumeDelay);
  };

  useEffect(() => {
    const handler = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  useEffect(() => {
    if (index > slidesCount - 1) setIndex(0);
  }, [slidesCount, index]);

  useEffect(() => {
    if (!autoplay || prefersReducedMotion || slidesCount <= 1) return;
    if (hovering || docHidden || interactionPaused) return;

    const id = setInterval(() => {
      goTo(index + 1);
    }, Math.max(1500, autoplayInterval));

    return () => clearInterval(id);
  }, [
    autoplay,
    prefersReducedMotion,
    slidesCount,
    hovering,
    docHidden,
    interactionPaused,
    index,
    autoplayInterval,
  ]);

  if (!slidesCount) return null;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        mb: 2,
      }}
    >
      <Box
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Gerichte Galerie"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          display: "flex",
          width: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {slides.map((s, i) => (
          <Box
            key={i}
            aria-label={`${s.title} – Slide ${i + 1} von ${slidesCount}`}
            sx={{
              position: "relative",
              minWidth: "100%",
              flex: "0 0 100%",
              height: slideHeight,
              scrollSnapAlign: "center",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={s.image}
              alt={s.alt ?? s.title}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                display: "block",
              }}
              onLoad={markInteracted}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            <Stack
              spacing={0.5}
              sx={{
                position: "absolute",
                left: { xs: 12, sm: 20 },
                right: { xs: 12, sm: 20 },
                bottom: { xs: 12, sm: 20 },
                color: "common.white",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                zIndex: 2,
              }}
            >
              <Typography variant="h3" fontWeight={800} lineHeight={1.2}>
                {s.title}
              </Typography>
              {s.description && (
                <Typography variant="h5" fontWeight={500} sx={{ opacity: 0.95 }}>
                  {s.description}
                </Typography>
              )}
            </Stack>
          </Box>
        ))}
      </Box>

      {slidesCount > 1 && (
        <>
          <IconButton
            aria-label="Vorheriges Bild"
            onClick={() => {
              markInteracted();
              scrollByPage(-1);
            }}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.5)",
              color: "common.white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Nächstes Bild"
            onClick={() => {
              markInteracted();
              scrollByPage(1);
            }}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.5)",
              color: "common.white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      )}

      {slidesCount > 1 && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ position: "absolute", left: 0, right: 0, bottom: 8 }}
        >
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                markInteracted();
                goTo(i);
              }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: i === index ? "common.white" : "rgba(255,255,255,0.6)",
                transition: "all .2s",
                cursor: "pointer",
                outline: "none",
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default HeroSlider;
