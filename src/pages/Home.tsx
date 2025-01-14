import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Link to="/signup" style={{ textDecoration: "none" }}>
				<button style={{ backgroundColor: "white" }}>회원가입</button>
			</Link>
			<Link to="/login" style={{ textDecoration: "none" }}>
				<button style={{ backgroundColor: "white" }}>로그인</button>
			</Link>
		</div>
	);
}

export default Home;
