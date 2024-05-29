const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)
  .table("orders");

exports.handler = async (event) => {
  try {
    const userEmail = event.queryStringParameters.email;

    // console.log(userEmail);

    const response = await airtable.list({
      maxRecords: 100,
      filterByFormula: `{userEmail} = "${userEmail}"`,
    });

    // console.log(Object.keys(orders.records[0].fields));

    const orders = response.records.map((order) => {
      const { id, fields } = order;
      return { id, attributes: fields };
    });

    // console.log(orders);

    return {
      statusCode: 200,
      body: JSON.stringify(orders),
    };
  } catch (error) {
    console.log(`there was an error getting the orders, ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "server error" }),
    };
  }
};
