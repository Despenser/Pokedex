const PokeBallIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 117.3c70.9 0 129.1 52.5 139.4 120.7H116.6c10.3-68.2 68.5-120.7 139.4-120.7zm0 277.4c-70.9 0-129.1-52.5-139.4-120.7h278.9c-10.4 68.2-68.6 120.7-139.5 120.7z"
      />
      <path
        fill="currentColor"
        d="M256 224c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
      />
    </svg>
  );
};

export default PokeBallIcon;
