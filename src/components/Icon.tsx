export default function Icon (props) {
  return (
    <i class={ `hidden sm:block fa-${props.type ?? "regular"} fa-${props.name}` } style={ props.style }></i>
  )
}
