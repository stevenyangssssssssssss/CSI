import { Card, Collapse, CollapseProps } from 'antd';
import AnalyisisTable from './AnalyisisTable';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default (props: any) => {
  const {} = props;
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Analyisis',
      children: <AnalyisisTable />,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Card
      style={{ height: 'calc(100vh - 120px)', overflow: 'auto' }}
      title={'Overview'}
    >
      <Collapse
        accordion
        items={items}
        defaultActiveKey={['1']}
        onChange={onChange}
      />
    </Card>
  );
};
