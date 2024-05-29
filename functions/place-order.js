const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)
  .table("orders");

exports.handler = async (event, context) => {
  try {
    const info = JSON.parse(event.body);

    // console.log("recieved order info: ", info);

    const newOrder = {
      fields: {
        name: info.name,
        address: info.address,
        chargeTotal: info.chargeTotal,
        orderTotal: info.orderTotal,
        cartItems: JSON.stringify(info.cartItems),
        numItemsInCart: info.numItemsInCart,
        userEmail: info.userEmail,
        orderDate: new Date().toISOString(),
      },
    };

    // console.log("creating new order in airtable: ", newOrder);

    const createdOrder = await airtable.create(newOrder);

    // console.log("created new order in airtable: ", createdOrder);

    return {
      statusCode: 201,
      body: JSON.stringify({ id: createdOrder.id, ...createdOrder.fields }),
    };
  } catch (error) {
    console.log(`There was an error while creating the order ${error.message}`);

    return {
      statusCode: 500,
      body: "Server Error",
    };
    o;
  }
};
