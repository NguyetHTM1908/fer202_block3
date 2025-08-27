import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function LoginPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const params = new URLSearchParams(loc.search);
  const redirect = params.get('redirect_uri') || '/products';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form
      if (!email.trim() || !password.trim()) {
        setError('Vui lòng nhập đầy đủ email và mật khẩu');
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setError('Email không đúng định dạng');
        return;
      }

      // Call API to check login
      const { data } = await api.get(`/accounts?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(password)}`);
      
      if (Array.isArray(data) && data.length > 0) {
        const userData = data[0];
        if (userData.isActive) {
          login(userData);
          showSuccess('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
          nav(redirect, { replace: true });
        } else {
          setError('Tài khoản đã bị khóa. Vui lòng liên hệ admin.');
        }
      } else {
        setError('Email hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // nếu đã login thì quay về
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (u) nav(redirect, { replace: true });
  }, [nav, redirect]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <Card className="shadow border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaSignInAlt size={48} className="text-primary mb-3" />
                <h2 className="fw-bold">Đăng nhập</h2>
                <p className="text-muted">Vui lòng đăng nhập để tiếp tục</p>
              </div>

              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Mật khẩu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="py-2 pe-5"
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="position-absolute end-0 top-0 h-100 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ zIndex: 10 }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={isLoading}
                    className="py-2"
                  >
                    {isLoading ? 'Đang đăng nhập...' : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Đăng nhập
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
