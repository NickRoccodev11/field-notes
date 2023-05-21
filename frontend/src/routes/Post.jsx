import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API_BASE } from "../constants";
import CommentTree from "../components/CommentTree";
import CommentForm from "../components/CommentForm";


export default function Post() {
	const { user } = useOutletContext();
	const postId = useParams().id;
	const navigate = useNavigate();
	const formRef = useRef(null)

	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	console.log(comments, "post")

	useEffect(() => {
		fetch(API_BASE + `/api/post/${postId}`, { credentials: "include" })
			.then((res) => res.json())
			.then(({ post }) => setPost(post));
	}, [setPost, postId]);

	if (post === undefined) return null;
	else if (post === null) return <h2>Post not found</h2>;


	const handleLike = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const response = await fetch(API_BASE + form.getAttribute('action'), {
			method: form.method,
			credentials: "include"
		});
		const likes = await response.json();
		setPost((prevPost) => ({ ...prevPost, comments, likes: likes }));


	};

	const handleSubmit = (newComment) => {
		console.log("handlesub")
		setComments((prevComments) => {
			const updatedComments = [...prevComments];
			console.log(updatedComments, "beforesub")
			// Find the parent comment
			const parentComment = updatedComments.find((comment) => {
				return comment._id === newComment.parentId;
			});

			// If the parent comment was found, add the new comment as its child
			if (parentComment) {
				parentComment.children.push(newComment);
			} else {
				// If the parent comment was not found, the new comment is a top-level comment
				updatedComments.push(newComment);
			}
			console.log(comments, updatedComments, "handlesub")
			return updatedComments;
		});
	};

	const handleDelete = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		await fetch(API_BASE + form.getAttribute('action'), {
			method: form.method,
			credentials: "include"
		});
		navigate(-1);
	};
	let likeList = post.likes

	//FORMATTING LIKES STATEMENT
	let currentUser = user.userName
	let likeText;
	if (likeList.length === 0) {
		likeText = "No likes yet";
	} else if (likeList.length === 1) {
		if (likeList[0] === currentUser) {
			likeText = "You like this post";
		} else {
			likeText = `${likeList[0]} likes this post`;
		}
	} else if (likeList.length <= 3) {

		const otherLikes = likeList.filter((like) => like !== currentUser);
		const formattedLikes = otherLikes.join(", ");
		if (likeList.includes(currentUser)) {
			likeText = `You and ${formattedLikes} like this post`;
		} else {
			likeText = `${formattedLikes} like this post`;
		}
	} else {
		const otherLikes = likeList.filter((like) => like !== currentUser);
		const formattedLikes = `${otherLikes[0]}, ${otherLikes[1]}, and ${otherLikes.length - 2
			} others`;
		if (likeList.includes(currentUser)) {
			likeText = `You and ${formattedLikes} like this post`;
		} else {
			likeText = `${formattedLikes} like this post`;
		}
	}

	return (
	
			<div className="container">
				<div className="row justify-content-center mt-5">
					<div className="col-6">
						<h2>{post.title}</h2>
						<img className="img-fluid" src={post.image} alt={post.caption} />
						<div className="row justify-content-between">
							<form
								className="col-1"
								action={`/api/post/likePost/${post._id}?_method=PUT`}
								method="POST"
								onSubmit={handleLike}
							>
								<button className="btn btn-primary fa fa-heart" type="submit"></button>
							</form>
							<h3 className="col-3">Likes: {likeText}</h3>
							{post.user === user._id && (
								<form
									action={`/api/post/deletePost/${post._id}?_method=DELETE`}
									method="POST"
									className="col-3"
									onSubmit={handleDelete}
								>
									<button className="btn btn-primary fa fa-trash" type="submit"></button>
								</form>
							)}
						</div>
					</div>
					<div className="col-3 mt-5">
						<p>{post.caption}</p>
					</div>
					<CommentForm onSubmit={handleSubmit} parentId={post._id} formRef={formRef} />
					<CommentTree comments={comments} />
					<div className="col-6 mt-5">
						<Link className="btn btn-primary" to="/profile">Return to Profile</Link>
						<Link className="btn btn-danger" to="/feed">Return to Feed</Link>
					</div>
				</div>
			</div>
	)
}

	// const handleSubmit = async (commentText, parentId, event) => {
	// 	event.preventDefault();
	// 	const form= event.currentTarget
	// 	const comment = {
	// 		text: commentText,
	// 		parent: parentId,
	// 	};
	// 	try {
	// 		const response = await fetch(API_BASE + form.getAttribute('action'), {
	// 			method: form.method,
	// 			credentials: "include"
	// 		});
	// 		const newComment = response.data;
	// 		setComments([...comments, newComment]);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };