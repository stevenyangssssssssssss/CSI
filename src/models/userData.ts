// 全局共享数据示例
import originData from '@/localization.json';
import { useEffect, useState } from 'react';
const useUser = () => {
  const [username, setUserName] = useState<string>('Nick Lee');

  const [useData, setUseData] = useState<any[]>([]);

  useEffect(() => {
    if (originData.hasOwnProperty(username)) {
      console.log(originData[username]);
      setUseData(originData[username]);
    } else {
      setUseData([]);
    }
  }, [username]);

  return {
    username,
    setUserName,
    useData,
  };
};

export default useUser;
