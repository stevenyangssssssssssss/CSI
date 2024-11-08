import EBarChart from '@/components/Chart/EBarChart';
import EChartsTreemap from '@/components/Chart/EChartsTreemap';
import BusinessTable from '@/components/Table/BusinessTable';
import CompanyTable from '@/components/Table/CompanyTable';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Splitter, Switch } from 'antd';
import { useState } from 'react';
import Search from './components/Search';

const HomePage: React.FC = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [treeType, setTreeType] = useState(false);
  const [mapTreeSplit, setMapTreeSplit] = useState<string>('');

  return (
    <PageContainer
      title={`Data from ${'Nick Lee (nicholaslee) CVP, MS Maps & Local'}`}
      ghost
      extra={[
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
      <ProCard
        title={`Reporting to ${'Nick Lee'}`}
        bordered
        tooltip="这是提示"
        extra={[
          <Switch
            key="type"
            onChange={(e) => {
              setTreeType(!e);
            }}
          />,
        ]}
      >
        <Splitter
          style={{ height: 600, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
          onResizeEnd={(e) => {
            setMapTreeSplit(JSON.stringify(e));
          }}
        >
          <Splitter.Panel defaultSize="70%" min="20%" max="80%">
            <EChartsTreemap mapTreeSplit={mapTreeSplit} type={treeType} />
          </Splitter.Panel>
          <Splitter.Panel>
            <CompanyTable />
          </Splitter.Panel>
        </Splitter>
      </ProCard>
      <ProCard
        title={`${'Nick Lee'}'s PO Amount changes`}
        bordered
        tooltip="这是提示"
      >
        <EBarChart />
      </ProCard>
      <ProCard title={`Detail`} bordered tooltip="这是提示">
        <BusinessTable />
      </ProCard>
      <Search open={openSearch} onClose={() => setOpenSearch(false)} />
    </PageContainer>
  );
};

export default HomePage;
