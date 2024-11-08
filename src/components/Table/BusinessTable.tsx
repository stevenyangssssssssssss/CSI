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

// L1	L2	L3	L4	HC	PO#	Start	End	 PO Amount 	Company	Project Type	Location	Max End Date	PO Owner	Creator/Assigned To	Nature of Work
const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'L1',
    dataIndex: 'L1',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'L2',
    dataIndex: 'L2',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'L3',
    dataIndex: 'L3',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'L4',
    dataIndex: 'L4',
    copyable: true,
    ellipsis: true,
  },

  {
    title: 'HC',
    dataIndex: 'HC',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'PO#',
    dataIndex: 'PO#',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Start',
    dataIndex: 'Start',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'End',
    dataIndex: 'End',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'PO Amount',
    dataIndex: 'PO Amount',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Company',
    dataIndex: 'Company',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Project Type',
    dataIndex: 'Project Type',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Location',
    dataIndex: 'Location',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Max End Date',
    dataIndex: 'Max End Date',
    copyable: true,
    ellipsis: true,
  },

  {
    title: 'PO Owner',
    dataIndex: 'PO Owner',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Creator/Assigned To',
    dataIndex: 'Creator/Assigned To',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Nature of Work',
    dataIndex: 'Nature of Work',
    copyable: true,
    ellipsis: true,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
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
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
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
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle={`${'Nick Lee (nicholaslee) CVP, MS Maps & Local'} 下所有数据`}
    />
  );
};
