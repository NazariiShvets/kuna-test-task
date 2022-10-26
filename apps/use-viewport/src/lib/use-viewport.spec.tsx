import { renderHook } from '@testing-library/react';

import { createUseViewport } from './use-viewport';

describe('createTypesafeUseViewport', () => {
  const TEST_BREAKPOINTS = {
    md: 768,
    sm: 576,
    xs: 375
  };

  beforeEach(() => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(TEST_BREAKPOINTS.sm);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should work', () => {
    const { ViewportProvider, useViewport } = createUseViewport({
      md: 0,
      sm: 0,
      xs: 0
    });

    const {
      result: {
        current: { betweenBreakpoints, greaterThan, lessThan }
      }
    } = renderHook(() => useViewport<false>(), {
      wrapper: ({ children }) => (
        <ViewportProvider breakpoints={TEST_BREAKPOINTS}>
          {children}
        </ViewportProvider>
      )
    });

    expect(greaterThan('xs')).toBe(true);
    expect(greaterThan('sm')).toBe(false);
    expect(greaterThan('md')).toBe(false);

    expect(greaterThan('xs', { includes: true })).toBe(true);
    expect(greaterThan('sm', { includes: true })).toBe(true);
    expect(greaterThan('md', { includes: true })).toBe(false);

    expect(lessThan('xs')).toBe(false);
    expect(lessThan('sm')).toBe(false);
    expect(lessThan('md')).toBe(true);

    expect(lessThan('xs', { includes: true })).toBe(false);
    expect(lessThan('sm', { includes: true })).toBe(true);
    expect(lessThan('md', { includes: true })).toBe(true);

    expect(betweenBreakpoints('xs', 'sm')).toBe(false);
    expect(
      betweenBreakpoints('xs', 'sm', { fromIncludes: true, toIncludes: false })
    ).toBe(false);
    expect(
      betweenBreakpoints('xs', 'sm', { fromIncludes: true, toIncludes: true })
    ).toBe(true);
    expect(
      betweenBreakpoints('xs', 'sm', { fromIncludes: false, toIncludes: true })
    ).toBe(true);

    expect(betweenBreakpoints('xs', 'md')).toBe(true);

    expect(betweenBreakpoints('sm', 'md')).toBe(false);
    expect(
      betweenBreakpoints('sm', 'md', { fromIncludes: true, toIncludes: false })
    ).toBe(true);
    expect(
      betweenBreakpoints('sm', 'md', { fromIncludes: true, toIncludes: true })
    ).toBe(true);
    expect(
      betweenBreakpoints('sm', 'md', { fromIncludes: false, toIncludes: true })
    ).toBe(false);
  });
});
