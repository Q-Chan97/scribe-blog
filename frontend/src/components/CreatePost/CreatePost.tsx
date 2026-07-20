import { useRef, useState } from "react";
import { useAuth } from "../../AuthContext.tsx";
import { useNavigate } from "react-router";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const editorRef = useRef(null);

    const handleSubmit = async () => {
        if (!editorRef.current) return;

        const content = editorRef.current.getContent();

        if (!title || !content){
            setError("Title and content are required")
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${user.id}/posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, content })
        });

        if (res.ok) {
            navigate("/");
        } else {
            setError("Failed to create post");
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="title">Post Title: </label>
                <input 
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
            </div>
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist", "autolink", "lists", "link", "image",
                        "searchreplace", "visualblocks", "code", "fullscreen",
                        "insertdatetime", "media", "table", "help", "wordcount"
                    ],
                    toolbar: "undo redo | formatselect | " + 
                    "bold italic backcolor | alignleft aligncenter " + 
                    "removeformat | help",
                    content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }"
                }}
            />
            {error && <p>{error}</p>}
            <button onClick={handleSubmit}>Publish</button>
        </div>
    );
}