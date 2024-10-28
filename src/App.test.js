import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { authStore } from '../stores/authStore';

test('opens drawer on mobile when menu icon is clicked', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  
  const menuIcon = screen.getByLabelText(/menu/i);
  fireEvent.click(menuIcon);
  const drawerLink = screen.getByText(/transactions/i);
  expect(drawerLink).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders Navbar with CaixaBank logo', () => {
  render(<Navbar />);
  const logoElement = screen.getByAltText(/caixabank logo/i);
  expect(logoElement).toBeInTheDocument();
});



test('shows login link if user is not authenticated', () => {
  authStore.set({ isAuthenticated: false });
  render(<Navbar />);

  const loginLink = screen.getByText(/login/i);
  expect(loginLink).toBeInTheDocument();
});

test('shows user avatar if user is authenticated', () => {
  authStore.set({ isAuthenticated: true, user: { email: 'user@caixabank.com' } });
  render(<Navbar />);

  const userAvatar = screen.getByText(/user@caixabank.com/i);
  expect(userAvatar).toBeInTheDocument();
});