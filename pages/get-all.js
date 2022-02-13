import { useRouter } from "next/router";
import Link from "next/link";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from "../middleware/utils";
import Layout from "../components/layout/Layout";

function Blog({ blogs, profile }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  function handleOnClickLogout(e) {
    setLogout(e);
  }
  return (
    <Layout profile={profile}>
      <div className="all__blogs">
        {!profile ? (
          <a href="/">Login to continue</a>
        ) : (
          <>
            {blogs.map((ele, key) => {
              return (
                <div key={key} className="peer__companies--inner">
                  <div>
                    <b> Userid: </b>
                    <span>{ele.userId}</span>
                  </div>
                  <div className="peer--data--name">
                    <strong> Title:</strong>
                    <span>{ele.title}</span>
                  </div>
                  <div className="peer--data--name">
                    <strong> Body: </strong>
                    <span>{ele.body}</span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
}
export default Blog;
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const baseApiUrl = `${origin}/api/get-all-blog`;
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  const response = await (await fetch(baseApiUrl)).json();

  return {
    props: {
      blogs: response,
      profile,
    },
  };
}
