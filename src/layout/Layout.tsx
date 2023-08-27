import { Layout as AppLayout, Space } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

function Layout() {
  return (
    <Space direction="horizontal" size="middle" className="w-full h-full">
      <AppLayout className="w-full h-full">
        <Header />
        <AppLayout.Content className="w-full h-full">
          <Suspense>
            <Outlet />
          </Suspense>
        </AppLayout.Content>
      </AppLayout>
    </Space>
  );
}

export { Layout };
