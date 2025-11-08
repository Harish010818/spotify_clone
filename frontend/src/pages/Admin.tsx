import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useUserData } from "../context/UserContext";
import { useSongData } from "../context/SongContext";


const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUserData();

  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const addAlbumHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_ADMIN_SERVICE_API_URL}/api/v1/admin/album/new`,
         formData,
        {
          // headers: { "Content-Type" : "multipart/form-data" },
          withCredentials: true
        }
      );

      console.log(data);
      toast.success(data.message);
      fetchAlbums();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addSongHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("album", album);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_ADMIN_SERVICE_API_URL}/api/v1/admin/song/new`,
        formData,
        {
          // headers: { "Content-Type" : "multipart/form-data" },
          withCredentials: true
        }
      );

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addThumbnailHandler = async (id: string) => {
    console.log("clicked");
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_ADMIN_SERVICE_API_URL}/api/v1/admin/song/${id}`,
         formData,
        {
          withCredentials: true
        }
      );
      
      console.log(data);
      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const deleteAlbum = async (id: string) => {
    if (confirm("Are you sure you want to delete this album?")) {
      setBtnLoading(true);
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_ADMIN_SERVICE_API_URL}/api/v1/admin/album/${id}`,
          {
           withCredentials: true
          }
        );

        toast.success(data.message);
        fetchSongs();
        fetchAlbums();
        setBtnLoading(false);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occured");
        setBtnLoading(false);
      }
    }
  };

  const deleteSong = async (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      setBtnLoading(true);
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_ADMIN_SERVICE_API_URL}/api/v1/admin/song/${id}`,
          {
            withCredentials: true
          }
        );

        toast.success(data.message);
        fetchSongs();
        setBtnLoading(false);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occured");
        setBtnLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  return (
  <main className="bg-gradient-to-b from-[#121212] to-[#000000] text-white p-6 sm:p-10 min-h-screen">
    {/* Go Home Button */}
    <Link
      to={"/"}
      className="inline-block bg-white hover:bg-gray-600 transition-all duration-300 text-white font-semibold py-2 px-5 rounded-full shadow-md mb-6"
    >
      ← Go to Home
    </Link>

    {/* ===== Add Album Section ===== */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 border-b border-[#2a2a2a] pb-2">
        Add Album
      </h2>
      <form
        className="bg-[#181818] hover:bg-[#202020] transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-5 w-full sm:w-[500px] mx-auto"
        onSubmit={addAlbumHandler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input w-full bg-[#2a2a2a] rounded-md text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input w-full bg-[#2a2a2a] rounded-md text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          placeholder="Choose Thumbnail"
          onChange={fileChangeHandler}
          className="auth-input w-full text-gray-300"
          accept="image/*"
          required
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-2 rounded-full transition-all duration-300"
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </button>
      </form>
    </section>

    {/* ===== Add Song Section ===== */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 border-b border-[#2a2a2a] pb-2">
        Add Song
      </h2>
      <form
        className="bg-[#181818] hover:bg-[#202020] transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-5 w-full sm:w-[500px] mx-auto"
        onSubmit={addSongHandler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input w-full bg-[#2a2a2a] rounded-md text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input w-full bg-[#2a2a2a] rounded-md text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="auth-input w-full bg-[#2a2a2a] rounded-md text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        >
          <option value="">Choose Album</option>
          {albums?.map((e, i) => (
            <option value={e.id} key={i}>
              {e.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          placeholder="Choose Audio"
          onChange={fileChangeHandler}
          className="auth-input w-full text-gray-300"
          accept="audio/*"
          required
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-2 rounded-full transition-all duration-300"
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </button>
      </form>
    </section>

    {/* ===== Added Albums ===== */}
    <section className="mt-10">
      <h3 className="text-2xl font-semibold mb-5">Added Albums</h3>
      <div className="flex flex-wrap justify-center sm:justify-start gap-6">
        {albums?.map((e, i) => (
          <div
            className="bg-[#181818] hover:bg-[#202020] transition-all duration-300 p-4 rounded-xl shadow-md w-[240px] flex flex-col items-center"
            key={i}
          >
            <img
              src={e.thumbnail}
              className="rounded-md w-full h-[200px] object-cover mb-3"
              alt={e.title}
            />
            <h4 className="text-lg font-bold truncate w-full text-center">
              {e.title}
            </h4>
            <p className="text-gray-400 text-sm truncate w-full text-center">
              {e.description}
            </p>
            <button
              disabled={btnLoading}
              className="mt-3 flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300"
              onClick={() => deleteAlbum(e.id)}
            >
              <MdDelete /> Delete
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* ===== Add Thumbnail to Songs ===== */}
    <section className="mt-14">
      <h3 className="text-2xl font-semibold mb-5">Manage Song Thumbnails</h3>
      <div className="flex flex-wrap justify-center sm:justify-start gap-6">
        {songs?.map((e, i) => (
          <div
            className="bg-[#181818] hover:bg-[#202020] transition-all duration-300 p-4 rounded-xl shadow-md w-[240px] flex flex-col items-center"
            key={i}
          >
            {e.thumbnail ? (
              <img
                src={e.thumbnail}
                className="rounded-md w-full h-[200px] object-cover mb-3"
                alt={e.title}
              />
            ) : (
              <div className="flex flex-col justify-center items-center gap-2 mb-3">
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  className="text-sm text-gray-300"
                />
                <button
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  disabled={btnLoading}
                  onClick={() => addThumbnailHandler(e.id)}
                >
                  {btnLoading ? "Please Wait..." : "Add Thumbnail"}
                </button>
              </div>
            )}
            <h4 className="text-lg font-bold truncate w-full text-center">
              {e.title}
            </h4>
            <p className="text-gray-400 text-sm truncate w-full text-center">
              {e.description}
            </p>
            <button
              disabled={btnLoading}
              className="mt-3 flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300"
              onClick={() => deleteSong(e.id)}
            >
              <MdDelete /> Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  </main>
);
};

export default Admin;
