import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    images: [],
    name: "",
    currentPrice: "",
    previousPrice: "",
    description: "",
    category: "PANT'S",
    stock: ""
  });

  // Load products
  useEffect(() => {
    const saved = localStorage.getItem("admin-products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Parse error", e);
      }
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("admin-products", JSON.stringify(products));
    }
  }, [products]);

  const manualSave = () => {
    localStorage.setItem("admin-products", JSON.stringify(products));
    alert("All products saved!");
  };

  // IMAGE COMPRESSION + BASE64
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/webp', 0.8); // 80% quality WebP
        callback(compressed);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert("Only images allowed");
        return;
      }

      compressImage(file, (compressedBase64) => {
        setForm(prev => ({
          ...prev,
          images: [...prev.images, compressedBase64]
        }));
      });
    });
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: editingId || Date.now(),
      ...form,
      dateAdded: editingId ? products.find(p => p.id === editingId)?.dateAdded : new Date().toLocaleDateString('en-IN')
    };

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? newProduct : p));
      alert("Product updated!");
    } else {
      setProducts(prev => [...prev, newProduct]);
      alert("Product added!");
    }

    setForm({
      images: [], name: "", currentPrice: "", previousPrice: "",
      description: "", category: "PANT'S", stock: ""
    });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (product) => {
    setForm({ ...product });
    setEditingId(product.id);
    setShowForm(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-panel">
      <br /><br /><br /><br />

      <header className="panel-header">
        <h1>Product Management</h1>
        <div className="header-actions">
          <button className="add-btn" onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              images: [], name: "", currentPrice: "", previousPrice: "",
              description: "", category: "PANT'S", stock: ""
            });
          }}>
            + Add Product
          </button>
          <button className="save-btn" onClick={manualSave}>
            SAVE ALL
          </button>
        </div>
      </header>

      {/* FORM */}
      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Images (Auto-compressed)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                id="img-input"
                style={{ display: "none" }}
              />
              <label htmlFor="img-input" className="upload-btn">Choose Images</label>

              <div className="image-preview-grid">
                {form.images.map((src, i) => (
                  <div key={i} className="preview-wrapper">
                    <img src={src} alt="preview" />
                    <button type="button" className="remove-img" onClick={() => removeImage(i)}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="PANT'S">PANT'S</option>
                  <option value="TSHIRT'S">TSHIRT'S</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Current Price (₹) *</label>
                <input type="text" required value={form.currentPrice}
                  onChange={e => setForm({ ...form, currentPrice: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Previous Price (₹)</label>
                <input type="text" value={form.previousPrice}
                  onChange={e => setForm({ ...form, previousPrice: e.target.value })} />
              </div>
            </div>

            <div className="form-group">
              <label>Stock *</label>
              <input type="number" required min="0" value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea rows="4" required value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="form-actions">
              <button className="submit-btn" type="submit">
                {editingId ? "Update" : "Add"} Product
              </button>
              <button className="cancel-btn" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BEAUTIFUL PRODUCT TABLE BELOW */}
      <div className="modern-table-container">
        <h2>Recently Added Products ({products.length})</h2>

        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products yet. Add your first one!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="table-row">
                    <td>
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.name} className="product-thumb" />
                      ) : (
                        <div className="no-img">No Image</div>
                      )}
                    </td>
                    <td className="product-name">{p.name}</td>
                    <td><span className="category-badge">{p.category}</span></td>
                    <td>
                      <div className="price-col">
                        <span className="current">₹{p.currentPrice}</span>
                        {p.previousPrice && <span className="old">₹{p.previousPrice}</span>}
                      </div>
                    </td>
                    <td>{p.stock || "Unlimited"}</td>
                    <td>{p.dateAdded || "Today"}</td>
                    <td>
                      <button className="edit-btn-modern" onClick={() => startEdit(p)}>Edit</button>
                      <button className="delete-btn-modern" onClick={() => deleteProduct(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;