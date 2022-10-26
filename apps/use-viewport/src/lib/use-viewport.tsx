import type { FC, PropsWithChildren } from 'react';

import { createContext, useContext } from 'react';

import type { AssertNotSame } from './types.lib';

import { useWindowWidth } from './use-window-width';

/**
 * Local lib need to be instantiated
 *
 * TODO:
 * External lib (with d.ts) can expose Breakpoints as type/interface with "default" required keys, and can be overrided by consumer
 * @see https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints
 *
 * External lib can provide both ways (instance and factory)
 */
const createUseViewport = <Breakpoints extends Record<string, number>>(
  defaultBreakpoints: Breakpoints,
  delay = 250
) => {
  const Context = createContext<Breakpoints>(defaultBreakpoints);

  const useBreakpoints = () => useContext(Context);

  // StrictAsserts=true for cases where TS can't infer types properly
  const useViewport = <StrictAsserts extends boolean = true>() => {
    //TODO: try window.matchMedia API

    const width = useWindowWidth(delay);

    const breakpoints = useBreakpoints();

    const lessThan = (
      breakpoint: keyof Breakpoints,
      config: { includes: boolean } = { includes: false }
    ): boolean => {
      const breakpointValue = breakpoints[breakpoint];

      return config.includes
        ? width <= breakpointValue
        : width < breakpointValue;
    };

    const greaterThan = (
      breakpoint: keyof Breakpoints,
      config: { includes: boolean } = { includes: false }
    ): boolean => {
      const breakpointValue = breakpoints[breakpoint];

      return config.includes
        ? width >= breakpointValue
        : width > breakpointValue;
    };

    const betweenBreakpoints = <
      From extends keyof Breakpoints,
      To extends keyof Breakpoints
    >(
      from: From,
      to: StrictAsserts extends true ? AssertNotSame<To, From> : To,
      options: { fromIncludes: boolean; toIncludes: boolean } = {
        fromIncludes: false,
        toIncludes: false
      }
    ): boolean => {
      const _from = {
        breakpoint: from,
        value: breakpoints[from],
        includes: options.fromIncludes
      };
      const _to = {
        breakpoint: to,
        value: breakpoints[to],
        includes: options.toIncludes
      };

      const [smaller, bigger] =
        _from.value <= _to.value ? [_from, _to] : [_to, _from];

      return (
        greaterThan(smaller.breakpoint, { includes: smaller.includes }) &&
        lessThan(bigger.breakpoint, { includes: bigger.includes })
      );
    };

    return { betweenBreakpoints, lessThan, greaterThan };
  };

  type ViewportProviderProps = FC<
    PropsWithChildren<{ breakpoints: Breakpoints }>
  >;

  const ViewportProvider: ViewportProviderProps = ({
    breakpoints,
    children
  }) => <Context.Provider value={breakpoints}>{children}</Context.Provider>;

  return { useViewport, useBreakpoints, ViewportProvider };
};

const { ViewportProvider, useViewport, useBreakpoints } = createUseViewport(
  {} as Record<string, number>
);

export { createUseViewport, ViewportProvider, useViewport, useBreakpoints };
