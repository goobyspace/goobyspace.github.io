function Link({ link }: { link: string }) {
  return (
    <a className="link" href={link} target="_blank">
      {link}
    </a>
  );
}

export default Link;
