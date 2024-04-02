import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <Spinner animation="grow"></Spinner>
      </div>
      <div className="d-flex justify-content-center">
        <p className="text-black">Laddar...</p>
      </div>
    </>
  );
}
