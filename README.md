# Glocal Travel - Your Spiritual Journey Begins Here

![Glocal Travel Homepage](https://sjc.microlink.io/xJELiKL8C-JYkw01BrOmgqV0W6MGwPFnsITauVjMvA8fp8nImdW9WbjHdkcSzKB0EXPGbTCDFgFMD0VKXTWtyQ.jpeg)

Welcome to Glocal Travel, a modern web application designed to facilitate spiritual journeys, particularly Hajj and Umrah pilgrimages, with expertly crafted packages and a seamless user experience. This project showcases a robust Next.js application with a strong focus on design, responsiveness, and user-centric features.

## Live Demo

Experience the application live at: [https://g-local-travels.vercel.app/](https://g-local-travels.vercel.app/)

## Features

*   **Elegant Black & Gold Theme:** A consistent and visually striking black and gold color palette applied throughout the application, enhancing the premium feel.
*   **Responsive Design:** Optimized for various screen sizes, ensuring a seamless experience on desktop, tablet, and mobile devices.
*   **Multi-Role Login Pages:** Dedicated and beautifully designed login/registration pages for Staff, Admin, Customer, and Agent roles, each with enhanced design and responsiveness.
*   **Dynamic Dashboards:** Comprehensive dashboards for Admin, Agent, Customer, and Staff, providing relevant information and functionalities tailored to each role.
*   **Packages Listing & Filtering:** A dedicated page to display all available travel packages with advanced filtering options (price, departure month, hotel rating, duration, features) and dynamic content based on URL parameters.
*   **Consistent Navigation:** A clean and intuitive navigation header (`GlocalNavigation`) across all pages, featuring dropdowns for "About," "Packages," and "Destinations," and a mobile-friendly sheet menu.
*   **Interactive Forms:** Forms with planned features for loading states, real-time validation, and success animations for a better user experience.
*   **About & Destinations Pages:** Dedicated sections providing information about the company (CEO speech, Vision & Mission, Organization, Awards) and various travel destinations (Asia, Middle East, Europe, Africa).

## Technologies Used

*   **Next.js 15 (App Router):** The latest React framework for building performant and scalable web applications with server-first rendering.
*   **React 19:** For building interactive user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid and consistent styling.
*   **shadcn/ui:** A collection of re-usable components built with Radix UI and Tailwind CSS, providing accessible and customizable UI primitives.
*   **Lucide React:** For beautiful and consistent iconography.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Make sure you have Node.js (v18.x or higher) and npm/yarn installed.

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/your-username/glocal-travel.git
    cd glocal-travel
    \`\`\`
    (Replace `your-username` with your actual GitHub username if you've forked the repo.)

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    \`\`\`

4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure Highlights

*   `app/`: Contains all route-based files (`page.tsx`, `layout.tsx`, `loading.tsx`) for different sections of the application.
*   `components/`: Houses reusable React components, including custom application-specific components and UI components from shadcn/ui.
*   `public/`: For static assets like images.
*   `tailwind.config.ts`: Custom Tailwind CSS configuration, including the defined gold color palette.
*   `app/globals.css`: Global CSS styles, including shadcn/ui base styles and custom theme variables.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
\`\`\`

