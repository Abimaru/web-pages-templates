import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  alt?: boolean;
  center?: boolean;
  className?: string;
  labelledById?: string;
}

/** Envoltura de sección con reveal, ancho máximo y encabezado consistente. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  alt = false,
  center = false,
  className = "",
}: SectionProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`py-16 sm:py-20 ${alt ? "border-y border-line bg-white/[0.015]" : ""} ${className}`}
    >
      <div
        ref={ref}
        className={`mx-auto w-full max-w-6xl px-5 sm:px-6 reveal ${visible ? "is-visible" : ""} ${
          center ? "text-center" : ""
        }`}
      >
        {eyebrow && <p className="kicker text-cyan mb-3">{eyebrow}</p>}
        {title && (
          <h2
            id={headingId}
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance"
          >
            {title}
          </h2>
        )}
        {intro && (
          <p
            className={`mt-3 text-muted text-[0.98rem] leading-relaxed ${
              center ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
