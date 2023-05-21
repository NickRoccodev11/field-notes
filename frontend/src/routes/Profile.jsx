import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostList from "../components/PostList";
import { API_BASE } from "../constants";
import { GeocoderAutocomplete, GeoapifyContext } from '@geoapify/geocoder-autocomplete';



export function Profile() {
  const { user, setMessages } = useOutletContext();

  const [posts, setPosts] = useState([]);

  //CHANGE THIS BACK BEFORE BUILD
  const apiKey = "40399a37d2544c0d8e6720b09488c381"



  useEffect(() => {
    fetch(API_BASE + "/api/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);



  const [autocompleteLoaded, setAutocompleteLoaded] = useState(false);


  useEffect(() => {
    if (!autocompleteLoaded) {
      const autocompleteElement = document.getElementById("autocomplete-container");
     
      if (autocompleteElement) {
        setTimeout(() => {
          const autocomplete = new GeocoderAutocomplete(
            autocompleteElement,
            apiKey,
            { inputId: "locationInput" }
          );
          
          autocomplete.on("select", (location) => {
         
          });
          autocomplete.on("suggestions", (suggestions) => {
            // ...
          });
          setAutocompleteLoaded(true);
        }, 200); // Delay of 200ms
      }
    }
  }, [autocompleteLoaded]);

// const elem =  document.getElementById("autocomplete-container")
// if(elem) elem.removeChild(elem.lastChild)



  if (!user) return null;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      const input = document.querySelector('.geoapify-autocomplete-input');
    
      const location = input.value;
      

      // fetch to geocoding API
      const myurl = `https://api.geoapify.com/v1/geocode/search?text=${location}&lang=en&limit=5&format=json&apiKey=${apiKey}`

      const response = await fetch(myurl);
      const data = await response.json();
      // console.log(data)
      const lat = data.results[0].lat;
      const lon = data.results[0].lon;

      const formData = new FormData(form);
      formData.append("lat", lat);
      formData.append("lon", lon);

      const postResponse = await fetch(API_BASE + form.getAttribute("action"), {
        method: form.method,
        body: formData,
        credentials: "include",
      });
      const json = await postResponse.json();
      if (json.messages) setMessages(json.messages);
      if (json.post) {
        setPosts([...posts, json.post]);
        form.reset();
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6">
          <div>
            <p>
              <strong>User Name</strong>: {user.userName}
            </p>
            <p>
              <strong>Email</strong>: {user.email}
            </p>
            <Link to="/logout" className="col-3 btn btn-primary">
              Logout
            </Link>
          </div>
          <div className="mt-5">
            <h2>Add a post</h2>
            <form
              action="/api/post/createPost"
              encType="multipart/form-data"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                />
              </div>
              <div className="mb-3 ">
                <label htmlFor="caption" className="form-label">
                  Caption
                </label>
                <textarea
                  className="form-control"
                  id="caption"
                  name="caption"
                ></textarea>
              </div>

              <div className="autocomplete-container" id="autocomplete-container"></div>



              <div className="mb-3">
                <label htmlFor="imgUpload" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageUpload"
                  name="file"
                />
              </div>
              <button type="submit" className="btn btn-primary" value="Upload">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col-6">
          <PostList posts={posts} />
          <div className="row justify-content-center mt-5">
            <Link className="btn btn-primary" to="/feed">
              Return to Feed
            </Link>
          </div>
        </div>
      </div >
    </div >
  );
}
