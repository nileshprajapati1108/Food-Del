import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nileshprajapati1108:Test1234@cluster0.mowytke.mongodb.net/food-del?appName=Cluster0"
    )
    .then(() => console.log("DB Connected"));
};
