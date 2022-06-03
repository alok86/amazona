import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import data from './component/data';
import ListProduct from './component/ListProduct';
import ProductScreen from './component/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './component/Store';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/esm/Badge';
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItem.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItem.length}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<ListProduct data={data} />} />
            <Route path="product/:slug" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
