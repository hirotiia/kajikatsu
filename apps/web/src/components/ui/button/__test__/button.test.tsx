import { render } from '@testing-library/react';

import { Button } from '../button';

describe('Buttonコンポーネント', () => {
  test('buttonタグがレンダリングされる', () => {
    render(<Button>ボタン</Button>);
  });
});
