import { JSX } from "solid-js";

interface ButtonProps {
  href: string;
  text: string;
  icon: string;
}

export default function NavbarButton(props: ButtonProps): JSX.Element {
  return (
    <a href={props.href} title={props.text} class="border-expand">
      <i class={`fa-regular ${props.icon} mr-2`}></i>
      {props.text}
    </a>
  );
}
