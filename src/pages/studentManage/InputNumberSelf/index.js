import React from 'react';
import { InputNumber } from 'antd';
import "./index.less";
import classnames from "classnames";

class SelfInputNumber extends React.Component {
  render () {
    const { addonAfter, addonBefore, ...props } = this.props;
    return (
      <div className={classnames("self-input-number-box", {
        "addon-after": !!addonAfter,
        "addon-before": !!addonBefore
      })}>
        {
          addonBefore && <span className="self-input-number-addon">{addonBefore}</span>
        }
        <InputNumber {...props} disabled/>
        {
          addonAfter && <span className="self-input-number-addon">{addonAfter}</span>
        }
      </div>
    )
  }
}

export default SelfInputNumber;