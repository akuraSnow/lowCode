import {
  Button,
  Typography,
  Input,
  InputNumber,
  Radio,
  Select,
  TimePicker,
  Table,
  Space,
} from 'antd';
import components from '../../../provider/components';

const { Text } = Typography;

let componentList: any = [];

// components

console.log(components);

for (const key in components) {
  if (Object.prototype.hasOwnProperty.call(components, key)) {
    const element = components[key];

    componentList.push({
      type: key,
      name: key,
      component: element({
        control: {
          errorList: [],
        },
        field: {
          dataBinding: {},
        },
      }),
    });
  }
}
console.log('componentList: ', componentList);

export default componentList;
