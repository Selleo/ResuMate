import './KanbanCard.css'


export const KanbanCard = ({ task, moveTask, source, destination ,blockTask, moveBack, canMoveBack }) => {


  return (
    <div className="kanban-card">
      <div className="card-header">
        <img src={task.avatar} alt="Avatar" className="card-avatar" />
        <div>
          <p>#2137</p>
          <h5>Esther Howard</h5>
        </div>
      </div>
      <div className="card-details">

        {task.links.map((link, index) => (
          <div className={'badge'}>
            <img src={link.icon} alt="Avatar" className="card-avatar" />
            <a href={link.url} key={index}>{link.name}</a>
          </div>

        ))}
      </div>
      <div className="card-points">
        <p>Points: <span className='points'>817</span></p>
        <p className={'date-time'}>16 June 2023</p>
      </div>
      <div className="card-footer">

        {!blockTask &&( <button onClick={() => moveTask(task, source, destination)}>{`Move to ${destination}`}</button>)}
        {canMoveBack &&( <button onClick={()=>moveBack(task, source, destination)}
        >{`Move to Todo`}</button>)}
      </div>
    </div>
  );
};

