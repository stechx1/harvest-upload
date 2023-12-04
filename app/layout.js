import { Poppins } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '../lib/AntRegistry';
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Ganjaland',
  description: 'Inventory uploading',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
