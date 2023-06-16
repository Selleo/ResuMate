import {useState} from "react";
import './Nav.css';
export const Nav = () => {

  const [badges, setBadges] = useState(['Today', 'Week', 'Month','Quarter', 'Year'])
  return (
    <div className={'nav'}>
      <h1>Manage candidates</h1>
      <div className={'nav-badges'}>
        {badges.map((badge, index) => (
          <div className={'badge'}>
            <a className={'badge-link'} href={badge} key={index}>{badge}</a>
          </div>

        ))  }
      </div>
    </div>
  );
};

