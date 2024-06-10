import pandaLogo from '@/public/panda_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="border-b bg-white">
      <div className="flex justify-between px-4 py-2.5 sm:px-8 lg:px-48">
        <ul className="flex items-center">
          <li>
            <Link href="/" className="flex items-center">
              <Image
                src={pandaLogo}
                alt="nav logo"
                className="hidden sm:block"
              />
              <span className="text-2xl font-bold text-[color:var(--btn-blue1)] sm:ml-1">
                판다마켓
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/boards"
              className={`${
                router.pathname === '/boards'
                  ? 'text-[color:var(--btn-blue1)]'
                  : 'text-[#4B5563]'
              }`}
            >
              <span className="ml-4 text-lg font-bold sm:ml-9 sm:text-base lg:ml-12">
                자유게시판
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/items"
              className={`${
                router.pathname === '/items'
                  ? 'text-[color:var(--btn-blue1)]'
                  : 'text-[#4B5563]'
              }`}
            >
              <span className="ml-2 text-lg font-bold sm:ml-10 sm:text-base lg:ml-10">
                중고마켓
              </span>
            </Link>
          </li>
        </ul>
        <Link
          href="/signin"
          className="rounded-lg bg-[var(--btn-blue1)] px-6 py-3 text-white"
        >
          로그인
        </Link>
      </div>
    </nav>
  );
}
