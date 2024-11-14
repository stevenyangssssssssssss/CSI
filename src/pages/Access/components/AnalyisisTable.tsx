import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import request from 'umi-request';
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
    title: 'Department',
    dataIndex: 'Department',
    ellipsis: true,
  },
  {
    title: 'PO Amount',
    dataIndex: 'PO Amount',
    ellipsis: true,
  },
  {
    title: 'Total-HC',
    dataIndex: 'Total-HC',
    ellipsis: true,
  },
  {
    title: 'FTE-HC',
    dataIndex: 'FTE-HC',
    ellipsis: true,
  },
  {
    title: 'Vendors-HC',
    dataIndex: 'Vendors-HC',
    ellipsis: true,
  },
  {
    title: 'Top5 Vendors-Name',
    dataIndex: 'Top5 Vendors-Name',
    ellipsis: true,
  },
  {
    title: 'Top5 Vendors-HC',
    dataIndex: 'Top5 Vendors-HC',
    ellipsis: true,
  },
  {
    title: 'HC-Ratio',
    dataIndex: 'HC-Ratio',
    ellipsis: true,
  },
  {
    title: 'Top5 Amount',
    dataIndex: 'Top5 Amount',
    ellipsis: true,
  },
  {
    title: 'Top5 Amount-Ratio',
    dataIndex: 'Top5 Amount-Ratio',
    ellipsis: true,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      size="small"
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(1000);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      scroll={{ y: 'calc(600px - 123px)' }}
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
