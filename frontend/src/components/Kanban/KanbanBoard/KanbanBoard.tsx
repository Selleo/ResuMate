import {useState} from "react";
import './KanbanBoard.css';
import {KanbanCard} from "../KanbanCard/KanbanCard.tsx";
import  LocationMap from '../../../assets/icons/Location.svg'
import Language from '../../../assets/icons/Language.svg'
import github from '../../../assets/icons/github.svg'



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
      { name: 'Bielsko-Biała', url: 'http://example.com/1' ,icon:LocationMap},
      { name: 'English: B.2.2', url: 'http://example.com/2',icon:Language },
      { name: 'Github', url: 'http://example.com/2',icon:github}
      // More links...
    ],
  }, {
    title: 'Task 2',
    avatar: 'https://i.pravatar.cc/150?img=1',
    links: [
      { name: 'Bielsko-Biała', url: 'http://example.com/1' ,icon:LocationMap},
      { name: 'English: B.2.2', url: 'http://example.com/2',icon:Language },
      { name: 'Github', url: 'http://example.com/2',icon:github}
    ],
  }, {
    title: 'Task 3',
    avatar: 'https://i.pravatar.cc/150?img=22',
    links: [
      { name: 'Bielsko-Biała', url: 'http://example.com/1' ,icon:LocationMap},
      { name: 'English: B.2.2', url: 'http://example.com/2',icon:Language },
      { name: 'Github', url: 'http://example.com/2',icon:github}
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

      <div className="kanban-board">
        <div className="kanban-column">
          <div className={'kanban-column-title'}>
            <h6>️🔵 APPLIED </h6>
            <p className={'user-counter'}>{todo.length}</p>
          </div>


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
          <div className={'kanban-column-title'}>
            <h6>🟠 NEED INFORMATION  </h6>
            <p className={'user-counter'}>{inProgress.length}</p>
          </div>
          {inProgress.map((task, index) => (
           <KanbanCard key={index} task={task} canMoveBack={true}  destination={'done'} moveBack={()=>moveBack(task, inProgress, todo)} moveTask={()=>moveTask(task, inProgress, done)}/>

          ))}
        </div>

        <div className="kanban-column">
          <div className={'kanban-column-title'}>
          <h6>🟢 GRADED </h6>
            <p className={'user-counter'}>{done.length}</p>
          </div>
          {done.map((task, index) => (
            <KanbanCard task={task} blockTask={true}  key={index} moveTask={()=>moveTask(task, done, todo)} />

          ))}
        </div>
      </div>
  );
};

