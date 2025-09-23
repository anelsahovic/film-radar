export default function Loader() {
  return (
    <div className="loader relative">
      <div className="clapper"></div>
      <div className="board"></div>
      <span className="absolute bottom-0 translate-y-7 right-1/2 translate-x-1/2 animate-pulse">
        Loading...
      </span>
    </div>
  );
}
