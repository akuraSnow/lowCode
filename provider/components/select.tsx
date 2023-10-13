import { Input as FormInput } from 'antd';
import { Select as FromSelect, Space } from 'antd';
import React from "react";

const { Option } = FromSelect;

export default function Select(props: any) {

    const { control, field: { dataSourceList } } = props;


    return  (<FromSelect
        defaultValue={control.value}
        style={{ width: '100% '}}
        {...control.event}
        options={dataSourceList}
    />)
}