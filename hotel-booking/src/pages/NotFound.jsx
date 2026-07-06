import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>

      <Link
        to="/"
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Home
      </Link>
    </div>
  );
}

export default NotFound;
