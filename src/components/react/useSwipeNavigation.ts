import { useCallback, useEffect, useRef, useState } from 'react';

type SwipeNavigationOptions = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minDistance?: number;
  maxOffAxisDistance?: number;
  wheelThreshold?: number;
  wheelCooldownMs?: number;
};

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  minDistance = 24,
  maxOffAxisDistance = 120,
  wheelThreshold = 36,
  wheelCooldownMs = 180
}: SwipeNavigationOptions) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const gestureStart = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onSwipeLeftRef = useRef(onSwipeLeft);
  const onSwipeRightRef = useRef(onSwipeRight);
  const lastSwipeAt = useRef(0);
  const wheelAccumulator = useRef(0);
  const lastWheelTrigger = useRef(0);

  useEffect(() => {
    onSwipeLeftRef.current = onSwipeLeft;
  }, [onSwipeLeft]);

  useEffect(() => {
    onSwipeRightRef.current = onSwipeRight;
  }, [onSwipeRight]);

  const clearGesture = () => {
    gestureStart.current = null;
  };

  const clearTouchGesture = () => {
    touchStart.current = null;
  };

  const startTouchGesture = (x: number, y: number) => {
    touchStart.current = { x, y };
  };

  const endTouchGesture = (x: number, y: number) => {
    const start = touchStart.current;
    if (!start) {
      clearTouchGesture();
      return;
    }

    const deltaX = x - start.x;
    const deltaY = y - start.y;

    clearTouchGesture();
    triggerSwipeFromDeltas(deltaX, deltaY);
  };

  const triggerSwipeFromDeltas = (deltaX: number, deltaY: number) => {
    const now = Date.now();
    if (now - lastSwipeAt.current < 220) {
      return;
    }

    if (Math.abs(deltaX) < minDistance || Math.abs(deltaY) > maxOffAxisDistance) {
      return;
    }

    if (deltaX < 0) {
      lastSwipeAt.current = now;
      onSwipeLeftRef.current();
      return;
    }

    lastSwipeAt.current = now;
    onSwipeRightRef.current();
  };

  const onPointerDown: React.PointerEventHandler<HTMLElement> = (event) => {
    if (!event.isPrimary) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    gestureStart.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId
    };
  };

  const onPointerUp: React.PointerEventHandler<HTMLElement> = (event) => {
    const start = gestureStart.current;
    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    clearGesture();
    triggerSwipeFromDeltas(deltaX, deltaY);
  };

  const onPointerCancel: React.PointerEventHandler<HTMLElement> = () => {
    clearGesture();
  };

  useEffect(() => {
    if (!targetElement) {
      return;
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      startTouchGesture(touch.clientX, touch.clientY);
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) {
        clearTouchGesture();
        return;
      }

      endTouchGesture(touch.clientX, touch.clientY);
    };

    const onTouchCancel = () => {
      clearTouchGesture();
    };

    targetElement.addEventListener('touchstart', onTouchStart, { passive: true });
    targetElement.addEventListener('touchend', onTouchEnd, { passive: true });
    targetElement.addEventListener('touchcancel', onTouchCancel, { passive: true });

    return () => {
      targetElement.removeEventListener('touchstart', onTouchStart);
      targetElement.removeEventListener('touchend', onTouchEnd);
      targetElement.removeEventListener('touchcancel', onTouchCancel);
    };
  }, [maxOffAxisDistance, minDistance, targetElement]);

  const swipeRef = useCallback((node: HTMLElement | null) => {
    setTargetElement(node);
  }, []);

  const onTouchStart: React.TouchEventHandler<HTMLElement> = (event) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    startTouchGesture(touch.clientX, touch.clientY);
  };

  const onTouchEnd: React.TouchEventHandler<HTMLElement> = (event) => {
    const touch = event.changedTouches[0];
    if (!touch) {
      clearTouchGesture();
      return;
    }

    endTouchGesture(touch.clientX, touch.clientY);
  };

  const onTouchCancel: React.TouchEventHandler<HTMLElement> = () => {
    clearTouchGesture();
  };

  const onWheel: React.WheelEventHandler<HTMLElement> = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return;
    }

    const now = Date.now();
    if (now - lastWheelTrigger.current < wheelCooldownMs) {
      return;
    }

    wheelAccumulator.current += event.deltaX;
    if (Math.abs(wheelAccumulator.current) < wheelThreshold) {
      return;
    }

    if (wheelAccumulator.current > 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }

    wheelAccumulator.current = 0;
    lastWheelTrigger.current = now;
  };

  return {
    ref: swipeRef,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    onWheel,
    style: { touchAction: 'pan-y' as const }
  };
}