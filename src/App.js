import PostForm from "./Components/PostForm";
import PostList from "./Components/PostList";

function App() {
  return (
    <main className=" bg-[#5c5a5a] min-h-screen text-white py-5">
      <PostForm />
      <PostList />
    </main>
  );
}

export default App;
