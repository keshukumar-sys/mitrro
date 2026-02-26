import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const CountUp = ({ end, duration = 2000, suffix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let startTime: number | null = null;

          const animate = (time: number) => {
            if (!startTime) startTime = time;

            const progress = time - startTime;
            const value = Math.min(
              Math.floor((progress / duration) * end),
              end
            );

            setCount(value);

            if (progress < duration) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-5xl font-bold text-primary mb-2">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default CountUp;
