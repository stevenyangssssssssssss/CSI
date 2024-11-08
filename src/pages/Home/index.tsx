import EBarChart from '@/components/Chart/EBarChart';
import EChartsTreemap from '@/components/Chart/EChartsTreemap';
import BusinessTable from '@/components/Table/BusinessTable';
import CompanyTable from '@/components/Table/CompanyTable';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Space, Splitter } from 'antd';
import { useState } from 'react';
import DragSort from './components/DragSort';
import Search from './components/Search';

interface Item {
  id: number;
  text: string;
}

const HomePage: React.FC = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [mapTreeSplit, setMapTreeSplit] = useState<string>('');
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: 'Proportion' },
    { id: 2, text: 'Change' },
    { id: 3, text: 'Detail' },
  ]);
  const treemap = () => {
    return (
      <ProCard title={`Reporting to ${'Nick Lee'}`} bordered>
        <Splitter
          style={{ height: 600, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
          onResizeEnd={(e) => {
            setMapTreeSplit(JSON.stringify(e));
          }}
        >
          <Splitter.Panel defaultSize="75%" min="20%" max="80%">
            <EChartsTreemap mapTreeSplit={mapTreeSplit} />
          </Splitter.Panel>
          <Splitter.Panel>
            <CompanyTable />
          </Splitter.Panel>
        </Splitter>
      </ProCard>
    );
  };

  return (
    <PageContainer
      title={`Data from ${'Nick Lee (nicholaslee) CVP, MS Maps & Local'}`}
      ghost
      extra={[
        <DragSort items={items} setItems={setItems} key={'sort'} />,
        <Button
          key={'search'}
          onClick={() => {
            setOpenSearch(!openSearch);
          }}
        >
          {'Search'}
        </Button>,
      ]}
    >
      <Space direction="vertical">
        {items.map((v: Item) => {
          if (v.id === 1) {
            return treemap();
          } else if (v.id === 2) {
            return (
              <ProCard
                key={v.text}
                title={`${'Nick Lee'}'s PO Amount changes`}
                bordered
              >
                <EBarChart />
              </ProCard>
            );
          } else if (v.id === 3) {
            return (
              <ProCard key={v.text} title={`Detail`} bordered>
                <BusinessTable />
              </ProCard>
            );
          } else {
            return '';
          }
        })}
      </Space>

      <Search open={openSearch} onClose={() => setOpenSearch(false)} />
    </PageContainer>
  );
};

export default HomePage;
