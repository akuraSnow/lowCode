import { get, set } from 'lodash';
import { Extend, iocContainer } from 'dynamic-builder';

export default class BindController extends Extend {
  execute(contentField: any): Promise<any> {
    contentField.control = new Control(
      contentField.field,
      this.viewModel,
      this,
    );
    return contentField;
  }
}

class Control {
  private _viewModel: any = undefined;
  private target: any;
  private field: any = {};
  private _eventList: any = {};
  private _errorList: any[] = [];

  constructor(field: string, _viewModel: any, target: any) {
    this._viewModel = _viewModel;
    this.field = field;
    this.target = target;
    this.initEvent();
  }

  initEvent() {
    this._eventList = {
      onChange: (val: any) => this.publishEvent('onchange', val),
      onClick: (val: any) => this.publishEvent('onclick', val),
      onBlur: (val: any) => this.publishEvent('onblur', val),
      onFocus: (val: any) => this.publishEvent('onfocus', val),
      onKeyUp: (val: any) => this.publishEvent('onkeyup', val),
      onKeyDown: (val: any) => this.publishEvent('onkeyDown', val),
      onDrag: (val: any) => this.publishEvent('onDrag', val),
    };
  }

  publishEvent(eventType: string, val: any) {
    const value = val.target ? val.target.value : val;
    const { action, dataBinding } = this.field;

    if (dataBinding && dataBinding.path) {
      const { path, converter } = dataBinding;

      const newValue = this.converterExtension(converter, value, 'set');
      set(this._viewModel, path, newValue);
    }

    for (const key in action) {
      if (Object.prototype.hasOwnProperty.call(action, key)) {
        const { name, params } = action[key];
        if (eventType === key) {
          this.target.executeAction(name, params);
        }
      }
    }
  }

  converterExtension(convertName: string, value: any, operator: string) {
    if (!convertName) {
      return value;
    }

    const result = this.findExecuteFunction(
      {
        name: convertName,
        value,
        extensionName: 'converter',
      },
      value,
    );
    return result === value ? value : result[operator](value);
  }

  validatorExtension(validatorName: string, value: any) {
    if (!validatorName) {
      return null;
    }
    return this.findExecuteFunction(
      {
        name: validatorName,
        value,
        extensionName: 'validator',
      },
      null,
    );
  }

  findExecuteFunction(
    { name, value, extensionName }: any,
    defaultReturn?: any,
  ) {
    try {
      if (iocContainer[extensionName].has(name)) {
        return iocContainer[extensionName].get(name).call(this, value);
      }
      return this.target.executeAction(name, this) || defaultReturn;
    } catch (error) {
      console.error(`未注册对应的函数${name}, ${error}`);
    }
  }

  get value() {
    if (!this.field.dataBinding) {
      return undefined;
    }

    const {
      dataBinding: { converter, path },
      validator,
    } = this.field;

    const value = get(this._viewModel, path);

    this._errorList = (validator || [])
      .map((item: any) => this.validatorExtension(item.name, value))
      .filter((e: any) => e);

    return this.converterExtension(converter, value, 'get');
  }

  get viewModel() {
    return this._viewModel;
  }

  get event() {
    return this._eventList;
  }

  get errorList() {
    return this._errorList;
  }
}
