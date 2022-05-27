import { normalizeLinkKey } from '../types/internal';
import {
  IBezierValue,
  IData,
  IInternalLink,
  ILink,
  ILinkConfig,
  IOffsetValue,
  IPort,
  IXy,
} from '../types/base-type';

const defaultBezierCPDistance = 50;
const MIN_DISTANCE = defaultBezierCPDistance * 2;

export const createOffset = (markerWidth: number): Record<string, IOffsetValue> => ({
  // top
  '0.5-0': {
    to: {
      x: (width, offset) => width * offset,
      y: () => -markerWidth,
    },
  },
  // right
  '1-0.5': {
    to: {
      x: (width, offset) => width * offset + markerWidth,
      y: (height, offset) => height * offset,
    },
  },
  // bottom
  '0.5-1': {
    to: {
      x: (width, offset) => width * offset,
      y: (height, offset) => height * offset + markerWidth,
    },
  },
  // left
  '0-0.5': {
    to: {
      x: () => -markerWidth,
      y: (height, offset) => height * offset,
    },
  },
  // center
  '0.5-0.5': {
    to: {
      x: () => -markerWidth,
      y: (height, offset) => height * offset,
    },
  },
});

export const bezier: Record<string, IBezierValue> = {
  // top
  '0.5-0': {
    p1: {
      x: 0,
      y: -defaultBezierCPDistance,
    },
    p2: {
      x: 0,
      y: -defaultBezierCPDistance,
    },
  },
  // right
  '1-0.5': {
    p1: {
      x: defaultBezierCPDistance,
      y: 0,
    },
    p2: {
      x: defaultBezierCPDistance,
      y: 0,
    },
  },
  // bottom
  '0.5-1': {
    p1: {
      x: 0,
      y: defaultBezierCPDistance,
    },
    p2: {
      x: 0,
      y: defaultBezierCPDistance,
    },
  },
  // left
  '0-0.5': {
    p1: {
      x: -defaultBezierCPDistance,
      y: 0,
    },
    p2: {
      x: -defaultBezierCPDistance,
      y: 0,
    },
  },
  // center
  '0.5-0.5': {
    p1: {
      x: 0,
      y: 0,
    },
    p2: {
      x: 0,
      y: 0,
    },
  },
};

export const bezierController = (s: IXy, t: IXy, b: IBezierValue) => {
  const x = Math.abs(s.x - t.x);
  const y = Math.abs(s.y - t.y);

  const nb = { p1: { ...b.p1 }, p2: { ...b.p2 } };

  if (x <= MIN_DISTANCE) {
    const xRate = MIN_DISTANCE / x;
    nb.p1.x = nb.p1.x / xRate;
    nb.p2.x = nb.p2.x / xRate;
  }

  if (y <= MIN_DISTANCE) {
    const yRate = MIN_DISTANCE / y;
    nb.p1.y = nb.p1.y / yRate;
    nb.p2.y = nb.p2.y / yRate;
  }

  return nb;
};

export const createLinkId = (shopeeVId: string, id: string) => {
  const preFix = `_shopeeVID_${shopeeVId}`;
  if (id.startsWith(preFix)) return id;
  return `${preFix}_${id}`;
};

export const getLinkId = (shopeeVId: string, link: ILink, portSensitive = false) => {
  if ((link as IInternalLink)[normalizeLinkKey]) return link.id;
  if (link.id) return createLinkId(shopeeVId, link.id);

  if (portSensitive) {
    return createLinkId(
      shopeeVId,
      `${link.from.id}_${link.from.linkIndex}_${link.to.id}_${link.to.linkIndex}`
    );
  }

  return createLinkId(shopeeVId, `${link.from.id}_${link.to.id}`);
};

export const serializePort = ({ x, y }: IPort) => `${x}-${y}`;

export const getLinkIdKeys = <T extends IData, L extends ILink>(from: T, to: T, link: L) => {
  const fromIndex = serializePort(from.ports[link.from.linkIndex]);
  const toIndex = serializePort(to.ports[link.to.linkIndex]);

  const idNormal = `${from.id}-${fromIndex}-${to.id}-${toIndex}`;
  const idReverse = `${to.id}-${toIndex}-${from.id}-${fromIndex}`;

  return { idNormal, idReverse };
};

export const getLinkGroup = <T extends IData, L extends ILink>(
  from: T,
  to: T,
  link: L,
  meta: Record<string, IInternalLink[]>
) => {
  const { idNormal, idReverse } = getLinkIdKeys(from, to, link);
  // normalLinkGroup
  let nlg = meta[idNormal];
  if (!nlg) {
    meta[idNormal] = [];
    nlg = meta[idNormal];
  }

  // reverseLinkGroup
  let rlg = meta[idReverse];
  if (!rlg) {
    meta[idReverse] = [];
    rlg = meta[idReverse];
  }

  const linksNumber = nlg.length + rlg.length;

  return {
    nlg,
    rlg,
    linksNumber,
  };
};

export const getQuadraticCurveCp = (
  halfHypotenuse: number,
  linkMiddleIndex: number,
  isEven: boolean,
  linkOrderIndex: number,
  linkConfig: ILinkConfig
) => {
  const { multipleLinkGradeRate, multipleLinkMaxGrade } = linkConfig;

  let gradeRate = multipleLinkGradeRate;
  if (halfHypotenuse * multipleLinkGradeRate > multipleLinkMaxGrade) {
    gradeRate = multipleLinkMaxGrade / halfHypotenuse;
  }

  const offset = isEven ? 0.5 : 0;
  const index = linkOrderIndex - linkMiddleIndex + offset;
  const cpRad = Math.atan(gradeRate * index);
  const cpHypotenuse = Math.sqrt(Math.pow(index * gradeRate, 2) + 1) * halfHypotenuse;
  return { cpRad, cpHypotenuse };
};
