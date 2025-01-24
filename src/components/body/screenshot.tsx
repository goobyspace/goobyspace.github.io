function Screenshot({ screenshot }: { screenshot: string }) {
  return (
    <img
      loading="lazy"
      className="screenshot"
      src={screenshot}
      alt={"screenshot"}
    />
  );
}

export default Screenshot;
