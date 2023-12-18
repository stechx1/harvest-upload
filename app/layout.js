import { Poppins } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '../lib/AntRegistry';
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
import { getServerSession } from 'next-auth';
import SessionProvider from '../lib/SessionProvider';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Ganjaland',
  description: 'Inventory uploading',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
