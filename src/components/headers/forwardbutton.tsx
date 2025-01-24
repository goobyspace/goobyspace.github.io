function ForwardButton({
  moveIndex,
}: {
  moveIndex: (direction: boolean) => void;
}) {
  return (
    <div className="item arrow forward" onClick={() => moveIndex(true)}>
      <img src="forward.svg" alt="forward button" />
    </div>
  );
}

export default ForwardButton;
