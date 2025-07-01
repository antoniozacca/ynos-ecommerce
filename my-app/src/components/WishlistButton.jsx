import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some(p => p.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="btn btn-link p-0"
      aria-label={isInWishlist ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
      style={{ fontSize: '1.5rem', color: isInWishlist ? 'red' : 'gray' }}
      title={isInWishlist ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
    >
      {isInWishlist ? '❤️' : '🤍'}
    </button>
  );
};

export default WishlistButton;
