export default function Icon (props) {
  return (
    <i class={ `${props.hide === "true" ? "hidden sm:block" : ""} fa-${props.type || "regular"} fa-${props.name}` } style={ props.style }></i>
  )
}
