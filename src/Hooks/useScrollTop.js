import { useRef, useState } from 'react';
import { ScrollView } from 'react-native';

export default function useScrollTop(threshold = 200) {
  const scrollRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > threshold) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return { scrollRef, showScrollTop, handleScroll, scrollTop };
}
