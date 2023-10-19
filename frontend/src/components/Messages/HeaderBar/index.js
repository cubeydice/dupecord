import './HeaderBar.css'

const HeaderBar = ({channel, serverId}) => {
  const header = () => {if (serverId === "@me") {
    return (
      <h1>Friends</h1>
    )
    } else {
      return(
        <h1>{channel.name}</h1>
      )
    }
  }

  return (
  <>
    <div className='header-bar'>
      {header()}
    </div>
  </>
  )
}

export default HeaderBar;