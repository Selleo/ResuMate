import "./candidatePreview.css";

function CandidatePreview() {
  return (
    <div className="candidate">
      <div className="candidate-header">
        <div className="candidate-data">
          <img
            className="candidate-img"
            src="https://i.pravatar.cc/80"
            alt=""
          />
          <div className="header-candidate-info">
            <div className="header-candidate-id">#2137</div>
            <div className="header-candidate-name">Esther Howard</div>
          </div>
        </div>
        <div className="header-menu">
          <button className="menu-star">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 0.895996L13.935 6.889L20.5 7.856L15.75 12.518L16.871 19.104L11 15.993L5.129 19.104L6.25 12.518L1.5 7.856L8.064 6.889L11 0.895996Z"
                stroke="#FF6D2A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <a href="/" className="menu-return">
            Return to HR
          </a>
        </div>
      </div>
      <div className="candidate-info">
        <div className="info-bio">
          <div className="section-title">Bio note</div>
          <div className="section-content">
            Obsessed with technology. Passionate for learning for learning and
            getting new experience. Lived in 4 countries, tried different fields
            and hobbies, In love with web development.
          </div>
          <div className="bio-details">
            <div className="bio-details-github"></div>
            <div className="bio-details-city"></div>
            <div className="bio-details-lang"></div>
          </div>
        </div>

        <div className="info-skills">
          <div className="section-title">Matched skills</div>
          <div className="section-content">
            <div className="skills-content-skill">
              <div className="skill-name">Python</div>
              <div className="skill-number">82%</div>
            </div>

            <div className="skills-content-skill">
              <div className="skill-name">Data science</div>
              <div className="skill-number">74%</div>
            </div>

            <div className="skills-content-skill">
              <div className="skill-name">SQL</div>
              <div className="skill-number">64%</div>
            </div>

            <div className="skills-content-skill">
              <div className="skill-name">React.js</div>
              <div className="skill-number">82%</div>
            </div>
          </div>
          <div className="other-skills">
            <span>Driving license Cat B</span>
            <span>MS Office</span>
            <span>Java</span>
            <span>SEO</span>
            <span>SAO</span>
            <span>ESP</span>
            <span>Karate</span>
          </div>
        </div>
        <div className="info-score">
          <div className="section-title">Match score</div>
          <div className="section-content">
            Obsessed with technology. Passionate for learning for learning and
            getting new experience. Lived in 4 countries, tried different fields
            and hobbies, In love with web development.
          </div>
          <div className="score-graph">
            <div className="graph-title">Graph score:</div>
            <div className="graph">
              <div className="graph-wave" />
              <div className="graph-wave" />
              <div className="graph-wave" />
              <div className="graph-info">
                <div className="graph-text">points</div>
                <div className="graph-number">817</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatePreview;
