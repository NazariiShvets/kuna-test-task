import type { FC } from 'react';

import { createRoot } from 'react-dom/client';

import { typedObjectEntries } from './lib';

import { createUseViewport } from '@/lib/use-viewport';

import { useWindowWidth } from '@/lib/use-window-width';

const { ViewportProvider, useViewport, useBreakpoints } = createUseViewport(
  {
    xxxl: 0,
    xxl: 0,
    xl: 0,
    lg: 0,
    md: 0,
    sm: 0,
    xs: 0,
    xxs: 0
  },
  50
);

type AppBreakpoints = ReturnType<typeof useBreakpoints>;

const Demo: FC = () => {
  const width = useWindowWidth(20);

  const breakpoints = useBreakpoints();

  return (
    <main>
      <div>Width: {width}</div>

      <div>Breakpoints: {JSON.stringify(breakpoints)}</div>

      <ol>
        {typedObjectEntries(breakpoints).map(([name, value]) => (
          <Breakpoint key={name} name={name} value={value} />
        ))}
      </ol>
    </main>
  );
};

type BreakpointProps = {
  name: keyof AppBreakpoints;
  value: number;
};

const Breakpoint: FC<BreakpointProps> = ({ name, value }) => {
  const breakpoints = useBreakpoints();

  // useViewport<false>() to remove strict ts checks, because {props.name} is dynamic
  const { betweenBreakpoints, greaterThan, lessThan } = useViewport<false>();

  return (
    <li>
      <h3>
        {name}: {value}
      </h3>

      <div>
        greaterThan('{name}'): {JSON.stringify(!!greaterThan(name))}
      </div>

      <div>
        lessThan('{name}'): {JSON.stringify(!!lessThan(name))}
      </div>

      <ul>
        {typedObjectEntries(breakpoints)
          .filter(([breakpointName]) => breakpointName !== name)
          .map(([breakpointName]) => (
            <li key={breakpointName}>
              betweenBreakpoints('{name}','{breakpointName}'):{' '}
              {JSON.stringify(betweenBreakpoints(name, breakpointName))}
            </li>
          ))}
      </ul>
    </li>
  );
};

//boot
const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

createRoot(root).render(
  <ViewportProvider
    breakpoints={{
      xxxl: 1400,
      xxl: 1200,
      xl: 1024,
      lg: 992,
      md: 768,
      sm: 576,
      xs: 375,
      xxs: 0
    }}
  >
    <Demo />
  </ViewportProvider>
);
