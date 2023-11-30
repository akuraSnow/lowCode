import { sortBy } from 'lodash';

export function operateItem(list: any[], key: any, fn: any) {
  const newCount = nestedObject(JSON.parse(JSON.stringify(list)), key, fn);
  return newCount;
}

export function serialized(list: any, key: any) {
  return list
    .filter((item: any) => {
      return (
        !['rowContainer', 'colContainer'].includes(item.type) ||
        item.children.length > 0
      );
    })
    .map((item: any, index: number) => {
      if (
        Array.isArray(item.children) &&
        item.children.length === 1 &&
        item.children[0].type === 'container'
      ) {
        item = item.children[0];
      }
      item.key = key ? key + '-' + index : `${index}`;

      if (Array.isArray(item.children)) {
        item.children = serialized(item.children, item.key);
      }
      return item;
    });
}

export function cuttingModule(key: string, count: any[], type: string) {
  const includesType =
    type === 'rowContainer'
      ? ['colContainer', undefined]
      : ['rowContainer', undefined];
  const keyList = key.split('-');
  const order = keyList[keyList.length - 1];
  const parentKey = keyList.splice(0, keyList.length - 1).join('-');

  let newKey;
  let newCont;

  newCont = operateItem(count, parentKey, (element: any) => {
    const { key, type: ownerType } = element.children[order];
    newKey = key + '-0';

    if (includesType.includes(element.type)) {
      element.children.splice(
        Number(order),
        1,
        getInitJson(element.children[order], type),
      );
      return element;
    }

    element.children = element.children || [];
    element.children.splice(Number(order) + 1, 0, {
      key: element.key + '-' + element.children.length,
      type: 'container',
      children: [],
    });
    return element;
  });

  return {
    newKey,
    newCont,
  };
}

function nestedObject(arr: any, findKey: any, fn: any) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item.key === findKey) {
      arr[i] = fn(item, i);
    } else if (item && Array.isArray(item.children)) {
      item.children = nestedObject(item.children, findKey, fn);
    }
  }
  return arr;
}

export function getInitJson(
  { type: ownerType, key, width, height, children }: any,
  type: string,
) {
  return {
    key,
    type,
    width,
    height,
    children: [
      { key: key + '-0', type: ownerType, children: children },
      { key: key + '-1', type: 'container', children: [] },
    ],
  };
}

export function updateFelidJson(fieldsJson: any) {
  let { elementArr, scaleArr } = getJson(
    JSON.parse(JSON.stringify(fieldsJson)),
    'colContainer',
  );
  console.log('scaleArr: ', scaleArr);
  console.log('json: ', elementArr);
  // const rowList = addColumns(json);
  // console.log('json: ', rowList);
  return { scaleArr, fieldsJson: getFields(elementArr) };
}

export function bindExecuteJs(fieldsJson: any, funcObj: any) {
  return fieldsJson.map((item: any) => {
    if (funcObj[item.id]) {
      item = {
        ...item,
        ...funcObj[item.id],
      };
    }
    return item;
  });
}

function getFields(json: any) {
  let arr: any = [];
  json.forEach((item: any, index: any) => {
    item.children.forEach((el: any) => {
      const {
        validator = [],
        visibility = 'visible',
        dataBinding: { path = 'empty' } = {},
        columnSpan,
        order,
        parentRange,
      } = el;

      const grid = order.split('').join(' ');
      arr.push({
        ...el,
        validator,
        visibility,
        dataBinding: {
          path: path,
        },
        layout: { span: columnSpan, grid, parentRange },
      });
    });
  });
  return arr;
}

function getJson(json: any, range: string) {
  let elementArr: any = [];
  let scaleArr: any = [];

  json.forEach((item: any, index: number) => {
    const { type, key, scale, children, width, height } = item;
    if (type === 'container') {
      item.children = children.length
        ? children
        : [{ type: 'empty', id: key.split('-').join('') + '0empty' }];

      item.children = item.children.map((res: any, i: number) => {
        res.order = item.key.split('-').join('');
        res.parentRange = range;
        return res;
      });
      elementArr.push(item);
    }

    if (width || height) {
      scaleArr.push({
        span: width || height,
        grid: item.key.split('-').join(' '),
      });
    }

    if (item.children) {
      const { elementArr: childElementArr, scaleArr: childScaleArr } = getJson(
        item.children,
        item.type,
      );
      elementArr.push(...childElementArr);
      scaleArr.push(...childScaleArr);
    }
  });

  return { scaleArr, elementArr };
}

export function listToTree(list: any[], pid: string = ''): any {
  return list
    .filter((it) => it.pid === pid)
    .forEach((it) => (it.children = listToTree(list, it.id)));
}
