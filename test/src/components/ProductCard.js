import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { useFavorites } from '../contexts/FavoriteContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showWarning, showError } = useToast();
  const { addToCart: addToCartContext } = useCart();

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      showWarning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }
    
    addToCartContext(product.id, 1);
    showSuccess(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated()) {
      showWarning('Vui lòng đăng nhập để thêm sản phẩm vào yêu thích!');
      return;
    }
    
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(product.id);
    
    if (wasFavorite) {
      showSuccess(`Đã xóa ${product.name} khỏi yêu thích!`);
    } else {
      showSuccess(`Đã thêm ${product.name} vào yêu thích!`);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: 200, objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2">
          {product.description}
        </Card.Text>
        <div className="mb-3">
          <Badge bg="primary" className="fs-6">{formatPrice(product.price)}</Badge>
        </div>
        <ButtonGroup className="w-100">
          <Button variant="outline-primary" size="sm" className="flex-fill"
            onClick={() => navigate(`/products/${product.id}`)}>
            <FaEye className="me-1" /> View
          </Button>
          <Button variant="success" size="sm" className="flex-fill" onClick={handleAddToCart}>
            <FaCartPlus className="me-1" /> Cart
          </Button>
          <Button 
            variant={isFavorite(product.id) ? "danger" : "outline-danger"} 
            size="sm" 
            className="flex-fill" 
            onClick={handleToggleFavorite}
          >
            {isFavorite(product.id) ? (
              <>
                <FaHeartBroken className="me-1" /> Remove Fav
              </>
            ) : (
              <>
                <FaHeart className="me-1" /> Fav
              </>
            )}
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
