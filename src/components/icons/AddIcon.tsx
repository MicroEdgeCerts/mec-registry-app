const AccountIcon = ({
  width = "24",
  height = "24",
  strokeColor = "white",
  className=""
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`stroke-current　text-${strokeColor}　${(className? className: '')} h-6 w-6`} // Use the strokeColor prop
    fill="none"
    viewBox="0 0 24 24"
    stroke={strokeColor} // Apply strokeColor directly to the stroke attribute
    width={width}
    height={height}
  >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
  </svg>
);

export default AccountIcon;
