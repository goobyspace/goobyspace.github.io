function Screenshot({ screenshot }: { screenshot: string }) {
  return <img className="screenshot" src={screenshot} alt={"screenshot"} />;
}

export default Screenshot;
