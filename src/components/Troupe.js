import { imgBasePath, troupeImgSize, glyphiconsBasePath } from "../constants"
import { Link } from "react-router-dom";

function Troupe(props) {

  function setActorCardPic() {
    if (props.img !== null) {
      return imgBasePath + troupeImgSize + props.img;
    } else {
      if (props.gender === 2 || props.gender === 0) {
        return glyphiconsBasePath + "4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
      } else if (props.gender === 1) {
        return glyphiconsBasePath + "36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg";
      }
    }
  }

  return <div className="troupe">
    <div className="row">
      <Link to={"/person/" + props.id} className="troupe-img"><img style={{ borderRadius: "4px" }} src={setActorCardPic()} /></Link>
      <div className="troupe-details col">
        <Link to={"/person/" + props.id} className="name">{props.name}</Link>
        <p className="character">{props.character}</p>
      </div>
    </div>

  </div>
}

export default Troupe