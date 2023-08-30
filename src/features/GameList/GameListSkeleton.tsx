import { Card, Col, Row } from 'antd';
import { useMemo } from 'react';

type GameListSkeletonProps = {
  size?: number;
};

function GameListSkeleton(props: GameListSkeletonProps) {
  const { size = 6 } = props;

  const SKELETON_ARRAY = useMemo(() => {
    return Array.from({ length: size });
  }, [size]);

  return (
    <Row gutter={16}>
      {SKELETON_ARRAY.map((_, id) => (
        <Col key={id} xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
          <Card loading className="w-full h-[400] m-2" />
        </Col>
      ))}
    </Row>
  );
}

export { GameListSkeleton };
