import { useEffect, useState } from "react";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

import PostList from "../components/PostList";
import { API_BASE } from "../constants";
import MarkerList from "../components/MarkerList";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_BASE + "/mapfeed", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <h1>55</h1>
      <ComposableMap projection="geoAlbers">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>
        <MarkerList posts={posts} />
		{/* <Marker coordinates={[-80.006, 49.7128]}>
          <circle r={8} fill="#F53" />
        </Marker> */}
      </ComposableMap>
    </>
  );
}
