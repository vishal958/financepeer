import { useRouter } from "next/router";
import Link from "next/link";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from "../middleware/utils";

function Blog({ blogs, profile }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  function handleOnClickLogout(e) {
    setLogout(e);
  }
  return (
    <div className="all__blogs">
      {!profile ? (
        <a href="/">Login to continue</a>
      ) : (
        <>
          <div className="title" style={{ fontSize: "1.3rem", margin: "1rem" }}>
            <Link href={{ pathname: "/" }}>
              <a style={{ marginRight: ".75rem" }}>&bull; Home Page</a>
            </Link>
            <Link href={{ pathname: "/get-all" }}>
              <a style={{ marginRight: ".75rem" }}>&bull; View All</a>
            </Link>
            <a href="#" onClick={(e) => handleOnClickLogout(e)}>
              &bull; Logout
            </a>
          </div>

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
