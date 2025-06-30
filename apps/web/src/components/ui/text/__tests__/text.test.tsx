import { render, screen } from '@testing-library/react';

import { Text } from '../text';

test('applies textSize, spacing, and weight variants', () => {
  render(
    <Text textSize="lg" spacing="md" weight="bold">
      Hello
    </Text>,
  );
  const p = screen.getByText('Hello');
  expect(p).toBeInTheDocument();
  expect(p).toHaveClass('text-base');
  expect(p).toHaveClass('mt-8');
  expect(p).toHaveClass('font-bold');
});
