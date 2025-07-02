import { render, screen } from '@testing-library/react';

import { Button } from '../button';

describe('Buttonコンポーネント', () => {
  test('buttonタグがレンダリングされる', () => {
    render(<Button>ボタン</Button>);
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });
});
