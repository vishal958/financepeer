import React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from "../middleware/utils";
import Layout from "../components/layout/Layout";

export default function About(props) {
  const { profile } = props;
  const [files, setFiles] = useState("");

  const handleChange = (e) => {
    const updatedJSON = e.target.files[0];
    if (updatedJSON.type !== "application/json") {
      alert(`${updatedJSON.type} not supported`);
      e.target.value = null;
      return;
    }

    console.log("hhh", updatedJSON.type);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (e) => {
      const data = { data: JSON.parse(e.target.result) };
      const response = await fetch(`/api/file-upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error("Error:", error);
      });
      setFiles(await response.json());
      e.target.value = null;
    };
  };
  function handleOnClickLogout(e) {
    setLogout(e);
  }

  return (
    <Layout>
      <div className="container">
        <main>
          <h1 className="title">Upload JSON</h1>
          {!profile ? (
            <a href="/">Login to continue</a>
          ) : (
            <>
              <div style={{ margin: ".5rem 0rem" }}>
                <Link href={{ pathname: "/" }}>
                  <a style={{ marginRight: ".75rem" }}>&bull; Home Page</a>
                </Link>
                <Link href={{ pathname: "/get-all" }}>
                  <a style={{ marginRight: ".75rem" }}>&bull; View All Data</a>
                </Link>
                <a href="#" onClick={(e) => handleOnClickLogout(e)}>
                  &bull; Logout
                </a>
              </div>
              <h1>Upload Json file</h1>

              <input type="file" onChange={handleChange} />
              {files && (
                <Link href={{ pathname: "/get-all" }}>
                  <a style={{ color: "lightgreen", marginRight: ".75rem" }}>
                    &bull; File uploaded successfully click to view all results
                  </a>
                </Link>
              )}

              <br />
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const baseApiUrl = `${origin}/api/about`;
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}
