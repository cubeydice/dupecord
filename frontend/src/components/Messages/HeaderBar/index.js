import './HeaderBar.css'

const HeaderBar = ({channel, serverId}) => {

  return (
  <>
    <div className='header-bar'><h1>{channel.name}</h1></div>
  </>
  )
}

export default HeaderBar;