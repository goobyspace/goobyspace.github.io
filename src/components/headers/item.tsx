import { useStateContext } from "../../state/stateContext";
function Item({
  name,
  icon,
  index,
  selected,
  hidden,
}: {
  name: string;
  icon: string;
  index: number;
  selected: boolean;
  hidden: boolean;
}) {
  const context = useStateContext();
  const { dispatch } = context ? context : { dispatch: () => {} };

  const onClick = () => {
    dispatch({
      type: "SET_CONTENT",
      payload: index,
    });
  };

  return (
    <div
      className={(hidden ? "hidden" : "item") + (selected ? " selected" : "")}
      onClick={onClick}
    >
      <img src={icon} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default Item;
