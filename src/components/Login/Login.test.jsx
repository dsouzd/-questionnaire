import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap in Router
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // Ensure your i18n instance is imported
import Login from './Login';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Login Component', () => {
  const renderWithProviders = (ui) =>
    render(
      <Router>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </Router>
    );

  it('renders the Login form with all fields', () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays validation errors for invalid email and password', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data and shows success toast', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/account successfully logged in!/i)).toBeInTheDocument();
    });
  });

  it('shows error toast when login fails', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 401 } });

    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/an unexpected error occurred. please try again./i)).toBeInTheDocument();
    });
  });
});
