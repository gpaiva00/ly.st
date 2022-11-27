import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name: never, params: never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
