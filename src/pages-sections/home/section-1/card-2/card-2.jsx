import Link from "next/link";
import Image from "next/image";

// STYLED COMPONENT
import { Wrapper } from "./styles";


// ==========================================================


// ==========================================================

export default function CardTwo({
  badge,
  title,
  imgUrl,
  url
}) {
  return <Link href="/allProducts?view=grid">
      <Wrapper>
        <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

        <div className="content">
          <small className="badge">{badge}</small>
          <h2 className="title">{title}</h2>
        </div>
      </Wrapper>
    </Link>;
}