import { useCallback, useRef, useState } from "react";
// import Link from "next/link";
import Router, { useRouter } from "next/router";
import styles from "./search.module.css";

export default function Search() {
  const searchRef = useRef(null);
  // const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.responseArray);
          setResults(res.responseArray);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);
  
  function openInNewTab(url) {
    window.open(url).focus();
  }

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div className={styles.container} ref={searchRef}>
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Enter Stock..."
        type="text"
        value={query}
      />
      {active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((title) => (
            <li className={styles.result} key={title.ticker}>
              <p
                type="button"
                onClick={() =>
                  openInNewTab(`/company/${title.ticker}`)
                }
              >
                {title.name}
              </p>
              {/* <Link
                href={`http://localhost:3000/company/${title.ticker}`}
                as={`http://localhost:3000/company/${title.ticker}`}
              >
                <p target="_blank">{title.name}</p>
              </Link> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
