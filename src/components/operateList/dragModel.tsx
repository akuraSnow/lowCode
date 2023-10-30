import React from 'react';
import { Button } from 'antd';

import './index.less';
import _ from 'lodash';
import debounce from 'lodash/debounce';
/*  拖拽组件  */
class DragModel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      style: {
        ...this.props.style,
      },
    };
  }

  componentDidMount() {
    const { visible = false, canDrag = true } = this.props;

    if (canDrag) {
      this.initialEvent();
    } else {
      this.setState({
        style: {
          ...this.state.style,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
        },
      });
    }

    this.changVal = debounce(this.changVal, 200);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.initialEvent, false);
  }

  initialEvent = () => {
    let oDiv = document.getElementById('div1');
    let oMoveDom = document.getElementsByClassName('header-title')[0];
    this.drag(oDiv, oMoveDom);
  };

  changVal = (L: any, T: any) => {
    this.props.postion &&
      this.props.postion({
        left: L,
        top: T,
      });
  };

  drag = (obj: any, oMoveDom: any) => {
    let that = this;

    obj.onmousedown = function (e: any) {
      let ev = e || event;

      let disX = ev.clientX - this.offsetLeft;
      let disY = ev.clientY - this.offsetTop;

      if (obj.setCapture) {
        obj.setCapture();
      }

      if (!oMoveDom.contains(e.target)) {
        return false;
      }

      document.onmousemove = function (e) {
        let ev = e || event;

        let L = ev.clientX - disX; // 拖动元素左侧的位置=当前鼠标距离浏览器左侧的距离 - （物体宽度的一半）
        let T = ev.clientY - disY; // 拖动元素顶部的位置=当前鼠标距离浏览器顶部的距离 - （物体高度的一半）

        if (L < 0) {
          // 如果左侧的距离小于0，就让距离等于0.不能超出屏幕左侧。如果需要磁性吸附，把0改为100或者想要的数字即可
          L = 0;
        } else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
          // 如果左侧的距离>屏幕的宽度-元素的宽度。也就是说元素的右侧超出屏幕的右侧，就让元素的右侧在屏幕的右侧上
          L = document.documentElement.clientWidth - obj.offsetWidth;
        }

        if (T < 0) {
          // 和左右距离同理
          T = 0;
        } else if (
          T >
          document.documentElement.clientHeight - obj.offsetHeight
        ) {
          T = document.documentElement.clientHeight - obj.offsetHeight;
        }

        obj.style.left = L + 'px';
        obj.style.top = T + 'px';

        that.changVal(L, T);
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
        if (obj.releaseCapture) {
          obj.releaseCapture();
        }
      };

      return false;
    };
  };

  render() {
    /* 返回元素 */

    const {
      children,
      wrapClassName,
      title,
      noneFooter,
      isModals,
      ...other
    } = this.props;
    const { style } = this.state;
    return (
      // <div id="div1"></div>
      <div>
        <div id="div1" style={style}>
          <div className="modal-content">
            <div className="modal-header">
              <span className="header-title">{title}</span>
              <span
                className="header-close"
                onClick={() => this.props.onCancle()}
              >
                ×
              </span>
            </div>
            <div className="modal-body">{children}</div>
            {!noneFooter ? (
              <div className="modal-footer">
                <Button onClick={() => this.props.onCancle()}>取消</Button>
                <Button
                  type="primary"
                  style={{ marginLeft: '8px' }}
                  onClick={() => this.props.onOk()}
                >
                  确定
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {isModals ? <div className="models"></div> : ''}
      </div>
    );
  }
}
export default DragModel;
