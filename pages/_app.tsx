import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const globalFont = localFont({ src: '../public/fonts/PretendardVariable.ttf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={globalFont.className}>
      <Component {...pageProps} />
    </div>
  );
}
