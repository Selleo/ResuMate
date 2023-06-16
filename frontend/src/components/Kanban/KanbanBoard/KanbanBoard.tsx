import {useState} from "react";
import './KanbanBoard.css';
import {KanbanCard} from "../KanbanCard/KanbanCard.tsx";
import   LocationMap from '../../../assets/icons/Location.svg'


type Props = {
  task: string;
  source: string[];
  destination: string[];

}
export const KanbanBoard = () => {

  const [todo, setTodo] = useState([{
    title: 'Task 1',
    avatar: 'https://i.pravatar.cc/150?img=12',
    links: [
      { name: 'Link 1', url: 'http://example.com/1' ,icon:LocationMap},
      { name: 'Link 2', url: 'http://example.com/2' },
      // More links...
    ],
  }, {
    title: 'Task 2',
    avatar: 'https://i.pravatar.cc/150?img=1',
    links: [
      { name: 'Link 1', url: 'http://example.com/1' },
      { name: 'Link 2', url: 'http://example.com/2' },
      // More links...
    ],
  }, {
    title: 'Task 3',
    avatar: 'https://i.pravatar.cc/150?img=22',
    links: [
      { name: 'Link 1', url: 'http://example.com/1' },
      { name: 'Link 2', url: 'http://example.com/2' },
      // More links...
    ],
  }]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const moveTask = (task, source, destination ) => {

    source.splice(source.indexOf(task), 1);
    destination.push(task);

    setTodo([...todo]);
    setInProgress([...inProgress]);
    setDone([...done]);

  };

  const moveBack = (task, source, destination ) => {
    console.log('klik')
    source.splice(source.indexOf(task), 1);
    destination.push(task);

    setTodo([...todo]);
    setInProgress([...inProgress]);
    setDone([...done]);

  };


  return (
    <div>

      <div className="kanban-board">
        <div className="kanban-column">
          <h2>To Do</h2>

          {todo.map((task, index) => (
            <KanbanCard
              key={index}
              task={task}
              destination={'inProgress'}
              moveTask={() => moveTask(task, todo, inProgress)}
            />
          ))}
        </div>

        <div className="kanban-column">
          <h2>In Progress</h2>
          {inProgress.map((task, index) => (
           <KanbanCard key={index} task={task} canMoveBack={true}  destination={'done'} moveBack={()=>moveBack(task, inProgress, todo)} moveTask={()=>moveTask(task, inProgress, done)}/>

          ))}
        </div>

        <div className="kanban-column">
          <h2>Done</h2>
          {done.map((task, index) => (
            <KanbanCard task={task} blockTask={true}  key={index} moveTask={()=>moveTask(task, done, todo)} />

          ))}
        </div>
      </div>
    </div>
  );
};

