import { socialMediaBasePath } from "../constants";

function SocialMedia(props) {
  return  <div className="social-media row">
    <div className={props.facebookId === null ? "hide" : "col"}>
      <a title="Visit Facebook" href={socialMediaBasePath.facebook + props.facebookId} target="_blank">
        <span className="glyphicons_v2 facebook"></span>
      </a>
    </div>
  <div className={props.twitterId === null ? "hide" : "col"}>
      <a title="Visit Twitter" href={socialMediaBasePath.twitter + props.twitterId} target="_blank">
        <span className="glyphicons_v2 twitter"></span>
      </a>
    </div>
  <div className={props.instagramId === null ? "hide" : "col"}>
      <a title="Visit Instagram" href={socialMediaBasePath.instagram + props.instagramId} target="_blank">
        <span className="glyphicons_v2 instagram"></span>
      </a>
    </div>
    {/* <div className="col">
      <a title="Visit Home Page" href="" target="_blank">
        <span className="glyphicons_v2 home-page"></span>
      </a>
    </div> */}
</div>
}

export default SocialMedia;