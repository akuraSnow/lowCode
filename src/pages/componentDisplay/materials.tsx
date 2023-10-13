import React, { useEffect, useState } from 'react';
import styles from "./index.less";
import { Card } from 'antd';

import componentList from '../materialPool/componentList';


export default function Materials(props: any):any {

    const [open, setOpen] = useState(props.open);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    function domDrugStart(ev: any) {

        const type = ev.target.getAttribute('type');
        ev.dataTransfer.setData("type", type);
        ev.dataTransfer.dropEffect = "move";
        props.setOpen(false);
    }


    return (
        open && <div className={styles.drawer}>
            <Card style={{ width: '100%', height: '100%' }}>
                <div className={styles.componentContent}>
                    {
                        componentList.map((item: any, key: any) => {
                            return <div 
                                key={key} 
                                {...item}
                                className={styles.componentItem}  
                                draggable 
                                onDragStart={domDrugStart} 
                            >
                            </div>
                        })
                    }
                </div>
            </Card>
        </div>
    );
};

