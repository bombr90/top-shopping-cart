const Item = ({uid, title, price, image, onClick}) => {
  return(
    <div className="itemCard" id={uid}>
      <img src={image} alt=''></img>
      <div className="bold">{title}</div>
      <div >{price}</div>
      <button className="bold" onClick={onClick}>Add to Cart</button>
    </div>
  )
}

export default Item