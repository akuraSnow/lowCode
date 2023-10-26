import { Extend } from 'dynamic-builder';

export default class checkVisibility extends Extend {
  async execute(content: any): Promise<any> {
    console.log('content: ', content);
    return Promise.resolve(content);
  }
}
