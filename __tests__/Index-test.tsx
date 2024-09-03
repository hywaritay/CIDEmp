import { render } from '@testing-library/react-native';
import Employee from '@/app/_layout';
import { Redirect } from 'expo-router';

// Mock the Redirect component
jest.mock('expo-router', () => ({
  Redirect: () => null, // Return null or a simple mock component for snapshot testing
}));

describe('<Employee />', () => {
  test('renders correctly and matches snapshot', () => {
    const tree = render(<Employee />).toJSON();
    expect(tree).toMatchSnapshot(); // Perform the snapshot test
  });
});
