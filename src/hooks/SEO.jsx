import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Mohamed Emara | 3D Portfolio & React Developer',
  description = 'Explore Mohamed Emara’s 3D portfolio. Interactive React, Three.js, and modern frontend projects showcasing web design, animations, and UI/UX.',
  url = 'https://mohamedemara.site/',
  image = 'https://mohamedemara.site/preview.jpg',
}) => {
  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="3D portfolio, React developer, frontend developer, Three.js projects, web design, UI/UX, Egypt web developer"
      />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mohamed Emara Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
