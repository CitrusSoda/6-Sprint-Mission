import { favoriteIcon } from '../images';
import formatNumber from '../utils/formatNumber';

export default function ItemIntroduction({
  postedItems,
}: {
  postedItems: any;
}) {
  return (
    <div className="flex flex-col justify-center sm:flex-row">
      <img
        src={postedItems.images[0]}
        alt={postedItems.name}
        className="h-[340px] w-[340px] rounded-2xl object-fill lg:h-[486px] lg:w-[486px]"
      />
      <div className="ml-6 mt-4 flex flex-grow flex-col sm:mt-0">
        <h1 className="text-xl font-semibold lg:text-2xl">
          {postedItems.name} 팔아요
        </h1>
        <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
          {formatNumber(postedItems.price)} 원
        </h1>
        <hr className="my-4" />
        <p className="text-sm font-semibold">상품 소개</p>
        <p className="mt-2">{postedItems.description}</p>
        <p className="mt-6">상품 태그</p>
        <div className="mt-3 flex flex-wrap gap-x-3">
          {postedItems.tags.map((tag: any, idx: number) => {
            return (
              <p key={idx}>
                <span className="flex gap-x-2 rounded-3xl bg-[var(--cool-gray50)] px-4 py-3">
                  #{tag}
                </span>
              </p>
            );
          })}
        </div>
        <div className="mt-6 flex w-fit cursor-default items-center justify-center gap-x-1 rounded-[35px] border px-3 py-1 lg:mt-auto">
          <img src={favoriteIcon} alt="favoriteicon" className="h-6 w-6" />
          <p>{postedItems.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
