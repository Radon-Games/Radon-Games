import Content from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Options - Radon Games"
};

export default function Options() {
  return (
    <div>
      <Content />
    </div>
  );
}
