import React from 'react';
import { Result } from 'antd';

function NotFound () {
  return <Result
    status="404"
    title="404"
    subTitle="页面不存在/无权限查看"
  />
}

export default NotFound;