const Card = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border">
      <div className="px-6 py-4 text-transparent text-4xl m-4 px-4 bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-transparent text-xl m-4 px-4 bg-clip-text bg-gradient-to-r from-indigo-400 to-green-400">
          {props.body}
        </p>
      </div>
    </div>
  );
};
export default Card;
