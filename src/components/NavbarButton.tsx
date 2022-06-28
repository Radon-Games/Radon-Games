import Icon from "./Icon";

export default function NavbarButton (props) {
  return (
    <a class="flex items-center px-3 h-full border-gray-900 border-b-2 hover:border-amber-500" href={props.href}>
      <Icon name={ props.icon } style="font-size:0.9em;margin-top: 0.2em;"/>
      <span class="hidden sm:block">  &nbsp;</span>
      {props.children}
    </a>
  );
}
