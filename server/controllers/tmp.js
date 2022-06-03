const updateMyProfile = asyncHandler(async (req, res) => {
  try {
    // userModel.schema.add({ pictures: [String] });
    // require("mongoose")
    //   .model("User")
    //   .schema.add({ pictures: [String] });

    console.log("userModel.schema.indexes()", userModel.schema.obj);

    const userObj = await userModel.findById(req.user.id);

    console.log("userObj", userObj);
    console.log("userObj.pictures", userObj.pictures);

    console.log("userObj.pictures?.length > 0", userObj.pictures?.length > 0);
    // console.log(
    //   "req.body.picture !== userObj.pictures[0]",
    //   req.body.picture !== userObj.pictures[0]
    // );

    if (
      req.body.picture &&
      userObj.pictures?.length > 0 &&
      req.body.picture !== userObj.pictures[0]
    ) {
      // push new picture to pictures array
      userObj.pictures.unshift(req.body.picture);
      console.log("req.body.picture", req.body.picture);
      console.log("profile", userObj.pictures);
    } else if (req.body.picture && userObj.pictures.length === 0) {
      console.log("before add", [req.body.picture]);
      userObj.pictures = [req.body.picture];
    }
    if (req.body.first_name || req.body.last_name) {
      userObj.name = req.body.first_name + " " + req.body.last_name;
    }
    await userObj.save();
    console.log("----saved userObj", userObj);
    console.log("----saved userObj.pictures:", userObj.pictures);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("profile updating error", error);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});
