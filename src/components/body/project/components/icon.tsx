function Icon({ icon }: { icon: string }) {
  return (
    <img
      className={icon.includes(".svg") ? "icon svg" : "icon"}
      src={icon}
      alt={"icon"}
    />
  );
}

export default Icon;
