import Head from "next/head";
import Header from "../header/Header";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      {children}
    </div>
  );
}
