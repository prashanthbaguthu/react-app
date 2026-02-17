import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash, FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";
import "react-toastify/dist/ReactToastify.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import your Loader component
import Loader from "../components/Loader.jsx"; 

function ImageUpload() {
  // ===============================
  // ✅ State Variables
  // ===============================
  const [files, setFiles] = useState([]); // Files selected but not yet uploaded
  const [previewImages, setPreviewImages] = useState([]); // Preview for selected files
  const [uploadedImages, setUploadedImages] = useState([]); // Images already uploaded
  const [loading, setLoading] = useState(false); // Loader state

  // ===============================
  // ✅ Lightbox State
  // ===============================
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ===============================
  // ✅ Load Uploaded Images from API on mount
  // ===============================
  useEffect(() => {
    loadUploadedImages();
  }, []);

  const loadUploadedImages = async () => {
    debugger;
    setLoading(true); // Show loader when fetching
    try {
      const response = await fetch("http://localhost:5292/api/ImageUpload");
      const data = await response.json();
      setUploadedImages(data);
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };

  // ===============================
  // ✅ Drag & Drop Upload
  // ===============================
  const onDrop = useCallback((acceptedFiles) => {
    // Add files to state
    setFiles((prev) => [...prev, ...acceptedFiles]);

    // Generate preview URLs
    const previews = acceptedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      tempId: Math.random().toString(36).substr(2, 9),
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  // ===============================
  // ✅ Upload Images to API
  // ===============================
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select images to upload");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setLoading(true); // Show loader during upload
    try {
      await fetch("http://localhost:5292/api/ImageUpload/upload-multiple", {
        method: "POST",
        body: formData,
      });
      toast.success("Images uploaded successfully!");
      setFiles([]);
      setPreviewImages([]);
      // Reload uploaded images
      loadUploadedImages();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false); // Hide loader after upload
    }
  };

  // ===============================
  // ✅ Delete Uploaded Image
  // ===============================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true); // Show loader during deletion
    try {
      await fetch(`http://localhost:5292/api/ImageUpload/${id}`, {
        method: "DELETE",
      });

      toast.success("Image deleted successfully!");
      loadUploadedImages();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false); // Hide loader after deletion
    }
  };

  // ===============================
  // ✅ Open Lightbox
  // ===============================
  const openLightbox = (index, source) => {
    let images = [];

    if (source === "preview") {
      images = previewImages.map((img) => img.previewUrl);
    }

    if (source === "uploaded") {
      images = uploadedImages.map(
        (img) =>
          `http://localhost:5292${img.filePath.replace(/\\/g, "/")}`
      );
    }

    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // ===============================
  // ✅ UI Return
  // ===============================
  return (
    <div className="container mt-4">
      {/* Loader */}
      {loading && <Loader />}

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      <h3 className="fw-bold mb-3">📸 Image Upload Manager</h3>

      {/* ================= Drag & Drop ================= */}
      <div
        {...getRootProps()}
        className={`border p-4 text-center rounded mb-3 ${
          isDragActive ? "bg-light" : ""
        }`}
        style={{
          cursor: "pointer",
          borderStyle: "dashed",
        }}
      >
        <input {...getInputProps()} />
        <p className="mb-0">
          Drag & drop images here, or click to select files
        </p>
      </div>

      {/* ================= Upload Button ================= */}
      <button className="btn btn-primary mb-4" onClick={handleUpload}>
        <FaUpload className="me-2" />
        Upload Images
      </button>

      {/* ================= Preview Images ================= */}
      {previewImages.length > 0 && (
        <>
          <h5 className="fw-bold mt-3">Preview Images</h5>
          <div className="row g-3 mt-2">
            {previewImages.map((img, index) => (
              <div className="col-6 col-md-3 col-lg-2" key={img.tempId}>
                <img
                  src={img.previewUrl}
                  alt="preview"
                  className="img-fluid rounded shadow-sm"
                  style={{
                    height: "110px",
                    width: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => openLightbox(index, "preview")}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= Uploaded Images Grid ================= */}
      <h5 className="fw-bold mt-5">Uploaded Images</h5>
      <div className="row g-3 mt-2">
        {uploadedImages.map((img, index) => {
          const src = `http://localhost:5292${img.filePath.replace(/\\/g, "/")}`;
          return (
            <div className="col-6 col-md-3 col-lg-2" key={img.imageId}>
              <div style={{ position: "relative" }}>
                {/* Image */}
                <img
                  src={src}
                  alt="uploaded"
                  className="img-fluid rounded shadow-sm"
                  style={{
                    height: "110px",
                    width: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => openLightbox(index, "uploaded")}
                />

                {/* Delete Button */}
                <button
                  className="btn btn-danger btn-sm"
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    borderRadius: "50%",
                  }}
                  onClick={() => handleDelete(img.imageId)}
                >
                  <FaTrash />
                </button>

                {/* Image Details */}
                <div className="text-center mt-2">
                  <small>
                    <b>ID:</b> {img.imageId}
                  </small>
                  <br />
                  <small>
                    <b>Name:</b> {img.fileName}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Uploaded Images Table ================= */}
      <h5 className="fw-bold mt-5">📋 Uploaded Image Details</h5>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ImageId</th>
            <th>FileName</th>
            <th>FilePath</th>
            <th>UploadedAt</th>
          </tr>
        </thead>
        <tbody>
          {uploadedImages.map((img) => (
            <tr key={img.imageId}>
              <td>{img.imageId}</td>
              <td>{img.fileName}</td>
              <td>{img.filePath}</td>
              <td>{img.uploadedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= Lightbox ================= */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxImages.map((src) => ({ src }))}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </div>
  );
}

export default ImageUpload;
