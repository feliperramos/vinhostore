import React from 'react';
import type { SvgProps } from 'react-native-svg';

import House from '@/assets/icons/house-bold.svg';
import Heart from '@/assets/icons/heart.svg';
import Gear from '@/assets/icons/gear-six-bold.svg';
import ShoppingCart from '@/assets/icons/basket-bold.svg';
import Star from '@/assets/icons/star-bold.svg';
import Eye from '@/assets/icons/eye.svg';
import EyeClosed from '@/assets/icons/eye-slash.svg';

const registry = {
  home: House,
  heart: Heart,
  settings: Gear,
  cart: ShoppingCart,
  star: Star,
  eye: Eye,
  eyeClosed: EyeClosed,
};

export type IconName = keyof typeof registry;

type Props = SvgProps & {
  name: IconName;
  size?: number;
  color?: string;
  fill?: string;
};

export function Icon({ name, size = 24, color, fill, ...rest }: Props) {
  const IconComponent = registry[name];
  return <IconComponent width={size} height={size} color={color} fill={fill} {...rest} />;
}
