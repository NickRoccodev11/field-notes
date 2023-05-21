import { Link } from "react-router-dom";
import { Marker } from "react-simple-maps";

const MarkerList = ({ posts = [] }) => (
<>
{posts.map(post => (
  <Link to={`/post/${post._id}`} key={post._id}>
	<Marker coordinates={post.coordinates}>
	  <circle r={8} fill="#F53" />
	</Marker>
  </Link>
))}
</> 
);

export default MarkerList;

{/* <>
{posts.map(post => (
  <Link to={`/post/${post._id}`} key={post._id}>
	<Marker coordinates={post.coordinates}>
	  <circle r={8} fill="#F53" />
	</Marker>
  </Link>
))}
</>  */}
