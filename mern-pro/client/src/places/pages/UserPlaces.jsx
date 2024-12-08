import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PlaceList from "../components/PlaceList";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect, useState } from "react";
import ErrorModal from "../../shared/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/UIElement/LoadingSpinner";

const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState(null);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
        console.log(responseData.places);
        
      } catch (err) {
        console.log(err);
        setLoadedPlaces(null)
      }
    };
    fetchPlaces()
  }, [sendRequest, userId]);

  return (
  <>
  {/* <ErrorModal error={error} onClear={clearError}/> */}
  {isLoading && (
    <div className="center">
      <LoadingSpinner/>
    </div>
  )}
  {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />};
  </>
  )
};

export default UserPlaces;
