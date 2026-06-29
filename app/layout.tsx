import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Зарабатывай пассивно на своем интернет-трафике с Honeygain',
  description: 'Делись неиспользуемым интернетом и зарабатывай реальные деньги абсолютно безопасно. Установи приложение Honeygain и получи бонус $3 прямо сейчас!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={inter.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var orig = window.fetch;
                  if (orig) {
                    var val = orig;
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return val; },
                      set: function(v) { val = v; },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch (e) {
                  try {
                    var val2 = self.fetch;
                    Object.defineProperty(self, 'fetch', {
                      get: function() { return val2; },
                      set: function(v) { val2 = v; },
                      configurable: true,
                      enumerable: true
                    });
                  } catch (e2) {
                    console.warn('Could not patch fetch:', e2);
                  }
                }
              })();
            `
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-[#17B169] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
