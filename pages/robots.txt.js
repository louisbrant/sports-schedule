import config from "./../config/config.json";
const siteMapUrl = config.API_URL + "/sitemap";

const Robots = ({ txt }) => <>{txt}</>;

export function getStaticProps() {
  const txt = `User-agent: *
    Disallow:
    Sitemap: ${siteMapUrl}`;

  return {
    props: {
      txt,
    },
  };
}

export default Robots;