// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'power': 'exit-to-app',
  'rectangle.portrait.and.arrow.right': 'exit-to-app',
  'trash': 'delete',
  'person.3': 'group',
  'calendar': 'event',
  'creditcard': 'credit-card',
  'bell': 'notifications',
  'moon': 'brightness-4',
  'person.badge.plus': 'person-add',
  'questionmark.circle': 'help',
  'doc.text': 'description',
  'lock.shield': 'security',
  'square.grid.2x2': 'dashboard',
  'person.2': 'group',
  'person.circle': 'account-circle',
  'xmark': 'close',
  'envelope': 'mail',
  'globe': 'language',
  'at': 'alternate-email',
  'exclamationmark.triangle': 'warning',
  'lightbulb': 'lightbulb-outline',
  'message.fill': 'message',
  'bubble.left.fill': 'message',
  'camera.fill': 'camera-alt',
  'camera.viewfinder': 'camera',
  'square.and.arrow.up': 'share',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'exclamationmark.triangle.fill': 'warning',
  'info.circle.fill': 'info',
  'bell.slash': 'notifications-off',
  'app.badge': 'notifications',
  'speaker.2': 'volume-up',
  'paperplane': 'send',
  'gear': 'settings',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}