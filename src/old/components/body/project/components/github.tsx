export default function Github({ url }: { url: string }) {
  return url.length <= 0 ? null : (
    <a className="github" href={url} target="_blank">
      <img src="github-mark.svg" alt="github icon" />
    </a>
  );
}
