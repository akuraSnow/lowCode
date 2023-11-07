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
      item.key = key ? key + '-' + index : `${index}`;
      if (Array.isArray(item.children)) {
        item.children = serialized(item.children, item.key);
      }
      return item;
    });
}

export function getInitJson(
  { type: ownerType, key, children }: any,
  type: string,
) {
  return {
    key,
    type,
    children: [
      { key: key + '-0', type: ownerType, children: children },
      { key: key + '-1', type: 'container', children: [] },
    ],
  };
}

export function cuttingModule(key: string, count: any[], type: string) {
  const includesType =
    type === 'rowContainer'
      ? ['colContainer', undefined]
      : ['colContainer', 'rowContainer'];
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

export function updateFelidJson(fieldsJson: any) {
  const json = getJson(JSON.parse(JSON.stringify(fieldsJson)));
  return getFields(json);
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
    if (!['rowContainer', 'colContainer'].includes(item.type)) {
      const { id, type, label, row, column, columnSpan } = item;
      arr.push({
        id,
        type,
        label,
        dataBinding: {
          path: 'a',
        },
        layoutDefinition: { row, column, columnSpan },
      });
    }

    if (item.children) {
      arr.push(...getFields(item.children));
    }
  });
  return arr;
}

function getJson(json: any) {
  let arr: any = [];

  json.forEach((item: any, index: number) => {
    if (item.type === 'rowContainer') {
      item.children = item.children.map((el: any, i: number) => {
        el.children = el.children.length ? el.children : [{ type: 'empty' }];
        el.children = el.children.map((res: any, order: number) => {
          res.row = index;
          res.column = i;
          res.columnSpan = 12 / item.children.length;
          return res;
        });

        return el;
      });
      arr.push(item);
    }

    if (item.children) {
      arr.push(...getJson(item.children));
    }
  });

  return arr;
}
