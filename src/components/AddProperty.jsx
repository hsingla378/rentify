import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Textarea } from "@nextui-org/react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProperty() {
  const [values, setValues] = useState({
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearby: "",
    price: "",
    rating: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddProperty = async () => {
    try {
      const {
        place,
        area,
        bedrooms,
        bathrooms,
        nearby,
        price,
        rating,
        description,
      } = values;
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/properties",
        {
          place: place,
          area: parseInt(area) + " sqft",
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          nearby: nearby,
          price: parseInt(price),
          rating: parseInt(rating),
          description,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Property added successfully!");
      setValues({
        place: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        nearby: "",
        price: "",
        rating: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        return toast.error("You need to login first!");
      }
      toast.error("Failed to add property!");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex w-80 max-w-96 gap-4 flex-col">
          <Input
            type="text"
            label="Place Name"
            name="place"
            value={values.place}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Area (sqft)"
            name="area"
            value={values.area}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Bedrooms"
            name="bedrooms"
            value={values.bedrooms}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Bathrooms"
            name="bathrooms"
            value={values.bathrooms}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Nearby"
            name="nearby"
            value={values.nearby}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Price"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Rating"
            name="rating"
            value={values.rating}
            onChange={handleChange}
          />
          <Textarea
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <Button
            color="primary"
            className="font-bold"
            onClick={handleAddProperty}
          >
            Add Property
          </Button>
        </div>
      </div>
    </div>
  );
}
