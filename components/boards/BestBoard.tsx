import axios from '@/lib/axios';
import heartIcon from '@/public/ic_heart.png';
import badge from '@/public/img_badge.png';
import { BoardList } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

// TODO: 반응형 디자인을 위한 객체, 자주 쓰이면 constants 폴더로 이동할 예정
const responsiveSizeValue = {
  largeScreen: 3,
  mediumScreen: 2,
  smallScreen: 1,
};

export default function BestBoard() {
  const [bestBoard, setBestBoard] = useState<BoardList[] | null>(null);

  // 반응형 디자인을 위한 로직
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let itemsPerRow: number;

  if (isLargeScreen) {
    itemsPerRow = responsiveSizeValue.largeScreen;
  } else if (isMediumScreen) {
    itemsPerRow = responsiveSizeValue.mediumScreen;
  } else if (isSmallScreen) {
    itemsPerRow = responsiveSizeValue.smallScreen;
  } else {
    itemsPerRow = responsiveSizeValue.mediumScreen;
  }

  // 화면 크기에 따른 개수 변경
  useEffect(() => {
    const loadBestBoard = async () => {
      const res = await axios.get(
        `/articles?pageSize=${itemsPerRow}&orderBy=like`,
      );
      const boards = res.data.list ?? [];
      setBestBoard(boards);
    };

    loadBestBoard();
  }, [itemsPerRow]);

  return (
    <>
      <h1 className="mt-4 text-xl font-bold sm:mt-6">베스트 게시글</h1>
      <div className="relative mt-4 sm:mt-6">
        <ul className="flex gap-6">
          {bestBoard?.map((board) => (
            <li
              key={board.id}
              className="flex h-[170px] w-[400px] flex-col justify-between rounded-lg bg-[--cool-gray50] px-6 pb-4 pt-[46px]"
            >
              <Image src={badge} alt="badge" className="absolute top-0" />
              <div className="flex">
                <h1 className="text-xl font-semibold">{board.title}</h1>
                {board.image && (
                  <Image
                    src={board.image}
                    alt={board.title}
                    width={72}
                    height={72}
                    className="size-[72px]"
                  />
                )}
              </div>
              <div className="mt-[18px] flex justify-between">
                <div className="flex items-center gap-x-2">
                  <p>{board.writer.nickname}</p>
                  <Image src={heartIcon} alt="heart icon" className="size-4" />
                  <p>{board.likeCount}</p>
                </div>
                <p className="text-[--cool-gray400]">
                  {formatDate(board.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
