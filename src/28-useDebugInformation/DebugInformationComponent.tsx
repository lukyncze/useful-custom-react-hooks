import useDebugInformation, {DebugInformationProps} from './useDebugInformation';
import useToggle from '../1-useToggle/useToggle';
import {useState} from 'react';

export default function DebugInformationComponent(): JSX.Element {
  const [boolean, toggleBoolean] = useToggle(false);
  const [count, setCount] = useState(0);

  const componentName = 'ChildComponent';
  const debugInfo: DebugInformationProps = {componentName, boolean, count};

  return (
    <>
      <ChildComponent {...debugInfo} />
      <button onClick={toggleBoolean}>Toggle</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</button>
    </>
  );
}

function ChildComponent(debugInfo: DebugInformationProps): JSX.Element {
  const info = useDebugInformation(debugInfo);

  return (
    <>
      <div>{debugInfo.boolean.toString()}</div>
      <div>{debugInfo.count}</div>
      <div>{JSON.stringify(info, null, 2)}</div>
    </>
  );
}

