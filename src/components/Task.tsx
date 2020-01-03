import React from 'react';
import { action, HandlerFunction } from '@storybook/addon-actions';

interface ITask {
    task: {
        id: string,
        title: string,
        state: string,
    },
    onArchiveTask: Function,
    onPinTask: Function,
}

const Task: React.SFC<ITask> = (props) => {
    return (
        <div className={`list-item ${props.task.state}`}>
            <label className="checkbox">
                <input
                    type="checkbox"
                    defaultChecked={props.task.state === 'TASK_ARCHIVED'}
                    disabled={true}
                    name="checked"
                />
                <span className="checkbox-custom"
                    onClick={() => props.onArchiveTask(props.task.id)} />
            </label>
            <div className="title">
                <input type="text" value={props.task.title}
                    readOnly={true} placeholder="Input title" />
            </div>

            <div className="actions" onClick={event => event.stopPropagation()}>
                {props.task.state !== 'TASK_ARCHIVED' && (
                    <a onClick={() => props.onPinTask(props.task.id)}>
                        <span className={`icon-star`} />
                    </a>
                )}
            </div>
        </div>
    );
}

export default Task;