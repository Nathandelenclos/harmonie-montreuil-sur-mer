# Harmonie Montreuil sur Mer

This project was developed for Harmonie de Montreuil sur Mer. The base and design were created by v0 to provide a modern and efficient interface built with Next.js.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

This project offers a web interface designed to showcase Harmonie de Montreuil sur Mer. It was developed with Next.js to ensure optimized performance and smooth navigation. The base and design were created by v0, enabling a modern and intuitive user experience.

## Technologies Used

- **Next.js**: A React framework for building performant web applications.
- **React**: A JavaScript library for creating user interfaces.
- Additional tools and libraries from the JavaScript ecosystem to enhance development and performance.

## Installation

To clone and set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nathandelenclos/harmonie-montreuil-sur-mer.git
   cd harmonie-montreuil-sur-mer
   ```
   
2. **Install dependencies :**
   Use npm or yarn:
   ```bash
    npm install
    # or
    yarn install
    ```
   
3. **Run the development server:** 
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
4. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Usage
Once the development server is running, explore the application to discover its features and modern design. The project is designed to be easily extendable and modifiable to suit your needs.

## Project Structure

The project is organized as follows:

- /pages: Contains the main application pages generated with Next.js.
- /components: Reusable components for building the user interface.
- /public: Static resources (images, icons, etc.).
- /styles: Stylesheets and CSS configurations.
- /utils: Utility functions and additional logic.

This structure promotes clear organization and easy maintenance.

## Contributing

Contributions are welcome! To contribute to the project:

1. Fork the project.
2. Create a new branch for your feature:
    ```bash
    git checkout -b feature/my-new-feature
    ```
3. Commit your changes:
    ```bash
    git commit -am 'Add a new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/my-new-feature
    ```
5. Open a Pull Request on GitHub.

Thank you for following the project's contribution guidelines and code of conduct.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, you can open an issue on GitHub or contact me directly via my GitHub profile [@Nathandelenclos](https://github.com/Nathandelenclos).




## Validation and deployment

Use Node.js 22.12+ (Node.js 24 LTS recommended) and the tracked npm lockfile:

```sh
npm ci
npm test
npm run lint
npm run build
npm audit --omit=dev
```

The regression tests mock CAPTCHA and SMTP: they never send real email. Browser checks
must cover a failed submission and retry, the mobile menu with Tab/Escape, 320px layouts,
contrast, and the concert's date, booking link and metadata.

The production application uses Next.js 15.5 and React 19. The npm overrides keep
PostCSS and its selector parser on patched versions. As of 2026-10-12, seven audit
alerts remain in development-only tooling through `braces` (no patched release).
Do not run that tooling on untrusted source/glob expressions; revisit the dependency
chain when an upstream fix is available. `npm audit --omit=dev` is clean.

### Email configuration

In the Vercel project environment, provide `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public),
`RECAPTCHA_SECRET_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` (server only).
Register `harmonie-montreuil-sur-mer.fr` in reCAPTCHA; add localhost only to a separate
development key. The production route allows the exact canonical origin, and the
CAPTCHA hostname/action/score are verified. Preview domains are intentionally rejected.
The recipient is fixed server-side to the association and cannot be supplied by visitors.

Remove obsolete `NEXT_PUBLIC_EMAIL_API_SECRET` and `EMAIL_API_SECRET` from deployment
settings: the previous public value is no longer used for authorization. Never reuse
that value for another service. Do not print or commit environment values.

The in-process cap is 20 attempts/minute, with bounded CAPTCHA/SMTP timeouts. On Vercel,
configure a shared firewall rate-limit rule for POST `/api/send-email` if abuse occurs:
the code-level quota is per instance and resets at deployment. It is not a distributed
quota. CAPTCHA remains required. Review Vercel/SMTP operational limits before campaigns.

The Vercel project owner manages secret rotation: generate a replacement SMTP credential
or CAPTCHA secret in the provider console, update the server-only Vercel variable,
redeploy, verify delivery with an authorized test, then revoke the old credential.
If a secret leaks, revoke it immediately and replace it; never paste it into logs/issues.
Use separate development/production credentials and review access at each bureau handover.

### Content and privacy

Events live in `data/Events.ts`. Use an explicit timezone in both `date` and `archiveAfter`.
The homepage, list and event pages revalidate every five minutes: after `archiveAfter`,
the concert moves to the archive and its booking button disappears (up to one cache
refresh after the boundary). The sitemap lists published pages only.

The site loads no audience analytics or social widget. The embedded Google Map loads
only after the visitor activates it; reCAPTCHA loads only upon form submission. Legal details were supplied by the association; Vercel's
address is sourced from https://vercel.com/legal/privacy-notice. The association remains
responsible for mailbox retention and handling privacy requests; the site does not
implement automatic mailbox deletion. The legal/privacy text is not a legal certification.

Before publishing, verify the actual Vercel environment, DNS/canonical domain, SMTP
credentials and CAPTCHA configuration. No deployment or live email test is implied by
a successful local build.
