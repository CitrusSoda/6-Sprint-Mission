import Image from 'next/image';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface DropdownContextProps {
  isOpen: boolean;
  closeDropdown: () => void;
  toggleDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextProps>({
  isOpen: false,
  closeDropdown: () => {},
  toggleDropdown: () => {},
});

interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, closeDropdown, toggleDropdown }}>
      <div className="relative cursor-pointer items-center justify-center rounded-xl border">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownToggle: React.FC<DropdownProps> = ({ children }) => {
  const { toggleDropdown } = useContext(DropdownContext);

  return (
    <div onClick={() => toggleDropdown()} className="flex h-full">
      <Image
        src="/ic_sort.png"
        alt="sort icon"
        className="sm:hidden"
        width={42}
        height={42}
      />
      <div className="hidden w-32 items-center justify-between px-5 sm:flex">
        {children}
        <Image
          src="/ic_arrow_down.png"
          alt="down arrow icon"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export const DropdownMenu: React.FC<DropdownProps> = ({ children }) => {
  const { isOpen, closeDropdown } = useContext(DropdownContext);

  // 화면 클릭 시 드롭다운 닫기를 위한 ref
  const dropDownRef = useRef<HTMLDivElement>(null);

  // dropdown 밖 영역 클릭 시 닫기
  useEffect(() => {
    // ! e의 타입을 MouseEvent, React.MouseEvent 등 다양하게 줘보았으나 해결하지 못하여
    // ! unknwon으로 설정하고 instanceof로 MouseEvent일 때 접근가능하도록 하였습니다.
    const clickOutside = (e: unknown) => {
      if (
        dropDownRef.current !== null &&
        e instanceof MouseEvent &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', clickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen, closeDropdown]);

  return isOpen ? (
    <div
      className="absolute right-0 top-12 rounded-xl border bg-white shadow-lg"
      ref={dropDownRef}
    >
      {children}
    </div>
  ) : null;
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
}) => {
  const { toggleDropdown } = useContext(DropdownContext);

  return (
    <button
      className="flex h-[42px] w-32 items-center justify-center"
      onClick={() => {
        onClick();
        toggleDropdown();
      }}
    >
      <hr />
      {children}
    </button>
  );
};
