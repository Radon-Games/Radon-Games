import { JSX } from "solid-js";

interface IconProps {
  icon: string;
  text: string;
  href: string;
}

export default function IconButton(props: IconProps): JSX.Element {
  return (
    <a
      href={props.href}
      title={props.text}
      class="hover:text-amber-500 transition-all cubic-bezier duration-500"
    >
      <i class={`fa-regular ${props.icon}`}></i>
    </a>
  );
}
