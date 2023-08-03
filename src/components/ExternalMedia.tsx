"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getObjectURL } from "~/util/bareClient";

interface Props extends React.ComponentProps<typeof Image> {
  src: string;
}

export default function ExternalMedia(props: Props): JSX.Element {
  const [resource, setResource] = useState<string>();

  useEffect(() => {
    fetchResource();

    return () => {
      URL.revokeObjectURL(resource!);
    };
  }, []);

  async function fetchResource() {
    setResource(await getObjectURL(props.src));
  }

  const { src, alt, ...passProps } = props;

  return (
    <>{resource && <Image src={resource} alt={alt} {...passProps}></Image>}</>
  );
}
