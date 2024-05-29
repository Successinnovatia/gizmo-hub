const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)
  .table("products");

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const response = await airtable.retrieve(id);

      if (response.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }

      const { id: productId, fields } = response;

      const { image, ...otherFields } = fields;

      const newFields = {
        ...otherFields,
        image: Array.isArray(image) && image.length > 0 ? image[0].url : null,
      };

      const product = { id: productId, attributes: newFields };

      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      console.log(`error fetching product ${error.message}`);
      return {
        statusCode: 500,
        body: "server error",
      };
    }
  }
  return {
    statusCode: 400,
    body: "Product id must be provided",
  };
};
