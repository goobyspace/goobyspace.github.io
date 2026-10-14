import { useStateContext } from "../../state/stateContext";
function Item({
  name,
  tag,
  selected,
  hidden,
}: {
  name: string;
  tag: string;
  selected: boolean;
  hidden: boolean;
}) {
  const context = useStateContext();
  const { dispatch } = context ? context : { dispatch: () => {} };

  const onClick = () => {
    dispatch({
      type: "SET_CONTENT",
      payload: tag,
    });
  };

  return (
    <div
      className={(hidden ? "hidden" : "item") + (selected ? " selected" : "")}
      onClick={onClick}
    >
      <h2>{name}</h2>
    </div>
  );
}

export default Item;
