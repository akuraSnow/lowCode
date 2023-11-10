// const fetchAction = async (url: string, method: string) => {
//   return new Promise((result: any) => {
//     fetch(defaultUrl + url, {
//       method,
//       body: JSON.stringify('{}'),
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//       credentials: 'same-origin',
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('data: ', data);

//         result(data);
//       });
//   });
// };

const baseUrl = 'http://localhost:8080/';

const queryString = (params: any) => {
  console.log('params: ', params);
  if (Object.keys(JSON.parse(params)).length > 0) {
    return (
      '?' +
      Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    );
  }
  return '';
};

const fetchAction = async ({ url, method, data, headers }: any) => {
  try {
    let options: any = {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      credentials: 'same-origin',
      body: JSON.stringify(data) || JSON.stringify({}),
    };
    if (options.method.toUpperCase() === 'GET') {
      url = baseUrl + url + queryString(options.body);
      delete options.body;
    } else {
      url = baseUrl + url;
    }
    /*
    可以做一些请求前的操作
    */
    const res = await fetch(url, options);

    const pageData = await res.json();

    if (pageData.status == 200) {
      return Promise.resolve(pageData);
    } else {
      /*
    做一些code 不等于200的处理
    */
      return new Error(pageData.code + ':' + pageData.msg || '请求错误');
    }
  } catch (err: any) {
    /*
      统一捕获一些错误的处理
      */
    return new Error(err);
  }
};

const calculator = 'calculator';
const visibility = 'visibility';

export const saveJson = async () => {
  return await fetchAction({
    url: 'saveJson',
    method: 'POST',
  });
};

export const getJsonByPath = async ({ path }: any) => {
  return fetchAction({
    url: `getJson?path=${path}`,
    method: 'GET',
  });
};

export const updateJsonByPath = async (params: any) => {
  return await fetchAction({
    url: 'updateJson',
    method: 'POST',
    data: params,
  });
};

export const deleteJsonByPath = async (params: any) => {
  return await fetchAction({
    url: 'deleteJson',
    method: 'POST',
    data: params,
  });
};
