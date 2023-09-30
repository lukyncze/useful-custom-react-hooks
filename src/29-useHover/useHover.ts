import {useState, RefObject, useEffect} from 'react';

export default function useHover(ref: RefObject<HTMLElement>): boolean {
  const [hovered, setHovered] = useState(false);

  const onMouseOver = () => setHovered(true);
  const onMouseOut = () => setHovered(false);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener('mouseover', onMouseOver);
      element.addEventListener('mouseout', onMouseOut);

      return () => {
        element.removeEventListener('mouseover', onMouseOver);
        element.removeEventListener('mouseout', onMouseOut);
      };
    }
  }, [ref]);

  return hovered;
}

