import renderer from 'react-test-renderer';
import DetailsMovie from '../pages/DetailsMovie';

test('renders correctly', () => {
  const component = renderer.create(<DetailsMovie />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});