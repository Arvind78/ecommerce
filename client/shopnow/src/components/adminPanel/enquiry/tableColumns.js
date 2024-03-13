import { Tag } from 'antd';
import moment from 'moment';

export const enquiriesTableColumns = [
  {
    title: 'Enquirie Date ',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => moment(text).format('DD-MMM-YYYY'),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },

  {
    title: 'Update',
    dataIndex: 'update',
    key: 'update',
  },
];
