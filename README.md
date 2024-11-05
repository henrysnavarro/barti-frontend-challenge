This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The web application starts with a loader image, and sends a query to the [Disney Characters API](https://api.disney.dev/character) with no query parameters. The API's URL is stored as a configuration variable in the .env.local file.

Each change to the search text triggers a query to the said API. The search text is used as a query parameter in the URL, per the API rule.

The said API has a fixed return count of 50 Disney characters. Only the first n characters (n being equal to the NEXT_PUBLIC_DEFAULT_CHARACTER_COUNT value in the .env.local file as well) are shown at the most. From the same set of returned 50 characters, the ones to be shown in the "Featured Characters!" section are randomly selected.

The rest of the application behavior aligns with the requirements that were provided separately in this [online document](https://docs.google.com/document/d/1A0vzejKfHYXPC9eSY7dqBEkSlZj-fmEPcvZAbtQT10U/edit?tab=t.0) and the Figma file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
