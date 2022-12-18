import Image from "next/image";

import styles from "@/styles/Home.module.scss";

import noPoster from "@/public/img/no-poster.png";

export default function MediaPoster({ poster, title, height, width }) {
  return (
    <Image
      src={poster === "N/A" ? noPoster : poster}
      alt={title}
      height={height}
      width={width}
      className={styles.poster}
    />
  );
}
