function BackButton({
  moveIndex,
}: {
  moveIndex: (direction: boolean) => void;
}) {
  return (
    <div className="item arrow back" onClick={() => moveIndex(false)}>
      <img src="back.svg" alt="back button" />
    </div>
  );
}

export default BackButton;
