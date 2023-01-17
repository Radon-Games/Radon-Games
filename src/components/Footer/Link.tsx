import { JSX } from "solid-js";

interface FooterLinkProps {
  text: string;
  href: string;
}

export default function FooterLink(props: FooterLinkProps): JSX.Element {
  return (
    <a
      class="hover:underline hover:text-amber-500 transition-all"
      href={props.href}
      target={/^https?:\/\//.test(props.href) ? "_blank" : "_self"}
      title={props.text}
    >
      {props.text}
    </a>
  );
}
