import './SplashPage.css'
import { Link } from 'react-router-dom';
import { ReactComponent as GithubSvg } from './assets/logos/github-mark.svg';
import { ReactComponent as ServerSvg } from './assets/splash_server.svg';
import { ReactComponent as ModerationSvg } from './assets/splash_moderation.svg';
import { ReactComponent as CloudsSvg } from './assets/splash_bg_clouds.svg';
import { ReactComponent as Hero1Svg } from './assets/splash_bg_1.svg';
import { ReactComponent as Hero2Svg } from './assets/splash_bg_2.svg';
import { ReactComponent as SparklesSvg } from './assets/splash_sparkles.svg';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'

const SplashPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.signOut())
  }

  return (
    <div className='splash-body'>
      <nav className='splash-nav'>
        <Link to={'/'} className='dupecord'>dupecord</Link>
        { (!sessionUser) ?
        <Link to={'/login'}><button className='nav-login-button'>Login</button></Link>
        : <button className='nav-login-button' onClick={handleLogout}>Logout</button>}
      </nav>

      <main className='splash-main'>
        <div id='splash-main'>
          <h1 className='title'>IMAGINE A PLACE...</h1>
          <p id="main-description">...where you can belong to a school club, a gaming group, or a worldwide art community.
          Where just you and a handful of friends can spend time together.
          A place that makes it easy to talk every day and hang out more often.
          </p>
        </div>

        <div className='splash-main-buttons'>
          <a href='https://github.com/cubeydice/dupecord' className='nav-link' target="_blank" rel="noreferrer">
            <button className='main-buttons'>
              <GithubSvg id='github-icon'/>
              Github
            </button>
          </a>
          <a href='https://www.linkedin.com/in/queen-belle-d-118b7859/'className='nav-link'  target="_blank" rel="noreferrer">
            <button id='splash-button-2' className='main-buttons'>
              <img src={require ('./assets/logos/LI-mark.png')} alt='linkedIn'/>
              LinkedIn
            </button>
          </a>
        </div>

        <div className='banner'>
          <CloudsSvg id='banner1'/>
          <Hero1Svg id='banner2'/>
          <Hero2Svg id='banner3'/>
        </div>
      </main>


      <section>
        <ServerSvg/>
        <div className='description'>
          <h1>Create an invite-only place where you belong</h1>
          <p>Dupecord servers are organized into topic-based channels where you can collaborate,
          share, and just talk about your day without clogging up a group chat.
          </p>
        </div>
      </section>

      <section>
        <div className='description'>
          <h1>Where hanging out is easy</h1>
          <p>Grab a seat in a voice channel when you’re free.
          Friends in your server can see you’re around and instantly pop in to talk without having to call.
          </p>
        </div>
        <img src={require("./assets/splash_voice.svg").default} alt='voice-img'/>
      </section>

      <section>
        <ModerationSvg/>
        <div className='description'>
          <h1>From few to a fandom</h1>
          <p>Get any community running with moderation tools and custom member access.
          Give members special powers, set up private channels, and more.
          </p>
        </div>
      </section>

      <section className='splash-video'>

          <h1>RELIABLE TECH FOR STAYING CLOSE</h1>

          <p>Low-latency voice and video feels like you’re in the same room.
            Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
          </p>

          <img
            src={require("./assets/splash_video.svg").default}
            alt="splash-videog"
          />

          <p className='splash-journey'>
            <SparklesSvg/>
            <span>Ready to start your journey?</span>

            <Link to={'/login'}>
              <button className='main-buttons'>
                Login
              </button>
            </Link>
          </p>
      </section>

      <footer>
        <div id="footer">
          <div id="footer-top">
            <div className='footer-links'>
              <h2>Let's Connect!</h2>
              <ul>
                <li>
                  <a href='https://github.com/cubeydice/dupecord' className='nav-link' target="_blank" rel="noreferrer">
                  <img src={require ('./assets/logos/github-mark-white.png')} alt='GitHub'/>
                  &ensp;Github
                  </a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/queen-belle-d-118b7859/'className='nav-link'  target="_blank" rel="noreferrer">
                    <img src={require ('./assets/logos/LI-mark.png')} alt='linkedIn'/>
                    &ensp;LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr/>
          <div id="footer-bottom">
            <Link to={'/'} className='dupecord'><h1>dupecord</h1></Link>
            <Link to={'/register'}><button className='footer-signup-button'>Sign up</button></Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SplashPage;
