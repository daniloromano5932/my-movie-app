import { socialMediaBasePath } from "../constants";

function Instagram(props) {
  return (
    <div className={props.instagramId === null ? "hide" : "col-2"}>
      <a title="Visit Instagram" href={socialMediaBasePath.instagram + props.instagramId} target="_blank">
        <span className="glyphicons_v2 instagram"></span>
      </a>
    </div>
  )
}

export default Instagram