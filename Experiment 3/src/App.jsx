import React, { useState } from 'react'
import ProductCard from './components/ProductCard'
import LibrarySystem from './components/LibrarySystem'
import HierarchyDemo from './components/HierarchyDemo'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('products')

  const products = [
    { title: 'Neural Engine X', price: '$1,299', category: 'Hardware', image: '🧠' },
    { title: 'Quantum Drive', price: '$450', category: 'Storage', image: '⚛️' },
    { title: 'OLED Prism', price: '$899', category: 'Display', image: '💎' }
  ]

  return (
    <div className="app-container">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <header>
        <div className="nav-container">
          <div className="logo">Experiment <span>3</span></div>
          <div className="tab-nav">
            <button 
              className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Product Cards
            </button>
            <button 
              className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              Library System
            </button>
            <button 
              className={`tab-btn ${activeTab === 'hierarchy' ? 'active' : ''}`}
              onClick={() => setActiveTab('hierarchy')}
            >
              Class Hierarchy
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'products' && (
          <section className="fade-in">
            <h2>Reusable Components</h2>
            <p className="description">Demonstrating React props by passing data to a generic ProductCard component.</p>
            <div className="product-grid">
              {products.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'library' && (
          <section className="fade-in">
            <LibrarySystem />
          </section>
        )}

        {activeTab === 'hierarchy' && (
          <section className="fade-in">
            <HierarchyDemo />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
