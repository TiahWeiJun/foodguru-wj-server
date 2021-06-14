const fs = require("fs");
const path = require("path");

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

const fileResolvers = {
  Query: {
    getFiles: () => files,
  },
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const { ext } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;

      await new Promise((res) =>
        createReadStream()
          .pipe(
            fs.createWriteStream(
              path.join(__dirname, `../../public/images/${randomName}`)
            )
          )
          .on("close", res)
      );

      // const stream = createReadStream();

      // const pathName = path.join(
      // __dirname,
      // `../../public/images/${randomName}`
      // );

      // await stream.pipe(fs.createWriteStream(pathName));

      return {
        url: `https://foodguru-wj.herokuapp.com/images/${randomName}`,
      };
    },
  },
};

module.exports = fileResolvers;
// url: `http://localhost:${process.env.PORT || 5000}/images/${randomName}`,
