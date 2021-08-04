import produce from 'immer';

import {
  Options,
  Config,
  Calculated,
  Axes,
  Axis,
} from '../store/ducks/control/types';

const calcFromOptions = (options: Options, axes: Axes) => {
  const platformAngles = [
    0,
    Math.PI / 3,
    (2 * Math.PI) / 3,
    Math.PI,
    (4 * Math.PI) / 3,
    (5 * Math.PI) / 3,
  ];

  const platformCoordsXY = [
    platformAngles.map((e) => Math.cos(e) * options.platform.radius),
    platformAngles.map((e) => Math.sin(e) * options.platform.radius),
  ];

  const b_leg2x = platformCoordsXY[0][1];
  const b_leg3x = platformCoordsXY[0][2];

  const b_leg23y = (options.base.radius ** 2 - b_leg2x ** 2) ** 0.5;
  const l2a = Math.atan2(b_leg23y, b_leg2x);
  const l3a = Math.atan2(b_leg23y, b_leg3x);

  const baseAngles = [
    l3a + (4 * Math.PI) / 3,
    l2a,
    l3a,
    l2a + (2 * Math.PI) / 3,
    l3a + (2 * Math.PI) / 3,
    l2a + (4 * Math.PI) / 3,
  ];

  const baseCoords = [
    baseAngles.map((e) => Math.cos(e) * options.base.radius),
    baseAngles.map((e) => Math.sin(e) * options.base.radius),
  ];

  //

  const homeHeight =
    Math.abs(
      options.fixedRods.len ** 2 -
        (baseCoords[0][0] - platformCoordsXY[0][0]) ** 2 -
        (baseCoords[1][0] - platformCoordsXY[1][0]) ** 2
    ) **
      0.5 +
    options.actuator.home;

  const platformCoordsHome: number[][] = [
    ...platformCoordsXY,
    new Array(options.fixedRods.count).fill(homeHeight),
  ];

  const platformCoordsBasis: number[][] = [
    ...platformCoordsXY,
    new Array(options.fixedRods.count).fill(0),
  ];

  const config: Config = {
    base: { coords: baseCoords },
    platform: {
      homeCoords: platformCoordsHome,
      coordsBasis: platformCoordsBasis,
    },
  };

  const previousInput = new Array(6).fill(0);

  const calculated: Calculated = {
    previousInput,
    platform: {
      angles: platformAngles,
      coords: platformCoordsHome,
    },
  };

  //

  const newAxes = produce(axes, (draftAxes) => {
    console.log('axes', axes);
    Object.keys(axes).map((key: Axis) => {
      draftAxes[key].min = -options.range[key];
      draftAxes[key].max = options.range[key];
    });
  });

  return {
    config,
    calculated,
    axes: newAxes,
  };
};

export default calcFromOptions;
