import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import './profile-image-modal.css';

type ProfileImageModalProps = {
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  src: string;
};

const MODAL_TRANSITION_DURATION_MS = 220;

export const ProfileImageModal = ({ alt, isOpen, onClose, src }: ProfileImageModalProps) => {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const imageButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frameId = 0;
    let timeoutId = 0;

    if (isOpen) {
      setIsMounted(true);
      frameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
        imageButtonRef.current?.focus();
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    if (!isMounted) {
      return;
    }

    setIsVisible(false);
    timeoutId = window.setTimeout(() => {
      setIsMounted(false);
    }, MODAL_TRANSITION_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isMounted, isOpen]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isMounted, onClose]);

  const handleDialogClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isMounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={`profile-image-modal${isVisible ? ' profile-image-modal--visible' : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-label="Просмотр фото профиля"
        aria-modal="true"
        className="profile-image-modal__dialog"
        onClick={handleDialogClick}
        role="dialog"
      >
        <button
          aria-label="Закрыть увеличенное фото профиля"
          className="profile-image-modal__image-button"
          onClick={onClose}
          ref={imageButtonRef}
          type="button"
        >
          <img alt={alt} className="profile-image-modal__image" src={src} />
        </button>
      </div>
    </div>,
    document.body,
  );
};
