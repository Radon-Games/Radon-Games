import { JSX } from "solid-js";

interface BaseButtonProps {
  text: string;
  icon: string;
  type?: string;
}

interface HrefButtonProps extends BaseButtonProps {
  href: string;
}

interface OnClickButtonProps extends BaseButtonProps {
  onClick: () => void;
}

type ButtonProps = HrefButtonProps | OnClickButtonProps;

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <a
      class="w-max bg-sky-600 rounded-full px-5 py-4 group shadow-lg cursor-pointer"
      href={(props as HrefButtonProps).href}
      onClick={(props as OnClickButtonProps).onClick}
      target={
        /^https?:\/\//.test((props as HrefButtonProps).href)
          ? "_blank"
          : "_self"
      }
    >
      <i
        class={`${props.type ?? "fa-regular"} ${
          props.icon
        } mr-2 group-hover:text-amber-500 transition-all`}
      ></i>
      {props.text}
    </a>
  );
}
