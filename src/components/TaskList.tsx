import React from 'react';
import Task from './Task';
import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';


interface ITaskList {
    loading: boolean,
    tasks: any[],
    onPinTask: Function,
    onArchiveTask: Function,
}

export const PureTaskList: React.SFC<ITaskList> = (props) => {
    const { loading, tasks, onPinTask, onArchiveTask } = props;
    const events = { onPinTask, onArchiveTask };

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if (loading) {
        return <div className="list-item">
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
        </div>;
    }

    if (tasks.length === 0) {
        return (
            <div className="list-item">
                <span className="icon-check" />
                <div className="title-message">You have no tasks</div>
                <div className="subtitle-message">Sit back and relax</div>
            </div>
        );
    }

    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];

    return (
        <div className="list-item">
            {tasksInOrder.map(task => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}

PureTaskList.defaultProps = { loading: false, };

export default connect(
    ({ tasks }: any) => ({
        tasks: tasks.filter((t: any) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
        onArchiveTask: (id: number) => dispatch(archiveTask(id)),
        onPinTask: (id: number) => dispatch(pinTask(id)),
    })
)(PureTaskList);