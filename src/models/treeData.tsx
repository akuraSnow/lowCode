import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

import { operateItem } from '../utils/index';

export interface UserInfoModelState {
  count: any[];
  chooseKey: string;
}
export interface UserInfoModelType {
  namespace: 'treeData';
  state: UserInfoModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    changeTree: Reducer<UserInfoModelState>;
    chooseKey: Reducer<UserInfoModelState>;

  };
  subscriptions: { setup: Subscription };
}


const UserInfoModel: UserInfoModelType = {
  namespace: 'treeData',
  state: {
    count: [
      {
        name: "页面",
        key: "0",
        children: [
          {
            name: "区域",
            key: "0-0",
            children: [
              {
                name: "区块",
                key: "0-0-0",
                children: [
                  {
                    name: "行容器",
                    key: "0-0-0-0",
                    type: "rowContainer",
                    children: [
                      {
                        name: "列容器",
                        key: "0-0-0-0-0",
                        type: "colContainer",
                        children: []
                      }
                    ]
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
    chooseKey: '0'
  },
  effects: {
    *query({ payload }, { call, put }) {
    },
  },
  reducers: {
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
          })
        }
      });
    }
  }
};


export default UserInfoModel;
