/* eslint-disable react/prop-types */
import React from "react";
import Card from "../../shared/UIElement/Card";
import "./PlaceItem.css";
import Button from "../../shared/FormElements/Button.jsx";
import { useState } from "react";
import Modal from "../../shared/UIElement/Modal.jsx";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const [showConfirmedModal, setShowConfirmedModal] = useState(false);

  const showDeletionWarningHandler = () => {
    setShowConfirmedModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmedModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmedModal(false)
    console.log("DELETING...");
  };

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-iten__modal-content"
        footerClass="place-iten__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>The Map</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmedModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item_modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Do you wnat to proceed and delete this place? Please note that it</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`places/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeletionWarningHandler}>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
