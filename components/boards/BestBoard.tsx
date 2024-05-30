import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Image from 'next/image';
import { BoardList } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import badge from '@/public/img_badge.png';
import { useMediaQuery } from 'react-responsive';

const sizeValue = {
  largeScreen: 3,
  mediumScreen: 2,
  smallScreen: 1,
};

export default function BestBoard() {
  const [bestBoard, setBestBoard] = useState<BoardList[] | null>(null);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let value: number;

  if (isLargeScreen) {
    value = sizeValue.largeScreen;
  } else if (isMediumScreen) {
    value = sizeValue.mediumScreen;
  } else if (isSmallScreen) {
    value = sizeValue.smallScreen;
  } else {
    value = sizeValue.mediumScreen;
  }

  useEffect(() => {
    const loadBestBoard = async () => {
      const res = await axios.get(`/articles?pageSize=${value}&orderBy=like`);
      const boards = res.data.list ?? [];
      setBestBoard(boards);
    };

    loadBestBoard();
  }, [value]);

  return (
    <div className="mt-4 sm:mt-6 relative">
      <ul className="flex gap-6">
        {bestBoard?.map((board) => (
          <li
            key={board.id}
            className="bg-[--cool-gray50] px-6 pb-4 pt-[46px] w-[400px] h-[170px] flex flex-col justify-between rounded-lg"
          >
            <Image src={badge} alt="badge" className="absolute top-0" />
            <div className="flex">
              <h1 className="font-semibold text-xl">{board.title}</h1>
              {board.image && (
                <Image
                  src={board.image}
                  alt={board.title}
                  width={72}
                  height={72}
                />
              )}
            </div>
            <div className="flex justify-between mt-[18px]">
              <div className="flex gap-x-2">
                <p>{board.writer.nickname}</p>
                <p>{board.likeCount}</p>
              </div>
              <p>{formatDate(board.createdAt)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
