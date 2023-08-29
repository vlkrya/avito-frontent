import { Layout as AppLayout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

function Layout() {
  return (
    <div className="w-full h-full">
      <AppLayout className="w-full h-full bg-transparent">
        <Header />
        <main className="w-full h-full">
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </AppLayout>
    </div>
  );
}

export { Layout };
