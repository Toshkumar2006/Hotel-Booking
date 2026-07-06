import { useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Hotel ID : {id}
      </h1>
    </div>
  );
}

export default HotelDetails;
