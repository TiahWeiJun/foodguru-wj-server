const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const s3 = new S3({
  accessKeyId: "AKIAXJCOM7XNSC45PGMI",
  secretAccessKey: "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",
  region: "ap-southeast-1",
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

    const key = generateRandomString();

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

exports.uploadFile = uploadFile;
