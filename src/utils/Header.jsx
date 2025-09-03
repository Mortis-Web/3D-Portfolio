const Header = ({ headerText }) => {
  return (
    <h2 className="text-gray_gradient group-hover:brightness-150 duration-400 brightness-110 select-none font-orbitron mb-6 cool_shadow text-2xl xs:text-4xl font-bold">
      {headerText}
    </h2>
  );
};

export default Header;
