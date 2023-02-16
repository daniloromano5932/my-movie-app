import { socialMediaBasePath } from "../constants";

function Twitter(props) {
  return (
    <div className={props.twitterId === null ? "hide" : "col-2"}>
      <a title="Visit Twitter" href={socialMediaBasePath.twitter + props.twitterId} target="_blank">
        <span className="glyphicons_v2 twitter"></span>
      </a>
    </div>
  )
}

export default Twitter;