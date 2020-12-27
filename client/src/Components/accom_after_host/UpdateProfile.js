import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./ListSpace.css";
import { useForm } from "react-hook-form";
import Upload from "./ImageUploader";
import { AuthContext } from "../../Context/AuthContext";
import { Spinner } from "react-bootstrap";
import { Select } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function UpdateProfile(props) {
  const [allData, setallData] = useState();
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState();
  const authContext = useContext(AuthContext);
  const { userId, token } = authContext;
  const history = useHistory();
  const [img, setImg] = useState();

  //update data form onChane
  const changeInputValueHandler = e => {
    const name = e.target.name;
    setSource({
      ...source,
      [name]: e.target.value,
    });
    console.log(source);
  };

  //undate handler
  const updatePlaceHandler = placeId => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`,
        source,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        console.log(res.data);
        history.push("/edit_profile/edit");
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  // *****image**********//
  const image = img => {
    setImg(source.image);
  };
  const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  // *****print data in console*******
  const onSubmitHandler = e => {
    e.preventDefault();
    updatePlaceHandler(allData.place.id);
    history.push("/edit_profile/edit");
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${props.match.params.id}`
      )
      .then(res => {
        const {
          placeType,
          numberOfGuests,
          numberOfRooms,
          numberOfbeds,
          title,
          address,
          city,
          price,
          description,
          image,
        } = res.data.place;
        const placeData = {
          placeType,
          numberOfGuests,
          numberOfRooms,
          numberOfbeds,
          title,
          address,
          city,
          price,
          description,
          image,
        };
        setSource(placeData);
        setallData(res.data);
        console.log(res);
      });
  }, []);

  if (!source) {
    return (
      <div
        className="text-center d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    // console.log(source);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-12 ">
            <div className="acco-container">
              <div className="steps">
                <br />
                <h3 style={{ color: "#00DFC8" }}>Update Your Place</h3>
              </div>
              <form onSubmit={onSubmitHandler}>
                {/* place-guest */}
                <div className="place-guest">
                  <div className="host-place">
                    <Select
                      native
                      inputProps={{
                        name: "placeType",
                        value: source.placeType,
                        onChange: changeInputValueHandler,
                        defaultValue: "Place Type",
                      }}
                      style={{ width: "100%", padding: "1rem" }}
                    >
                      <option disabled hidden>
                        Place Type
                      </option>
                      <option value="Entire place">Entire place</option>
                      <option value="Privite room">Privite room</option>
                      <option value="Shared room">Shared room</option>
                    </Select>
                  </div>

                  {/* host-guest */}
                  <div className="host-guest">
                    <Select
                      native
                      inputProps={{
                        name: "numberOfGuests",
                        value: source.numberOfGuests,
                        onChange: changeInputValueHandler,
                        defaultValue: "Number Of Guests",
                      }}
                      style={{ width: "100%", padding: "1rem" }}
                    >
                      <option disabled hidden>
                        Number Of Guests
                      </option>
                      <option aria-label="None" value="" />
                      {counter.map((guest, i) => (
                        <option
                          key={i}
                          value={`${guest}`}
                        >{`For ${guest} guest`}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* bedrooms */}
                <div className="bedrooms">
                  <Select
                    native
                    inputProps={{
                      name: "numberOfRooms",
                      value: source.numberOfRooms,
                      onChange: changeInputValueHandler,
                      defaultValue: "Number Of Bedrooms",
                    }}
                    style={{ width: "100%", padding: "1rem" }}
                  >
                    <option disabled hidden>
                      Number Of Bedrooms
                    </option>
                    <option aria-label="None" value="" />
                    {counter.map((bedroom, i) => (
                      <option
                        key={i}
                        value={`${bedroom}`}
                      >{`${bedroom} bedroom`}</option>
                    ))}
                  </Select>
                </div>

                {/* Number of beds  */}
                <Select
                  native
                  inputProps={{
                    name: "numberOfbeds",
                    value: source.numberOfbeds,
                    onChange: changeInputValueHandler,
                    defaultValue: "Number Of Beds",
                  }}
                  style={{ width: "100%", padding: "1rem" }}
                >
                  <option disabled hidden>
                    Number Of Beds
                  </option>
                  <option aria-label="None" value="" />
                  {counter.map((bed, i) => (
                    <option key={i} value={`${bed}`}>{`${bed} bed`}</option>
                  ))}
                </Select>

                {/* Accomedation Details */}
                <h5 className="acco-details " style={{ color: "#00DFC8" }}>
                  Accomedation Details
                </h5>

                <div className="place-guest">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    id="Adress"
                    value={source.title}
                    onChange={changeInputValueHandler}
                  />
                </div>
                <div className="place-guest">
                  <input
                    type="text"
                    name="address"
                    value={source.address}
                    onChange={changeInputValueHandler}
                    placeholder="Address"
                    id="Adress"
                  />
                </div>
                <div className="place-guest">
                  <input
                    type="text"
                    name="city"
                    value={source.city}
                    onChange={changeInputValueHandler}
                    placeholder="City"
                    id="City"
                  />
                </div>
                <div className="city-state pt-2">
                  <div className="price-input">
                    <input
                      type="number"
                      name="price"
                      value={source.price}
                      onChange={changeInputValueHandler}
                      placeholder="Price Per Nigth $"
                    />
                  </div>
                </div>

                <div className="place-guest">
                  <input
                    type="text"
                    name="description"
                    value={source.description}
                    onChange={changeInputValueHandler}
                    placeholder="Describtion"
                    id="Describe"
                  />

                  <Upload image={image} />
                </div>

                {/* Continue btn  */}
                <input type="submit" value="Update" className="update-btn" />
              </form>
            </div>
          </div>
          <div className="col-lg-5 d-none d-xl-flex flex-direction-start">
            <img
              src="https://a0.muscache.com/airbnb/static/packages/photos.6f837cb4.png"
              alt="Flower pic"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateProfile;
