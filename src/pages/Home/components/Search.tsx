import {
  ProForm,
  ProFormInstance,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Drawer, message } from 'antd';
import { useRef } from 'react';

const Search = (props: any) => {
  const { open, onClose } = props;
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <Drawer title="Search" onClose={onClose} open={open}>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        onFinish={async (values) => {
          console.log(values);
          const val1 = await formRef.current?.validateFields();
          console.log('validateFields:', val1);
          const val2 =
            await formRef.current?.validateFieldsReturnFormatValue?.();
          console.log('validateFieldsReturnFormatValue:', val2);
          message.success('提交成功');
        }}
        formRef={formRef}
        formKey="base-form-use-demo"
        dateFormatter={(value, valueType) => {
          console.log('---->', value, valueType);
          return value.format('YYYY/MM/DD HH:mm:ss');
        }}
        autoFocusFirstInput
      >
        <ProFormSelect.SearchSelect
          options={[
            {
              value: 'time1',
              label: 'Loren Hillberg',
            },
            {
              value: 'time2',
              label: 'Dvir Horovitz',
            },
          ]}
          placeholder="Please input name."
          name="name"
          label="Name"
        />
      </ProForm>
    </Drawer>
  );
};

export default Search;
