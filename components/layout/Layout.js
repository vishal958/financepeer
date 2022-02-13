import Head from "next/head";
import Link from "next/link";
import { setLogout } from "../../middleware/utils";

export default function Layout({ children, profile }) {
  function handleOnClickLogout(e) {
    setLogout(e);
  }
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {!profile ? (
        <div className="title">
          <Link href={{ pathname: "/" }}>
            <a style={{ marginRight: ".75rem" }}>&bull; Login to continue</a>
          </Link>
          <Link href={{ pathname: "/signup" }}>
            <a style={{ marginRight: ".75rem" }}>&bull; Create new account</a>
          </Link>
        </div>
      ) : (
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
      )}
      {children}
    </div>
  );
}
