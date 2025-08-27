import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useFavorites } from '../contexts/FavoriteContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useCart } from '../contexts/CartContext';

export default function NavBar() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { getFavoriteCount } = useFavorites();
  const { user, logout } = useAuth();
  const { showSuccess, showInfo } = useToast();
  const { getCartCount } = useCart();

  const handleLogout = () => {
    logout();
    showSuccess('Đăng xuất thành công!');
  };

  const handleShowFavorites = () => {
    showInfo(`Bạn có ${getFavoriteCount()} sản phẩm yêu thích`);
  };

  const handleShowCart = () => {
    showInfo(`Giỏ hàng có ${getCartCount()} sản phẩm`);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/products">My Shop</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleShowFavorites}>
              <FaHeart />{' '}
              <Badge bg="secondary">{getFavoriteCount()}</Badge>
            </Nav.Link>
            <Nav.Link onClick={handleShowCart}>
              <FaShoppingCart />{' '}
              <Badge bg="secondary">{getCartCount()}</Badge>
            </Nav.Link>
            {user ? (
              <Nav.Link onClick={handleLogout} className="text-danger">
                <FaSignOutAlt /> Logout ({user.email})
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate(`/login?redirect_uri=${encodeURIComponent(loc.pathname + loc.search)}`)}>
                <FaSignInAlt /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
