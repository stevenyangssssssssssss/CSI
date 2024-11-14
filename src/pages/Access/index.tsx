import { initAvatar } from '@/utils/comme';
import { history } from '@umijs/max';
import { Avatar, Button, Card, Flex, Space, Splitter, Typography } from 'antd';
import { useEffect, useState } from 'react';
import OverView from './components/OverView';
import data from './data.json';
import { getUserHierarchy } from './util';

export default () => {
  const [currentUser, setCurrentUser] = useState({
    id: 12,
    name: 'Vladislav Mokeev',
  });
  const [userData, setUserData] = useState(data.data);

  useEffect(() => {
    setUserData(data.data);
  }, []);

  const renderTreeItemInLine = (item: any, hasSub: boolean) => {
    return (
      <Flex key={item.id} align="center" vertical={true}>
        <Space
          style={
            item.id === currentUser.id ? { border: '2px solid #002c8c' } : {}
          }
          className="organize-line-item"
          onClick={() => {
            setCurrentUser(item);
          }}
        >
          <Avatar size="large" src={initAvatar(item.name)} />
          <div>
            <span style={{ fontWeight: 600, display: 'block' }}>
              {item.name}
            </span>
            <Typography.Text
              style={{ display: 'block', fontSize: 12 }}
              type="secondary"
            >
              {item.position}
            </Typography.Text>
            <Typography.Text style={{ display: 'block', fontSize: 12 }}>
              {item.department}
            </Typography.Text>
          </div>
        </Space>
        {hasSub ? <div className="organize-item-line"></div> : <></>}
      </Flex>
    );
  };

  const renderTreeItemInBox = (item: any) => {
    return (
      <Space
        key={item.id}
        className="organize-item-box"
        style={
          item.id === currentUser.id ? { border: '2px solid #002c8c' } : {}
        }
        onClick={() => {
          setCurrentUser(item);
        }}
      >
        <Avatar size="large" src={initAvatar(item.name)} />
        <div>
          <span style={{ fontWeight: 600, display: 'block' }}>{item.name}</span>
          <Typography.Text
            style={{ display: 'block', fontSize: 12 }}
            type="secondary"
          >
            {item.position}
          </Typography.Text>
          <Typography.Text style={{ display: 'block', fontSize: 12 }}>
            {item.department}
          </Typography.Text>
        </div>
      </Space>
    );
  };

  const renderTreeLine = (user: any) => {
    const { hierarchy, subordinates } = getUserHierarchy(user.id, userData);
    return (
      <>
        <Flex vertical={true}>
          {hierarchy.map((item, index: number) =>
            renderTreeItemInLine(
              item,
              index !== hierarchy.length - 1 || !!subordinates?.length,
            ),
          )}
        </Flex>
        {subordinates?.length ? (
          <Card>
            <Typography.Text type="secondary">
              {`People reporting to ${currentUser.name} (${subordinates.length}) `}
            </Typography.Text>
            <Flex wrap gap="large" vertical={false}>
              {subordinates?.map(renderTreeItemInBox)}
            </Flex>
          </Card>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Splitter>
      <Splitter.Panel defaultSize="35%" min="35%" max="70%">
        <Card
          style={{ height: 'calc(100vh - 120px)', overflow: 'auto' }}
          title={'Organization'}
          extra={[
            <Button
              key="detail"
              onClick={() => {
                history.push(`/access/${currentUser.id}`);
              }}
            >
              Detail
            </Button>,
          ]}
        >
          {renderTreeLine(currentUser)}
        </Card>
      </Splitter.Panel>
      <Splitter.Panel>
        <OverView />
      </Splitter.Panel>
    </Splitter>
  );
};
