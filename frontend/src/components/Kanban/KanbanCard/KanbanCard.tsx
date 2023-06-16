import './KanbanCard.css'
import {BsArrowLeftCircle, BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import {FaRegClock} from "react-icons/fa";


export const KanbanCard = ({ task, moveTask, source, destination ,blockTask, moveBack, canMoveBack }) => {


  return (
    <div className="kanban-card">
      <div className="card-header">
        <div> <img src={task.avatar} alt="Avatar" className="card-avatar" />
          <div>
            <p>#2137</p>
            <h5>Esther Howard</h5>
          </div></div>
          <div><input type="checkbox"  className={'header-input'} /></div>
      </div>
      <div className="card-details">

        {task.links.map((link, index) => (
          <div className={'badge-kanban'}>
            <img src={link.icon} alt="Avatar" className="badge-icon" />
            <a className={'badge-link'} href={link.url} key={index}>{link.name}</a>
          </div>

        ))}
      </div>
      <div className="card-points">
        <div className={'card-points-data'}><p>Points: <span className='points'>817</span></p>
          <p className={'date-time'}><FaRegClock/> 16 June 2023</p></div>
        <div className={'card-points-actions'}>
          {canMoveBack &&( <button className={'card-button'} onClick={()=>moveBack(task, source, destination)}
          ><HiChevronLeft className={'footer-icon'}/></button>)}
          {!blockTask &&( <button className={'card-button'} onClick={() => moveTask(task, source, destination)}><HiChevronRight className={'footer-icon'}/></button>)}

        </div>

      </div>

    </div>
  );
};

