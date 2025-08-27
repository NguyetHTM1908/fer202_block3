import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import { formatPrice, assetUrl } from '../utils/format';

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products/${id}`);
      setP({
  id: data.id,
  name: data.title || data.name,
  image: assetUrl(data.image) || `https://picsum.photos/seed/${data.id}/800/600`,
  price: data.price,
  description: data.description
});
    })();
  }, [id]);

  if (!p) return <Container className="py-4">Loading...</Container>;

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
<Image
  src={p.image}
  alt={p.name}
  fluid
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://picsum.photos/seed/${p.id}/800/600`;
  }}
/>        </Col>
        <Col md={6}>
          <h2>{p.name}</h2>
          <Badge bg="primary" className="mb-3">{formatPrice(p.price)}</Badge>
          <p>{p.description}</p>
        </Col>
      </Row>
    </Container>
  );
}
