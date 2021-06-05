import React from "react";

const RoomFeatures = ({ room }) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features</h3>
      <div className="room-feature">
        <p>
          <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i> Guests
          ({room.guestCapacity})
        </p>
      </div>

      <div className="room-feature">
        <p>
          <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i> Beds (
          {room.numOfBeds})
        </p>
      </div>

      <div className="room-feature">
        <p>
          <i className="fa fa-cog fa-fw fa-coffee"></i> Breakfast
          <i
            className={
              room.breakfast
                ? "fa fa-check text-success ml-2"
                : "fa fa-times text-danger ml-2"
            }
            aria-hidden="true"
          />
        </p>
      </div>

      <div className="room-feature">
        <p>
          <i className="fa fa-fw fa-wifi"></i>
          {"  "} Internet
          <i
            className={
              room.internet
                ? "fa fa-check text-success ml-2"
                : "fa fa-times text-danger ml-2"
            }
            aria-hidden="true"
          />
        </p>
      </div>

      <div className="room-feature">
        <p>
          <i className="fa fa-fw fa-snowflake-o"></i>
          {"  "} Air Conditioned
          <i
            className={
              room.airConditioned
                ? "fa fa-check text-success ml-2"
                : "fa fa-times text-danger ml-2"
            }
            aria-hidden="true"
          />
        </p>
      </div>

      <div className="room-feature">
        <p>
          <i className="fa fa-fw fa-paw"></i>
          {"  "} Pets Allowed
          <i
            className={
              room.petsAllowed
                ? "fa fa-check text-success ml-2"
                : "fa fa-times text-danger ml-2"
            }
            aria-hidden="true"
          />
        </p>
      </div>

      <div className="room-feature">
        <p>
          <i className="fa fa-fw fa-signing"></i>
          {"  "} Room Cleaning
          <i
            className={
              room.roomCleaning
                ? "fa fa-check text-success ml-2"
                : "fa fa-times text-danger ml-2"
            }
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  );
};

export default RoomFeatures;
