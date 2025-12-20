import mongoose from "mongoose";

export const transformIds = (resourceName) => {
  return (req, res, next) => {
    const originalJson = res.json;

    res.json = function (data) {
      const transformed = transformData(data, resourceName);
      return originalJson.call(this, transformed);
    };

    next();
  };
};

function transformData(data, resourceName) {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => transformData(item, resourceName));
  }

  if (typeof data === "object") {
    const plainData = data.toObject && typeof data.toObject === "function"
      ? data.toObject()
      : data;

    const transformed = {};

    for (let key in plainData) {
      if (plainData.hasOwnProperty(key)) {
        let value = plainData[key];

        // Convert ObjectId to string
        if (value instanceof mongoose.Types.ObjectId) {
          value = value.toString();
        } else if (typeof value === "object" && value !== null) {
          value = transformNestedData(value);
        }

        transformed[key] = value;
      }
    }

    // Rename top-level _id
    if (plainData._id) {
      transformed[`${resourceName}_id`] = plainData._id.toString();
      delete transformed._id;
    }

    return transformed;
  }

  return data;
}

function transformNestedData(data) {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => transformNestedData(item));
  }

  if (typeof data === "object") {
    const plainData = data.toObject && typeof data.toObject === "function"
      ? data.toObject()
      : data;

    const transformed = {};

    for (let key in plainData) {
      if (plainData.hasOwnProperty(key)) {
        let value = plainData[key];

        if (value instanceof mongoose.Types.ObjectId) {
          value = value.toString();
        } else if (typeof value === "object" && value !== null) {
          value = transformNestedData(value);
        }

        transformed[key] = value;
      }
    }

    return transformed;
  }

  return data;
}

export default transformIds;
