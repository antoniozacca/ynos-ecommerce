import { createContext, useContext, useEffect, useState } from 'react'

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || []
    setWishlist(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    if (!wishlist.find(p => p.id === product.id)) {
      setWishlist([...wishlist, product])
    }
  }

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(p => p.id !== id))
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
