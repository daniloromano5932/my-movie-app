import { socialMediaBasePath } from "../constants";

function Facebook(props) {
  return (
    <div className={props.facebookId === null ? "hide" : "col-2"}>
      <a title="Visit Facebook" href={socialMediaBasePath.facebook + props.facebookId} target="_blank">
        <span className="glyphicons_v2 facebook"></span>
      </a>
    </div>
  )
}

export default Facebook;