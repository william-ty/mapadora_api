module.exports = {
  isPhotoCorrect: async (photo) => {
    // Verifications
    const ctrl_path =
      photo.path && typeof photo.path == "string" && photo.path.length > 0;
    let ctrl_point = true;

    //! CAN BE NULLABLE
    if (photo.point) {
      const lng = photo.point.coordinates[0];
      const lat = photo.point.coordinates[1];
      ctrl_point = typeof lat == "number" && typeof lng == "number";
    }

    return ctrl_path && ctrl_point;
  },
};
