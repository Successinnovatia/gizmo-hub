# GizmoHub

GizmoHub is a mini e-commerce store built using React, Tailwind CSS, DaisyUI, Redux Toolkit, Auth0 and Airtable. The app allows users to browse products, view featured products, manage their cart, checkout, and view their orders.

## Features

- **Authentication:** Login, logout and user functionality provided by Auth0

- **Product Listing:** Browse through a variety of products.
- **Featured Products:** View specially highlighted products.
- **Cart Functionality:** Add, update, and remove items from the cart.
- **Checkout:** Complete the purchase by providing some details.
- **Order Tracking:** View past orders and their details.

//more features to be added.

## Technologies Used

- **React**
- **Tailwind CSS**
- **DaisyUI**
- **Redux Toolkit**
- **Airtable**
- **Auth0**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Successinnovatia/gizmo-hub.git
   cd gizmohub
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Airtable and Auth0 credentials:

   ```env
   VITE_AUTH0_DOMAIN=your_auth0_domain
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_REDIRECT_URL=http://localhost:8888
   VITE_RETURN_TO=http://localhost:8888
   AIRTABLE_ACCESS_TOKEN=your_airtable_access_token
   AIRTABLE_BASE=your_airtable_base_id

   ```

4. Start the development server:

   ```bash
   npx netlify dev
   ```

## Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your preferred hosting service.

## Usage

- **Browse Products:** Explore the various products available in the store.
- **Add to Cart:** Click on a product to view details and add it to the cart.
- **Manage Cart:** View your cart, update quantities, or remove items.
- **Checkout:** Provide your details and complete the purchase.
- **View Orders:** After logging in, navigate to the orders page to view your past orders.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please contact [divinesuccess228@gmail.com](mailto:divinesuccess2228@gmail.com).

---

Thank you for visiting GizmoHub! Happy shopping!
