import React from 'react';
import './GlassIcons.css';

export interface GlassIconItem {
  icon: React.ReactNode;
  color: string;
  label: string;
  customClass?: string;
  href?: string;
  onClick?: () => void;
}

export interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
  github: 'linear-gradient(135deg, #24292e 0%, #161b22 100%)',
  whatsapp: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  linkedin: 'linear-gradient(135deg, #0077B5 0%, #005582 100%)',
  mail: 'linear-gradient(135deg, #EA4335 0%, #C5221F 100%)',
};

export const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => {
        const content = (
          <>
            <span className="icon-btn__back" style={getBackgroundStyle(item.color)} />
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
          </>
        );

        if (item.href) {
          return (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className={`icon-btn ${item.customClass || ''}`}
              aria-label={item.label}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={index}
            className={`icon-btn ${item.customClass || ''}`}
            aria-label={item.label}
            type="button"
            onClick={item.onClick}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default GlassIcons;
