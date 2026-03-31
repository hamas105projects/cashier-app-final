import imageBG from '../assets/images/backgroundlogin.png';

function BackgroundAuth({children}){
    const loginStyle = {
    backgroundImage: `url(${imageBG})`,
    backgroundSize: '105% 100%',       
    backgroundPosition: 'center',
    minHeight: '120vh',            
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowX: "hidden",
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex : '0'
  };
 return (
    <div style={loginStyle}>{children}</div>
 )
}
export default BackgroundAuth