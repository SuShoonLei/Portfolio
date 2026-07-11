import DecryptedText from "../DecryptedText.jsx";
import { DT_SECTION } from "../data/portfolio.js";

export function SectionTitleDecrypt({ prefix, accent }) {
  return (
    <h2 className="sec-title">
      {prefix}{" "}
      <span className="sec-title-accent-inline">
        <DecryptedText text={accent} {...DT_SECTION} />
      </span>
    </h2>
  );
}
