import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserInfoModelState {
  functionObj: object;
  attributeObj: object;
  count: any[];
  chooseKey: string;
}
export interface UserInfoModelType {
  namespace: 'treeData';
  state: UserInfoModelState;
  effects: {
    query: Effect;
    addSaveData: Effect;
  };
  reducers: {
    saveFunction: Reducer<UserInfoModelState>;
    changeTree: Reducer<UserInfoModelState>;
    chooseKey: Reducer<UserInfoModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserInfoModel: UserInfoModelType = {
  namespace: 'treeData',
  state: {
    functionObj: {},
    attributeObj: {},
    count: [
      {
        name: '页面',
        key: '0',
        children: [
          {
            name: '区域',
            key: '0-0',
            children: [
              {
                name: '区块',
                key: '0-0-0',
                children: [
                  {
                    key: '0-0-0-0',
                    type: 'rowContainer',
                    children: [
                      {
                        key: '0-0-0-0-0',
                        type: 'container',
                        children: [],
                      },
                      {
                        key: '0-0-0-0-1',
                        type: 'container',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    chooseKey: '0',
  },
  effects: {
    *query({ payload }, { call, put }) {},
    *addSaveData(action, b) {},
  },
  reducers: {
    saveFunction(state, action): any {
      const {
        payload: { newFunctionObj, newAttributeObj },
      } = action;
      const { chooseKey, attributeObj, functionObj }: any = state;

      const newAttribute = {
        ...attributeObj,
        [chooseKey]: {
          ...attributeObj[chooseKey],
          ...newAttributeObj[chooseKey],
        },
      };

      const newFunction = { ...functionObj, ...newFunctionObj };

      return {
        ...state,
        attributeObj: newAttribute,
        functionObj: newFunction,
      };
    },
    changeTree(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    chooseKey(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }: any) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default UserInfoModel;
