import { useEffect, useRef, useState } from 'react';
import ProfilePicture from '../../../assets/images/profile_picture.png';
import { ProfileImageModal } from './ProfileImageModal';
import './information-about-me.css';

const PROFILE_PICTURE_ALT = 'Портрет Екатерины Постой';

export const InformationAboutMe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageTriggerRef = useRef<HTMLButtonElement>(null);
  const wasModalOpenRef = useRef(false);

  useEffect(() => {
    if (wasModalOpenRef.current && !isModalOpen) {
      imageTriggerRef.current?.focus();
    }

    wasModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="information-about-me">
      <h2 className="text-cell text-block__xl">
        <span className="title-part1">
          Екатерина <br />
          Постой – <br />
          UX/UI Designer &nbsp;
        </span>
        <span className="title-part2 text-color-purple">
          with <br />
          an artistic background
        </span>
      </h2>
      <button
        aria-label="Открыть фото профиля Екатерины Постой"
        className="text-cell img-cell"
        onClick={handleOpenModal}
        ref={imageTriggerRef}
        type="button"
      >
        <img src={ProfilePicture} alt={PROFILE_PICTURE_ALT} />
      </button>
      <h2 className="text-cell text-block__l">
        Разрабатываю лендинги, корпоративные <br />
        сайты, а также айдентику
      </h2>
      <a
        className="bottom text-cell text-block__s"
        href="https://t.me/Kat_postoi"
        target="_blank"
        rel="noreferrer noopener"
      >
        Telegram @Kat_postoi
      </a>
      <a
        className="bottom text-cell text-block__s"
        href="https://www.behance.net/dc97db2b"
        target="_blank"
        rel="noreferrer noopener"
      >
        Behance @Ekaterina_Postoi
      </a>
      <h2 className="text-cell text-block__s">katpostoy@gmail.com</h2>
      <h2 className="text-cell text-block__s">2018-2026</h2>
      <ProfileImageModal
        alt={PROFILE_PICTURE_ALT}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        src={ProfilePicture}
      />
    </div>
  );
};
