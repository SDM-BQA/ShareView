import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PlaceList from "../components/PlaceList";



const UserPlaces = (props) => {
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Tajmahal",
      description: "7 Wonder's of the world",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSNULb-ekVZasVOCr_y4-HmpFhcothsGWvWFuYbQxhn_t_DCZxaL14mzAGDmpGcU8q15Ah1bbU7vxclTAVq3Mft-vbTe3uvvIyzqjCCsD8",
      address: "Dharmapuri Forest Colony Tajganj Agra Uttar Pradesh 282001",
      location: {
        lat: 27.1751,
        lng: 78.0421,
      },
      creatorId: "u1",
    },
    {
      id: "p2",
      title: "Tmahal",
      description: "7 Wonder's of the world",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSNULb-ekVZasVOCr_y4-HmpFhcothsGWvWFuYbQxhn_t_DCZxaL14mzAGDmpGcU8q15Ah1bbU7vxclTAVq3Mft-vbTe3uvvIyzqjCCsD8",
      address: "Dharmapuri Forest Colony Tajganj Agra Uttar Pradesh 282001",
      location: {
        lat: 27.1751,
        lng: 78.0421,
      },
      creatorId: "u2",
    },
  ];

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(
    (place) => place.creatorId === userId
  );
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
