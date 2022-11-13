import PostList from "./Features/Post/PostList";
import AddPostForm from "./Features/Post/AddPostForm";

function App() {
  return (
    <main className="main">
      <div className='container'>
        <PostList />
        <AddPostForm />
      </div>
    </main>
  );
}

export default App;
