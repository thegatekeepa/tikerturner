import mongoose from "mongoose";

const Connect = async () => {
  try {
    const callMongo = await mongoose.connect(process.env.MONGO_CONN);
    console.log(
        "GoMicro has connected to MongoDB."
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default Connect;