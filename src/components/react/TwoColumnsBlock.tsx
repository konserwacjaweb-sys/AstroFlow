interface TwoColumnsBlockProps {
  subtitle?: string;
  title: string;
  headingTag?: 'h2' | 'h3';
  text?: string;
  buttonLabel?: string;
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  buttonClassName?: string;
}

export default function TwoColumnsBlock({
  subtitle,
  title,
  headingTag = 'h2',
  text,
  buttonLabel,
  className = '',
  subtitleClassName = '',
  titleClassName = '',
  textClassName = '',
  buttonClassName = ''
}: TwoColumnsBlockProps) {
  const HeadingTag = headingTag;

  return (
    <div className={`relative z-10 flex h-full flex-col items-start gap-4 ${className}`}>
      {subtitle ? <span className={subtitleClassName}>{subtitle}</span> : null}
      <HeadingTag className={titleClassName}>{title}</HeadingTag>
      {text ? <p className={textClassName}>{text}</p> : null}
      {buttonLabel ? (
        <button
          type="button"
          className={`inline-flex items-center justify-center px-6 py-3 font-normal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 ${buttonClassName}`}
        >
          {buttonLabel}
        </button>
      ) : null}
    </div>
  );
}
