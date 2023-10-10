import './SplashPage.css'
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as ServerSvg } from './assets/splash_server.svg';
import { ReactComponent as VoiceSvg } from './assets/splash_voice.svg';
import { ReactComponent as ModerationSvg } from './assets/splash_moderation.svg';
import { ReactComponent as CloudsSvg } from './assets/splash_bg_clouds.svg';
import { ReactComponent as Hero1Svg } from './assets/splash_bg_1.svg';
import { ReactComponent as Hero2Svg } from './assets/splash_bg_2.svg';
import { ReactComponent as VideoSvg } from './assets/splash_video.svg';

const SplashPage = () => {

  return (
    <>
    <nav>
      <Link to={'/'}>dupecord</Link>
      <div>
        <NavLink to='https://github.com/cubeydice/dupecord'>Github</NavLink><br/>
        <NavLink to='https://www.linkedin.com/in/queen-belle-d-118b7859/'>LinkedIn</NavLink>
      </div>
      <Link to={'/login'}><button className='nav-login-button'>Login</button></Link>
    </nav>
    <main>
      <div className='banner'>
        <CloudsSvg className='banner1'/>
        {/* <Hero1Svg className='banner2'/>
        <Hero2Svg className='banner2'/> */}
      </div>
      <div>
      <h1 className='title'>IMAGINE A PLACE...</h1>
        <p>...where you can belong to a school club, a gaming group, or a worldwide art community.
        Where just you and a handful of friends can spend time together.
        A place that makes it easy to talk every day and hang out more often.
        </p>
      </div>
    </main>


    <section>
      <figure><ServerSvg/></figure>
      <div>
        <h1>Create an invite-only place where you belong</h1>
        <p>Dupecord servers are organized into topic-based channels where you can collaborate,
        share, and just talk about your day without clogging up a group chat.
        </p>
      </div>
    </section>

    <section>
      <div>
        <h1>Where hanging out is easy</h1>
        <p>Grab a seat in a voice channel when you’re free.
        Friends in your server can see you’re around and instantly pop in to talk without having to call.
        </p>
      </div>
      <figure><VoiceSvg/></figure>
    </section>

    <section>
      <figure><ModerationSvg/></figure>
      <div>
        <h1>From few to a fandom</h1>
        <p>Get any community running with moderation tools and custom member access.
        Give members special powers, set up private channels, and more.
        </p>
      </div>
    </section>

    <section>
      <div>
        <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
        <p>Low-latency voice and video feels like you’re in the same room.
          Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
        <figure><VideoSvg/></figure>
        </p>
        <h1>Ready to start your journey?</h1>
      </div>
    </section>
    </>
  )
}

export default SplashPage;
