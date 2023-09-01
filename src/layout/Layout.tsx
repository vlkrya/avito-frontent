import { Layout as AppLayout, Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useSelector } from 'react-redux';
import { appSelector } from '../store/app/selectors';

function Layout() {
  const { isLoading } = useSelector(appSelector);

  return (
    <div className="w-full h-full">
      <AppLayout className="w-full h-full bg-transparent">
        <Header />
        <main className="w-full h-full">
          {isLoading ? (
            <div>
              <Spin />
            </div>
          ) : (
            <Suspense>
              <Outlet />
            </Suspense>
          )}
        </main>
      </AppLayout>
    </div>
  );
}

export { Layout };
