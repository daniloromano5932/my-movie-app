import Button from 'react-bootstrap/Button';

function SideLoginAndKeyboard() {
  return (
    <div className="side-login-and-keyboard">
      <Button id="search-button" variant="light" className="edit-button">
        <span className='glyphicons_v2 lock invert svg' />LOGIN TO EDIT</Button>{''}<br/>
      <p className='keyboard'><span className='glyphicons_v2 keyboard' />Keyboard Shortcuts</p> <br/>
      <p className='login-to-report'><span className='glyphicons_v2 speech-bubble-alert' />Login to report an issue</p>
    </div>
  );
}

export default SideLoginAndKeyboard;
