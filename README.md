# DishDrop - Food Sharing Platform

DishDrop is a food sharing web application that connects people with surplus food to those in need, helping reduce food waste and build stronger communities.

## Features

- **User Authentication:** Sign up, sign in, and sign out securely.
- **Food Listings:** Browse available foods shared by the community.
- **Add Food:** Authenticated users can add new food items to share.
- **Manage My Foods:** Users can view, update, and delete their shared foods.
- **Food Requests:** Users can request food and manage their requests.
- **Profile Management:** Update user profile and avatar.
- **Dark Mode:** Toggle between light and dark themes.
- **Responsive Design:** Works on desktop and mobile devices.

## Tech Stack

- **Frontend:** React, React Router, Context API
- **Styling:** Tailwind CSS, DaisyUI
- **Notifications:** React Toastify
- **Backend:** [API server](https://server-site-alpha-umber.vercel.app/) (not included in this repo)
- **Authentication:** Firebase

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/foob-sharing.git
    cd foob-sharing
    ```

2. **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Configure Firebase:**
    - Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials.

4. **Start the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

## Folder Structure

```
src/
  ├── context/           # Authentication and global state
  ├── pages/             # Main page components (Home, Navbar, etc.)
  ├── DarkMode/          # Theme toggle components
  ├── firebase/          # Firebase config
  ├── hooks/             # Custom React hooks
  ├── layouts/           # Layout components
  ├── router/            # React Router configuration
  ├── routes/            # Route guards (e.g., PrivateRoute)
  ├── utils/             # Utility functions
  ├── App.jsx
  └── main.jsx
```

## Deployment

To build for production:

```sh
npm run build
```

Then deploy the `dist` folder to your preferred hosting provider.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

Made with ❤️ for the food
