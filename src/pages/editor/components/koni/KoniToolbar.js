import React from 'react';
import {Tooltip, Divider} from 'antd';
import styles from '../Toolbar.less';
import iconfont from './iconfont.less';
import {Command, Toolbar} from "gg-editor";
import { locales } from '@/utils/utils';

const format = locales('editor');
class KoniToolbar extends React.Component {
    render() {
        return (
            <Toolbar className={styles.toolbar}>
                <Command name="undo">
                    <Tooltip title={format('Undo')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconUndo}`}/>
                    </Tooltip>
                </Command>
                <Command name="redo">
                    <Tooltip title={format('Redo')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconRedo}`}/>
                    </Tooltip>
                </Command>
                <Divider type="vertical"/>
                <Command name="copy">
                    <Tooltip title={format('Copy')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`}/>
                    </Tooltip>
                </Command>
                <Command name="paste">
                    <Tooltip title={format('Paste')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`}/>
                    </Tooltip>
                </Command>
                <Command name="delete">
                    <Tooltip title={format('Delete')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`}/>
                    </Tooltip>
                </Command>
                <Divider type="vertical"/>
                <Command name="zoomIn">
                    <Tooltip title={format('Zoom In')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconZoomInO}`}/>
                    </Tooltip>
                </Command>
                <Command name="zoomOut">
                    <Tooltip title={format('Zoom Out')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconZoomOutO}`}/>
                    </Tooltip>
                </Command>
                <Command name="autoZoom">
                    <Tooltip title={format('Auto Zoom')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconFit}`}/>
                    </Tooltip>
                </Command>
                <Command name="resetZoom">
                    <Tooltip title={format('Reset Zoom')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconActualSizeO}`}/>
                    </Tooltip>
                </Command>
                <Divider type="vertical"/>
                <Command name="toBack">
                    <Tooltip title={format('To Back')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconToBack}`}/>
                    </Tooltip>
                </Command>
                <Command name="toFront">
                    <Tooltip title={format('To Front')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconToFront}`}/>
                    </Tooltip>
                </Command>
                <Divider type="vertical"/>
                <Command name="multiSelect">
                    <Tooltip title={format('Multi Select')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconSelect}`}/>
                    </Tooltip>
                </Command>
                <Divider type="vertical"/>
                <Command name="saveRemote">
                    <Tooltip title={format('Save')} placement="bottom" overlayClassName={styles.tooltip}>
                        <i className={`${iconfont.iconfont} ${iconfont.iconSave}`}/>
                    </Tooltip>
                </Command>
            </Toolbar>
        );
    }
}

export default KoniToolbar;
