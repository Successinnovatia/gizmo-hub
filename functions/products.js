const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)
  .table("products");

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 100 });
    // console.log("######");
    // console.log(response);
    // console.log("######");

    const products = response.records.map((product) => {
      const { id, fields } = product;

      const { image, ...otherFields } = fields;

      const newFields = {
        ...otherFields,
        image: Array.isArray(image) && image.length > 0 ? image[0].url : null,
      };

      return { id, attributes: newFields };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return {
      statusCode: 500,
      body: "There was an error",
    };
  }
};

//command to run the netlify function server is npx netlify dev
