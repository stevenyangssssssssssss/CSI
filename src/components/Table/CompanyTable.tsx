import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
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

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'Company',
    dataIndex: 'Company',
    ellipsis: true,
  },
  {
    title: 'PO Amount ($)',
    dataIndex: 'POAmount',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'HC',
    dataIndex: 'HC',
    ellipsis: true,
    sorter: true,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      size="small"
      request={async () => {
        await waitTime(1000);

        return {
          data: [
            {
              id: 1,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 2,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 3,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 4,
              Company: 'CSI',
              POAmount: 100000,

              HC: 100000,
            },
            {
              id: 5,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 6,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 7,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 8,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 9,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 10,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 11,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
            {
              id: 12,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 13,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 14,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 15,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 16,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 17,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 18,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },

            {
              id: 19,
              Company: 'CSI',
              POAmount: 100000,
              HC: 100000,
            },
          ],
        };
      }}
      scroll={{ y: 'calc(600px - 90px)' }}
      editable={{
        type: 'multiple',
      }}
      bordered={false}
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
      search={false}
      options={false}
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
        pageSize: 20,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle={false}
    />
  );
};
