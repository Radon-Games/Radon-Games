import { JSX } from "solid-js";

interface IconProps {
  icon: string;
  text: string;
  href: string;
  type?: string;
}

export default function IconButton(props: IconProps): JSX.Element {
  return (
    <a
      href={props.href}
      target={/^https?:\/\//.test(props.href) ? "_blank" : "_self"}
      title={props.text}
      class="hover:text-amber-500 transition-all cubic-bezier"
    >
      <i class={`${props.type ?? "fa-regular"} ${props.icon}`}></i>
    </a>
  );
}
