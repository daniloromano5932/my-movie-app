function FactsItem(props) {
  return (
    <div className="facts-item">
      <p className={props.className}>
            <strong>
              <bdi>{props.name}</bdi>
            </strong>
            <p>{props.value}</p>
          </p>
    </div>
  )
}

export default FactsItem;
