import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Input } from 'antd';
import { useRef } from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

// L1	L2	L3	L4	HC	PO#	Start	End	 PO Amount 	Company	Project Type	Location	Max End Date	PO Owner	Creator/Assigned To	Nature of Work
const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'L1',
    dataIndex: 'L1',
    ellipsis: true,
  },
  {
    title: 'L2',
    dataIndex: 'L2',
    ellipsis: true,
  },
  {
    title: 'L3',
    dataIndex: 'L3',
    ellipsis: true,
  },
  {
    title: 'L4',
    dataIndex: 'L4',
    ellipsis: true,
  },
  {
    title: 'HC',
    dataIndex: 'HC',
    ellipsis: true,
  },
  {
    title: 'PO#',
    dataIndex: 'PO#',
    ellipsis: true,
  },
  {
    title: 'Start',
    dataIndex: 'Start',
    ellipsis: true,
  },
  {
    title: 'End',
    dataIndex: 'End',
    ellipsis: true,
  },
  {
    title: 'PO Amount',
    dataIndex: 'PO Amount',
    ellipsis: true,
  },
  {
    title: 'Company',
    dataIndex: 'Company',
    ellipsis: true,
  },
  {
    title: 'Project Type',
    dataIndex: 'Project Type',
    ellipsis: true,
  },
  {
    title: 'Location',
    dataIndex: 'Location',
    ellipsis: true,
  },
  {
    title: 'Max End Date',
    dataIndex: 'Max End Date',
    ellipsis: true,
  },

  {
    title: 'PO Owner',
    dataIndex: 'PO Owner',
    ellipsis: true,
  },
  {
    title: 'Creator/Assigned To',
    dataIndex: 'Creator/Assigned To',
    ellipsis: true,
  },
  {
    title: 'Nature of Work',
    dataIndex: 'Nature of Work',
    ellipsis: true,
  },
  {
    title: 'Commit',
    dataIndex: 'Commit',

    render: (_, record) => {
      return <Input.TextArea placeholder="please input some commit." />;
    },
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  const { useData } = useModel('userData');
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return {
          data: useData,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      bordered
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle={`Detailed data of ${'Nick Lee'}`}
    />
  );
};
