

function FactsItem(props) {
  return (
    <dv className="facts-item">
      <p className={props.className}>
            <strong>
              <bdi>{props.name}</bdi>
            </strong>
            <p>{props.value}</p>
          </p>
    </dv>
  )
}

export default FactsItem;
