const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const generateRandomString = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

// upload File
const uploadFile = async (file) => {
  try {
    const { createReadStream, filename } = await file;

    const key = generateRandomString(10);

    const uploadParams = {
      Bucket: "images-wj",
      Body: createReadStream(),
      Key: `${key}/${filename}`,
    };

    return s3.upload(uploadParams).promise();
  } catch (err) {
    console.error(err);
  }
};

const deleteFile = async (key) => {
  const params = { Bucket: "images-wj", Key: key };
  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return false;
    }
    return true;
    // error
  });
};

exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
